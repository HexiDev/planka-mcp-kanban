import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
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
let client;
let transport;

before(async () => {
  token = await login();
  projectId = await createProject(token, `MCP stdio CI ${Date.now()}`);

  transport = new StdioClientTransport({
    command: process.execPath,
    args: [new URL("../../dist/index.js", import.meta.url).pathname],
    env: {
      ...process.env,
      PLANKA_EMAIL_OR_USERNAME: EMAIL,
      PLANKA_PASSWORD: PASSWORD,
      PLANKA_API_URL: API_URL,
    },
  });

  client = new Client({ name: "planka-integration-test", version: "1.0.0" });
  await client.connect(transport);
});

after(async () => {
  await client?.close();
  if (token && projectId) {
    await deleteProject(token, projectId);
  }
});

test("lists Planka tools over MCP stdio", async () => {
  const { tools } = await client.listTools();
  const names = tools.map((tool) => tool.name);

  assert.ok(names.includes("get_projects"));
  assert.ok(names.includes("create_board"));
  assert.ok(names.includes("create_card"));
});

test("calls get_projects over MCP stdio", async () => {
  const result = await client.callTool({
    name: "get_projects",
    arguments: {},
  });

  const text = result.content.find((item) => item.type === "text")?.text;
  assert.ok(text?.includes(projectId));
});
