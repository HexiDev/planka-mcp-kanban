import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Planka } from "../lib/planka.js";
import z from "zod";

export default (server: McpServer, planka: Planka) => {
	server.registerTool("select_project",
		{
			title: "Selects a Planka project",
			description: "Always call this tool before using any other Planka tools to ensure the project context is set.",
			inputSchema: {
				projectId: z.string().describe("The ID of the project to select")
			}
		},
		async ({ projectId }) => {
			const project = await planka.selectProject(projectId);
			if (!project) {
				return {
					content: [{ type: "text", text: `Project with ID ${projectId} not found` }]
				};
			}
			return {
				content: [{ type: "text", text: `Selected project: ${JSON.stringify(project)}` }]
			};
		}
	);

	server.registerTool("get_projects",
		{
			title: "Get planka projects",
			description: "Get all projects from planka",
			inputSchema: {
			}
		},
		async () => {
			try {
				const projects = await planka.getProjects();
				return {
					content: [{ type: "text", text: JSON.stringify(projects) }]
				};
			} catch (err) {
				return {
					content: [{ type: "text", text: `Error fetching projects: ${err}` }]
				};
			}
		}
	);
	server.registerTool("update_project_background_gradient",
		{
			title: "Update project background gradient",
			description: "Update the background gradient of a project",
			inputSchema: {
				projectId: z.string().describe("The ID of the project to update"),
				gradient: z.string().describe("The new gradient for the project background")
			}
		},
		async ({ projectId, gradient }) => {
			try {
				const updatedProject = await planka.changeProjectBackgroundGradient(projectId, gradient);
				return {
					content: [{ type: "text", text: `Updated project background gradient: ${JSON.stringify(updatedProject)}` }]
				};
			} catch (err) {
				return {
					content: [{ type: "text", text: `Error updating project background gradient: ${err}` }]
				};
			}
		}
	);
};
