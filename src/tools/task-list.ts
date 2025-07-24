import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka } from "../lib/planka.js";
import z from "zod";

export default (server: McpServer, planka: Planka) => {
    server.registerTool("create_task_list",
        {
            title: "Create Task List",
            description: "This creates a task list which inside you can put tasks. And this is attached to a card.",
            inputSchema: {
                cardId: z.string().describe("The ID of the card to which the task list will be added."),
                name: z.string().describe("The name of the task list."),
                position: z.number().describe("The position of the task list in the card's task list order (1 for top, 2 for second, etc.)."),
            }
        },
        async ({ name, cardId, position }) => {
            const taskList = await planka.createTaskList(cardId, name, true, position);
            return {
                content: [{ type: "text", text: `Created task list for card with ID ${cardId}. Task List: ${JSON.stringify(taskList)}` }]
            };
        });

    server.registerTool("create_task",
        {
            title: "Create Task",
            description: "This creates a task inside a task list.",
            inputSchema: {
                taskListId: z.string().describe("The ID of the task list to which the task will be added."),
                name: z.string().describe("The name of the task."),
                position: z.number().describe("The position of the task in the task list (1 for top, 2 for second, etc.).")
            }
        },
        async ({ name, taskListId, position }) => {
            const task = await planka.createTask(taskListId, name, position);
            return {
                content: [{ type: "text", text: `Created task in task list with ID ${taskListId}. Task: ${JSON.stringify(task)}` }]
            };
        });

    server.registerTool("toggle_task_completion",
        {
            title: "Toggle Task Completion",
            description: "Toggle a task's completion status (complete/incomplete).",
            inputSchema: {
                taskId: z.string().describe("The ID of the task to update."),
                isCompleted: z.boolean().describe("Whether the task should be marked as completed.")
            }
        },
        async ({ taskId, isCompleted }) => {
            const updatedTask = await planka.updateTaskCompletion(taskId, isCompleted);
            return {
                content: [{ type: "text", text: `Task ${taskId} completion set to ${isCompleted}. Updated Task: ${JSON.stringify(updatedTask)}` }]
            };
        });

    server.registerTool("delete_task",
        {
            title: "Delete Task",
            description: "Delete a task by its ID.",
            inputSchema: {
                taskId: z.string().describe("The ID of the task to delete.")
            }
        },
        async ({ taskId }) => {
            await planka.deleteTask(taskId);
            return {
                content: [{ type: "text", text: `Task ${taskId} deleted.` }]
            };
        });
    
    server.registerTool("delete_task_list",
        {
            title: "Delete Task List",
            description: "Delete a task list by its ID.",
            inputSchema: {
                taskListId: z.string().describe("The ID of the task list to delete.")
            }
        },
        async ({ taskListId }) => {
            await planka.deleteTaskList(taskListId);
            return {
                content: [{ type: "text", text: `Task list ${taskListId} deleted.` }]
            };
        });
};
