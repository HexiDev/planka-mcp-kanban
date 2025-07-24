import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka } from "../lib/planka.js";
import z from "zod";

export default (server: McpServer, planka: Planka) => {
	server.registerTool("assign_member_to_card",
		{
			title: "Assign Member to Card",
			description: "Assigns a member to a card in the currently selected project.",
			inputSchema: {
				cardId: z.string().describe("The ID of the card to which the member will be assigned."),
				memberId: z.string().describe("The ID of the member to assign to the card.")
			}
		},
		async ({ cardId, memberId }) => {
			const response = await planka.assignMemberToCard(cardId, memberId);
			return {
				content: [{ type: "text", text: `Member with ID ${memberId} assigned to card with ID ${cardId}. Response: ${JSON.stringify(response)}` }]
			};
		}
	);
	server.registerTool("remove_member_from_card",
		{
			title: "Remove Member from Card",
			description: "Removes a member from a card in the currently selected project.",
			inputSchema: {
				cardId: z.string().describe("The ID of the card from which the member will be removed."),
				memberId: z.string().describe("The ID of the member to remove from the card.")
			}
		},
		async ({ cardId, memberId }) => {
			await planka.removeMemberFromCard(cardId, memberId);
			return {
				content: [{ type: "text", text: `Member with ID ${memberId} removed from card with ID ${cardId}.` }]
			};
		}
	);
};
