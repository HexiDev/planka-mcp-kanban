import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka, PlankaListCreate } from "../lib/planka.js";
import { z } from "zod";

export default (server: McpServer, planka: Planka) => {
	server.registerTool(
		"create_list",
		{
			title: "Create list",
			description: "Create a new list on a board (flatmap)",
			inputSchema: {
				boardId: z.string().describe("The ID of the board to create the list on"),
				position: z.number().describe("The position of the new list"),
				name: z.string().describe("The name of the new list"),
				color: z.string().optional().describe("The color of the new list (optional)"),
				type: z.string().optional().describe("The type of the list (optional)"),
				projectId: z.string().optional().describe("The ID of the project, optional if a project is already selected")
			}
		},
		async ({ boardId, position, name, color, type, projectId }) => {
			const createdList = await planka.createList(boardId, {
				position,
				name,
				color,
				type
			}, projectId);
			return {
				content: [{ type: "text", text: `List '${createdList.name}' created on board ${boardId}:\n${JSON.stringify(createdList, null, 2)}` }],
				item: createdList
			};
		}
	);

	server.registerTool(
		"get_lists",
		{
			title: "Get lists",
			description: "Get all lists for a board. Optionally provide projectId, otherwise uses selected project.",
			inputSchema: {
				boardId: z.string().describe("The ID of the board to get lists for"),
				projectId: z.string().optional().describe("The ID of the project, optional if a project is already selected")
			}
		},
		async ({ boardId, projectId }) => {
			const lists = await planka.getLists(boardId, projectId);
			return {
				content: [{ type: "text", text: `Lists for board ${boardId}:\n${JSON.stringify(lists, null, 2)}` }]
			};
		}
	);

	server.registerTool(
		"rename_list",
		{
			title: "Rename list",
			description: "Rename a list by its ID.",
			inputSchema: {
				listId: z.string().describe("The ID of the list to rename"),
				newName: z.string().describe("The new name of the list")
			}
		},
		async ({ listId, newName }) => {
			const updatedList = await planka.renameList(listId, newName);
			return {
				content: [{ type: "text", text: `List ${listId} renamed:\n${JSON.stringify(updatedList, null, 2)}` }]
			};
		}
	);

	server.registerTool(
		"change_list_color",
		{
			title: "Change list color",
			description: "Change a list's color by its ID.",
			inputSchema: {
				listId: z.string().describe("The ID of the list to update"),
				newColor: z.string().describe("The new color of the list")
			}
		},
		async ({ listId, newColor }) => {
			const updatedList = await planka.changeListColor(listId, newColor);
			return {
				content: [{ type: "text", text: `List ${listId} color changed to ${newColor}:\n${JSON.stringify(updatedList, null, 2)}` }]
			};
		}
	);


	server.registerTool(
		"archive_list",
		{
			title: "Archive list",
			description: "Archive a list by its ID.",
			inputSchema: {
				listId: z.string().describe("The ID of the list to archive")
			}
		},
		async ({ listId }) => {
			const updatedList = await planka.archiveList(listId);
			return {
				content: [{ type: "text", text: `List ${listId} archived:\n${JSON.stringify(updatedList, null, 2)}` }]
			};
		}
	);
};
