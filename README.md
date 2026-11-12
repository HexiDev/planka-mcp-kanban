![Planka MCP banner](assets/planka-banner.png)

# Planka MCP

> **Easily manage your Planka Kanban boards, cards, lists, and labels using an MCP (Model Context Protocol) server.**

---

## 🚀 Quick Start

The recommended way to run the Planka MCP server during development is through **VS Code integration**. This allows you to quickly launch and connect to the server from within your editor.

### 1. Add MCP Configuration

Create a `.vscode/mcp.json` file in your project root. Choose one of the following configurations depending on your use case:

#### 📦 For quick start / production (using published package):

This package is published to **GitHub Packages** under `@hexidev/planka-mcp`. See [Installing from GitHub Packages](#-installing-from-github-packages) for the required registry authentication.

```jsonc
{
  "servers": {
    "planka": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@hexidev/planka-mcp"
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

#### 📥 Installing from GitHub Packages

`@hexidev/planka-mcp` is published to the **GitHub Packages** npm registry, which requires authentication even for reads. Create an `.npmrc` in your project or home directory with a GitHub Personal Access Token (classic) that has the `read:packages` scope:

```ini
@hexidev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<your-github-token>
```

Then run the server:

```bash
npx -y @hexidev/planka-mcp
```

> If the token is missing or lacks `read:packages`, `npx` will fail with `401 Unauthorized` or `404 Not Found` when resolving `@hexidev/planka-mcp`.

> **Note:** You can also define these variables in a `.env` file or set them directly in your shell environment.

#### ✅ Example `.env` file:

```env
PLANKA_EMAIL_OR_USERNAME=<your-email-or-username>
PLANKA_PASSWORD=<your-password>
PLANKA_API_URL=<your-planka-api-url>
```

> Be sure to update these values to match your Planka instance.

> **Tip:** As of v1.0.3, the published package is fully self-contained and compatible with `npx @hexidev/planka-mcp`.

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
   npx -y @hexidev/planka-mcp
   ```

---

## 💡 Usage Examples

Run the MCP server using the default settings:

```bash
npx -y @hexidev/planka-mcp
```

You can also integrate the CLI with scripts or use it in any tool that supports MCP.

---

## 🖥️ Optional: VS Code Integration

To connect your MCP server to VS Code:

1. Create a `.vscode/mcp.json` file.
2. Add the appropriate configuration (see "Quick Start" above).
3. Start the MCP server from the VS Code command palette.