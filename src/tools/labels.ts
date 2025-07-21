import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka, PlankaLabelCreate } from "../lib/planka.js";
import { z } from "zod";

export default (server: McpServer, planka: Planka) => {
	server.registerTool(
		"create_label",
		{
			title: "Create label",
			description: "Create a new label on a board (flatmap)",
			inputSchema: {
				boardId: z.string().describe("The ID of the board to create the label on"),
				position: z.number().describe("The position of the new label"),
				name: z.string().describe("The name of the new label"),
				color: z.string().describe("The color of the new label"),
				type: z.string().optional().describe("The type of the label (optional)")
			}
		},
		async ({ boardId, position, name, color, type }) => {
			const createdLabel = await planka.createLabel(boardId, {
				position,
				name,
				color,
				type
			});
			return {
				content: [{ type: "text", text: `Label '${createdLabel.name}' created on board ${boardId}:\n${JSON.stringify(createdLabel, null, 2)}` }],
				item: createdLabel
			};
		}
	);

	server.registerTool(
		"delete_label",
		{
			title: "Delete label",
			description: "Delete a label by its ID.",
			inputSchema: {
				labelId: z.string().describe("The ID of the label to delete")
			}
		},
		async ({ labelId }) => {
			await planka.deleteLabel(labelId);
			return {
				content: [{ type: "text", text: `Label ${labelId} deleted successfully.` }]
			};
		}
	);

	server.registerTool(
		"get_labels",
		{
			title: "Get labels for a board",
			description: "Get all labels for a board.",
			inputSchema: {
				boardId: z.string().describe("The ID of the board to get labels for")
			}
		},
		async ({ boardId }) => {
			const labels = await planka.getLabelsForBoard(boardId);
			return {
				content: [{ type: "text", text: `Labels for board ${boardId}:\n${JSON.stringify(labels, null, 2)}` }],
				items: labels
			};
		}
	);

	server.registerTool(
		"rename_label",
		{
			title: "Rename label",
			description: "Rename a label by its ID.",
			inputSchema: {
				labelId: z.string().describe("The ID of the label to rename"),
				newName: z.string().describe("The new name of the label")
			}
		},
		async ({ labelId, newName }) => {
			const updatedLabel = await planka.renameLabel(labelId, newName);
			return {
				content: [{ type: "text", text: `Label ${labelId} renamed:\n${JSON.stringify(updatedLabel, null, 2)}` }]
			};
		}
	);

	server.registerTool(
		"change_label_color",
		{
			title: "Change label color",
			description: "Change a label's color by its ID.",
			inputSchema: {
				labelId: z.string().describe("The ID of the label to update"),
				newColor: z.string().describe("The new color of the label")
			}
		},
		async ({ labelId, newColor }) => {
			const updatedLabel = await planka.changeLabelColor(labelId, newColor);
			return {
				content: [{ type: "text", text: `Label ${labelId} color changed to ${newColor}:\n${JSON.stringify(updatedLabel, null, 2)}` }]
			};
		}
	);



};
