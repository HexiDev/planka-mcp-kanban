import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { Planka } from "../../dist/lib/planka.js";
import {
  API_URL,
  EMAIL,
  PASSWORD,
  createProject,
  deleteProject,
  login,
} from "./helpers.mjs";

let token;
let projectId;
let planka;
let boardId;
let todoListId;
let doneListId;
let cardId;
let labelId;
let taskListId;
let taskId;

before(async () => {
  token = await login();
  projectId = await createProject(token, `MCP client CI ${Date.now()}`);
  planka = await Planka.init(EMAIL, PASSWORD, API_URL);
  await planka.selectProject(projectId);
});

after(async () => {
  if (token && projectId) {
    await deleteProject(token, projectId);
  }
});

test("authenticates and lists projects", async () => {
  const projects = await planka.getProjects();
  assert.ok(
    projects.items.some((project) => project.id === projectId),
    "created project should be listed",
  );
});

test("creates and reads a board", async () => {
  const board = await planka.createBoard(projectId, {
    position: 1,
    name: "CI Board",
  });
  boardId = board.id;
  assert.equal(board.name, "CI Board");

  const boards = await planka.getBoards();
  assert.ok(boards.some((item) => item.id === boardId));

  const fetched = await planka.getBoardById(boardId);
  assert.equal(fetched.item.id, boardId);
});

test("creates lists and moves a card between them", async () => {
  const todo = await planka.createList(boardId, {
    position: 1,
    name: "To Do",
    color: "lagoon-blue",
  });
  const done = await planka.createList(boardId, {
    position: 2,
    name: "Done",
    color: "bright-moss",
  });
  todoListId = todo.id;
  doneListId = done.id;

  const lists = await planka.getLists(boardId);
  assert.ok(lists.some((list) => list.id === todoListId));
  assert.ok(lists.some((list) => list.id === doneListId));

  const card = await planka.createCard(todoListId, {
    position: 1,
    name: "CI card",
    description: "Created by integration tests",
  });
  cardId = card.id;
  assert.equal(card.name, "CI card");

  await planka.moveCardToList(cardId, doneListId);

  const moved = await planka.getCards(boardId, doneListId);
  assert.ok(moved.some((item) => item.id === cardId));
});

test("creates labels and assigns one to a card", async () => {
  const label = await planka.createLabel(boardId, {
    position: 1,
    name: "CI label",
    color: "berry-red",
  });
  labelId = label.id;

  const labels = await planka.getLabelsForBoard(boardId);
  assert.ok(labels.some((item) => item.id === labelId));

  await planka.assignLabelToCard(cardId, labelId);
});

test("creates and completes a task", async () => {
  const taskList = await planka.createTaskList(cardId, "CI checklist");
  taskListId = taskList.id;
  assert.equal(taskList.name, "CI checklist");

  const task = await planka.createTask(taskListId, "First step");
  taskId = task.id;
  assert.equal(task.name, "First step");

  await planka.updateTaskCompletion(taskId, true);

  const board = await planka.getBoardById(boardId);
  const storedTask = board.included.tasks.find((item) => item.id === taskId);
  assert.equal(storedTask.isCompleted, true);
});

test("renames and deletes a card", async () => {
  await planka.renameCard(cardId, "Renamed CI card");
  await planka.updateCardDescription(cardId, "Updated description");

  await planka.deleteCard(cardId);

  const cards = await planka.getCards(boardId);
  assert.ok(!cards.some((item) => item.id === cardId));
});

test("deletes the board", async () => {
  await planka.deleteBoard(boardId);

  const boards = await planka.getBoards();
  assert.ok(!boards.some((item) => item.id === boardId));
});
