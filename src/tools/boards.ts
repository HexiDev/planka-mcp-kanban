import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka, PlankaBoardCreate } from "../lib/planka.js";
import { z } from "zod";

export default (server: McpServer, planka: Planka) => {
	server.registerTool(
		"create_board",
		{
			title: "Create board",
			description: "Create a new board in a project by projectId and board fields (flatmap)",
			inputSchema: {
				projectId: z.string().describe("The ID of the project to create the board in"),
				position: z.number().describe("The position of the new board"),
				name: z.string().describe("The name of the new board"),
				defaultView: z.string().optional().describe("Default view for the board (optional)"),
				defaultCardType: z.string().optional().describe("Default card type (optional)"),
				limitCardTypesToDefaultOne: z.boolean().optional().describe("Limit card types to default one (optional)"),
				alwaysDisplayCardCreator: z.boolean().optional().describe("Always display card creator (optional)")
			}
		},
		async ({ projectId, position, name, defaultView, defaultCardType, limitCardTypesToDefaultOne, alwaysDisplayCardCreator }) => {
			const createdBoard = await planka.createBoard(projectId, {
				position,
				name,
				defaultView,
				defaultCardType,
				limitCardTypesToDefaultOne,
				alwaysDisplayCardCreator
			});
			return {
				content: [{ type: "text", text: `Board '${createdBoard.name}' (ID: ${createdBoard.id}) created successfully.` }],
				item: createdBoard
			};
		}
	);

	server.registerTool(
		"delete_board",
		{
			title: "Delete board",
			description: "Delete a board by its ID. Optionally provide projectId, otherwise uses selected project.",
			inputSchema: {
				boardId: z.string().describe("The ID of the board to delete"),
				projectId: z.string().optional().describe("The ID of the project to delete the board from, optional if a project is already selected")
			}
		},
		async ({ boardId, projectId }) => {
			await planka.deleteBoard(boardId, projectId);
			return {
				content: [{ type: "text", text: `Board ${boardId} deleted successfully.` }]
			};
		}
	);

	server.registerTool(
		"get_board_by_id",
		{
			title: "Get board by ID",
			description: "Get a specific board by its ID. Optionally provide projectId, otherwise uses selected project.",
			inputSchema: {
				boardId: z.string().describe("The ID of the board to fetch"),
			},
		},
		async ({ boardId }) => {
			try {
				const board = await planka.getBoardById(boardId);
				return {
					content: [{ type: "text", text: JSON.stringify(board) }],
				};
			} catch (err) {
				return {
					content: [{ type: "text", text: `Error fetching board: ${err}` }],
				};
			}
		}
	);

	server.registerTool(
		"get_boards",
		{
			title: "Get boards for selected project or by projectId",
			description: "Get all boards for the currently selected Planka project or by projectId",
			inputSchema: {
				projectId: z.string().optional().describe("The ID of the project to fetch boards from, optional if a project is already selected")
			}
		},
		async (input: { projectId?: string }) => {
			const boards = await planka.getBoards(input.projectId);
			return {
				content: [{ type: "text", text: JSON.stringify(boards) }]
			};
		}
	);

	server.registerTool(
		"rename_board",
		{
			title: "Rename board",
			description: "Rename a board by its ID.",
			inputSchema: {
				boardId: z.string().describe("The ID of the board to rename"),
				newName: z.string().describe("The new name of the board")
			}
		},
		async ({ boardId, newName }) => {
			try {
				const board = await planka.renameBoard(boardId, newName);
				return {
					content: [{ type: "text", text: JSON.stringify(board) }]
				};
			} catch (err) {
				return {
					content: [{ type: "text", text: `Error renaming board: ${err}` }]
				};
			}
		}
	);
	server.registerTool("assign_label_to_card",
		{
			title: "Assign label to card",
			description: "Assign a label to a card by its ID.",
			inputSchema: {
				cardId: z.string().describe("The ID of the card to assign the label to"),
				labelId: z.string().describe("The ID of the label to assign")
			},

		},

		async ({ cardId, labelId }) => {
			const updatedCard = await planka.assignLabelToCard(cardId, labelId);
			return {
				content: [{ type: "text", text: `Card ${cardId} assigned label ${labelId}:\n${JSON.stringify(updatedCard, null, 2)}` }]
			};
		}
	);


};
