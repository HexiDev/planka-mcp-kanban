import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka, plankaColors, PlankaLabelCreate } from "../lib/planka.js";

export default (server: McpServer, planka: Planka) => {
	server.registerTool(
		"get_available_colors",
		{
			title: "Gets the available colors for labels, lists and cards",
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
