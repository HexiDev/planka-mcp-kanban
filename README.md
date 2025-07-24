



![Planka MCP banner](assets/planka-banner.png)

# Planka MCP

> **Manage your Planka Kanban boards, cards, lists, and labels via the Model Context Protocol (MCP) server.**

---


## 🚀 Quick Start

The recommended way to run the MCP server for development is via VS Code integration. This allows you to easily launch and connect to your MCP server from within VS Code.


1. **Add MCP configuration:**
   Create a `.vscode/mcp.json` file in your project root. Use one of the following examples depending on your use case:
   **For quick start/production (published package):**
   ```jsonc
   {
     "servers": {
       "planka": {
         "type": "stdio",
         "command": "npx",
         "args": [
           "-y",
           "planka-mcp"
         ]
       }
     }
   }
   ```
   Use this if you want to run the published package without building locally.

   > **Note:** This approach can also be used in any other MCP-ready editor (such as Cursor, Windsurf, etc.), though it has only been tested in VS Code so far.

2. **Build and run the server:**
   - For development: Install dependencies (`npm install`), build the project (`npm run build`), and use your editor to start the MCP server.
   

   - **For development (local build):**
   ```jsonc
   {
     "servers": {
       "planka": {
         "type": "stdio",
         "command": "npx",
         "args": [
           "-y",
           "node",
           "dist/index.js"
         ]
       }
     }
   }
   ```


## 🛠 Features
- MCP server for Planka **V2**
- Dynamic tool registration for Planka resources
- Environment variable support via `.env`
- CLI and NPX support for easy usage

---

## 📝 Getting Started (Development)

1. **Install dependencies:**
2. **Configure environment variables:**
   ```env
   PLANKA_EMAIL_OR_USERNAME=admin
   PLANKA_PASSWORD=admin
   PLANKA_API_URL=http://example.com/api
   ```

3. **Build and run locally:**
   ```bash
   npm run build
   node dist/index.js
   ```
   Or, use NPX after publishing:
   ```bash
   npx planka-mcp
   ```

---

## 💡 Usage Examples

Start the MCP server (default):
```bash
npx planka-mcp
```

You can also use the CLI in scripts or integrate with other tools that support MCP.
---

## 🖥️ VS Code Integration (Optional)

To connect VS Code to your locally built MCP server, create a `.vscode/mcp.json` file:

```jsonc
{
  "servers": {
    "planka": {
2. **Build and run the server:**
   - Install dependencies: `npm install`
   - Build the project: `npm run build`
