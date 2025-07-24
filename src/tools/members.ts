import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka } from "../lib/planka.js";
import z from "zod";

export default (server: McpServer, planka: Planka) => {
	server.registerTool("get_members",
		{
			title: "Get Members",
			description: "Gets all the members of the currently selected project.",
			inputSchema: {
				projectId: z.string().optional().describe("The ID of the project to select (Optional, normally don't provide this and instead be sure to use the selectProject tool or be sure you have used that).")
			}
		},
		async ({ projectId }) => {
			const project = await planka.getMembers(projectId)
			return {
				content: [{ type: "text", text: `Selected project: ${JSON.stringify(project)}` }]
			};
		}
	);
};
