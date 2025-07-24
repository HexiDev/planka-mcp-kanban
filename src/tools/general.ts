import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka, plankaColors, PlankaLabelCreate } from "../lib/planka.js";

export default (server: McpServer, planka: Planka) => {
	server.registerTool(
		"get_available_colors",
		{
			title: "Gets the available colors for labels, lists and cards",
			description: "Returns a list of colors that can be used for labels, lists, and cards in Planka.",
			inputSchema: {
			}
		},
		async ({ }) => {
			return {
				content: [{ type: "text", text: `Colors that you can use are: ${plankaColors.map(color => `\`${color}\``).join(", ")}` }],
			};
		}
	);
	server.registerTool(
		"get_available_gradients",
		{
			title: "Gets the available gradients for the project background",
			description: "Returns a list of gradients that can be used for the project background in Planka.",
			inputSchema: {
			}
		},
		async ({ }) => {
			return {
				content: [{ type: "text", text: `Gradients that you can use are: ${plankaColors.map(color => `\`${color}\``).join(", ")} for the project` }],
			};
		}
	);
};
