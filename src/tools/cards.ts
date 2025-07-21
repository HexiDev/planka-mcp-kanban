import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka, PlankaCardCreate } from "../lib/planka.js";
import { z } from "zod";

export default (server: McpServer, planka: Planka) => {
	server.registerTool(
		"create_card",
		{
			title: "Create card",
			description: "Create a new card on a list (flatmap)",
			inputSchema: {
				listId: z.string().describe("The ID of the list to create the card on"),
				position: z.number().describe("The position of the new card"),
				name: z.string().describe("The name of the new card"),
				type: z.string().optional().describe("The type of the card (optional)"),
				description: z.string().optional().describe("The description of the card (optional)"),
				dueDate: z.string().optional().describe("The due date of the card (optional)"),
				isDueDateCompleted: z.boolean().optional().describe("Is due date completed (optional)"),
				stopwatch: z.string().optional().describe("Stopwatch value (optional)"),
				labels: z.array(z.string()).optional().describe("Labels for the card (optional)"),
				coverAttachmentId: z.string().optional().describe("Cover attachment ID (optional)")
			}
		},
		async ({ listId, position, name, type, description, dueDate, isDueDateCompleted, stopwatch, labels, coverAttachmentId }) => {
			const createdCard = await planka.createCard(listId, {
				position,
				name,
				type,
				description,
				dueDate,
				isDueDateCompleted,
				stopwatch,
				labels,
				coverAttachmentId
			});
			return {
				content: [{ type: "text", text: `Card '${createdCard.name}' created on list ${listId}:\n${JSON.stringify(createdCard, null, 2)}` }],
				item: createdCard
			};
		}
	);

	server.registerTool(
		"delete_card",
		{
			title: "Delete card",
			description: "Delete a card by its ID.",
			inputSchema: {
				cardId: z.string().describe("The ID of the card to delete")
			}
		},
		async ({ cardId }) => {
			await planka.deleteCard(cardId);
			return {
				content: [{ type: "text", text: `Card ${cardId} deleted successfully.` }]
			};
		}
	);

	server.registerTool(
		"get_cards",
		{
			title: "Get cards for a board or list",
			description: "Get all cards for a board, or filter by listId.",
			inputSchema: {
				boardId: z.string().describe("The ID of the board to get cards for"),
				listId: z.string().optional().describe("The ID of the list to filter cards (optional)")
			}
		},
		async ({ boardId, listId }) => {
			const cards = await planka.getCards(boardId, listId);
			return {
				content: [{ type: "text", text: `Cards for board ${boardId}${listId ? `, list ${listId}` : ''}:\n${JSON.stringify(cards, null, 2)}` }],
				items: cards
			};
		}
	);

	server.registerTool(
		"rename_card",
		{
			title: "Rename card",
			description: "Rename a card by its ID.",
			inputSchema: {
				cardId: z.string().describe("The ID of the card to rename"),
				newName: z.string().describe("The new name of the card")
			}
		},
		async ({ cardId, newName }) => {
			const updatedCard = await planka.renameCard(cardId, newName);
			return {
				content: [{ type: "text", text: `Card ${cardId} renamed:\n${JSON.stringify(updatedCard, null, 2)}` }]
			};
		}
	);

	server.registerTool(
		"update_card_description",
		{
			title: "Update card description",
			description: "Update a card's description by its ID.",
			inputSchema: {
				cardId: z.string().describe("The ID of the card to update"),
				description: z.string().describe("The new description of the card")
			}
		},
		async ({ cardId, description }) => {
			const updatedCard = await planka.updateCardDescription(cardId, description);
			return {
				content: [{ type: "text", text: `Card ${cardId} description updated:\n${JSON.stringify(updatedCard, null, 2)}` }]
			};
		}
	);


	server.registerTool(
		"move_card_to_list",
		{
			title: "Move card to another list",
			description: "Move a card to another list by its ID.",
			inputSchema: {
				cardId: z.string().describe("The ID of the card to move"),
				newListId: z.string().describe("The ID of the new list")
			}
		},
		async ({ cardId, newListId }) => {
			const updatedCard = await planka.moveCardToList(cardId, newListId);
			return {
				content: [{ type: "text", text: `Card ${cardId} moved to list ${newListId}:\n${JSON.stringify(updatedCard, null, 2)}` }]
			};
		}
	);
};
