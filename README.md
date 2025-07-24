![Planka MCP banner](assets/planka-banner.png)

# Planka MCP

> **Easily manage your Planka Kanban boards, cards, lists, and labels using an MCP (Model Context Protocol) server.**

---

## 🚀 Quick Start

The recommended way to run the Planka MCP server during development is through **VS Code integration**. This allows you to quickly launch and connect to the server from within your editor.

### 1. Add MCP Configuration

Create a `.vscode/mcp.json` file in your project root. Choose one of the following configurations depending on your use case:

#### 📦 For quick start / production (using published package):

```jsonc
{
  "servers": {
    "planka": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "planka-mcp"
      ],
      "env": {
        "PLANKA_EMAIL_OR_USERNAME": "<your-email-or-username>",
        "PLANKA_PASSWORD": "<your-password>",
        "PLANKA_API_URL": "<your-planka-api-url>"
      }
    }
  }
}
```

Use this if you want to run the published package without building locally. Replace all placeholders (`<your-email-or-username>`, `<your-password>`, `<your-planka-api-url>`) with your actual Planka credentials and API URL.

> **Note:** You can also define these variables in a `.env` file or set them directly in your shell environment.

#### ✅ Example `.env` file:

```env
PLANKA_EMAIL_OR_USERNAME=admin@planka.local
PLANKA_PASSWORD=UuN/D/ayvrj0DEag
PLANKA_API_URL=https://planka.hexidev.nl/api
```

> Be sure to update these values to match your Planka instance.

> **Tip:** As of v1.0.3, the published package is fully self-contained and compatible with `npx planka-mcp`.

> This configuration should also work with any MCP-compatible editor (e.g., Cursor, Windsurf), though it’s currently only tested in VS Code.

---

### 2. Build and Run the Server (Development Mode)

To run the server from your local build:

#### 🛠 Development configuration (`.vscode/mcp.json`):

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
      ],
      "env": {
        "PLANKA_EMAIL_OR_USERNAME": "<your-email-or-username>",
        "PLANKA_PASSWORD": "<your-password>",
        "PLANKA_API_URL": "<your-planka-api-url>"
      }
    }
  }
}
```

---

## 🛠 Features

* MCP server support for **Planka v2**
* Dynamic tool registration for boards, lists, cards, and labels
* `.env`-based environment variable configuration
* CLI + `npx` support for zero-setup usage

---

## 📝 Getting Started (Development)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file or export them in your terminal:

   ```env
   PLANKA_EMAIL_OR_USERNAME=admin
   PLANKA_PASSWORD=admin
   PLANKA_API_URL=http://example.com/api
   ```

3. **Build and run locally**

   ```bash
   npm run build
   node dist/index.js
   ```

   Or, if using the published package:

   ```bash
   npx planka-mcp
   ```

---

## 💡 Usage Examples

Run the MCP server using the default settings:

```bash
npx planka-mcp
```

You can also integrate the CLI with scripts or use it in any tool that supports MCP.

---

## 🖥️ Optional: VS Code Integration

To connect your MCP server to VS Code:

1. Create a `.vscode/mcp.json` file.
2. Add the appropriate configuration (see "Quick Start" above).
3. Start the MCP server from the VS Code command palette.