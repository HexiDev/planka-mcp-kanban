import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Planka, plankaColors } from "./lib/planka.js";
import { readdirSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config();

// Create an MCP server
const server = new McpServer({
	name: "planka-mcp",
	version: "1.0.0"
});

// Initialize Planka instance (replace with your credentials and baseUrl)
const planka = await Planka.init(
	process.env.PLANKA_EMAIL_OR_USERNAME || "admin",
	process.env.PLANKA_PASSWORD || "admin",
	process.env.PLANKA_API_URL || "http://example.com/api",
);



// Dynamically import and register all tools in the tools directory (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const toolsDir = join(__dirname, "tools");
const toolFiles: string[] = readdirSync(toolsDir).filter((f: string) => f.endsWith(".js"));
for (const file of toolFiles) {
	const toolModule = await import(join(toolsDir, file));
	// Assume each tool exports a default function or named function matching the filename
	// Pass server and planka to each tool
	if (typeof toolModule.default === "function") {
		toolModule.default(server, planka);
	} else {
		// Try to find a named export matching the filename (without extension)
		const toolName = basename(file, ".js");
		if (typeof toolModule[toolName] === "function") {
			toolModule[toolName](server, planka);
		}
	}
}
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);



