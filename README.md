# Planka MCP

This project integrates Planka with the Model Context Protocol (MCP) server, allowing you to manage Planka boards, cards, lists, and labels via MCP.

## Features
- MCP server for Planka
- Dynamic tool registration for Planka resources
- Environment variable support via `.env`

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   Create a `.env` file in the project root:
   ```env
   PLANKA_EMAIL_OR_USERNAME=admin
   PLANKA_PASSWORD=admin
   PLANKA_API_URL=http://example.com/api
   ```
3. **Run the server:**
   ```bash
   npm start
   ```

## Project Structure
- `src/index.ts`: Main entry point
- `src/lib/planka.ts`: Planka API integration
- `src/tools/`: MCP resource tools (boards, cards, lists, labels, projects)

## License
MIT
# planka-mcp-kanban
