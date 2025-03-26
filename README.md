# 🗄️ MongoDB MCP Server for LLMS

[![smithery badge](https://smithery.ai/badge/mongo-mcp)](https://smithery.ai/server/mongo-mcp)
[![Node.js 18+](https://img.shields.io/badge/node-18%2B-blue.svg)](https://nodejs.org/en/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![smithery badge](https://smithery.ai/badge/mongo-mcp)](https://smithery.ai/server/mongo-mcp)

A Model Context Protocol (MCP) server that enables LLMs to interact directly with MongoDB databases. Query collections, inspect schemas, and manage data seamlessly through natural language.

## ✨ Features

- 🔍 Collection schema inspection
- 📊 Document querying and filtering
- 📈 Index management
- 📝 Document operations (insert, update, delete)

## Demo Video


https://github.com/user-attachments/assets/2389bf23-a10d-49f9-bca9-2b39a1ebe654




## 🚀 Quick Start

To get started, find your mongodb connection url and add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application\ Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": [
        "mongo-mcp",
        "mongodb://<username>:<password>@<host>:<port>/<database>?authSource=admin"
      ]
    }
  }
}
```

### Installing via Smithery

To install MongoDB MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/mongo-mcp):

```bash
npx -y @smithery/cli install mongo-mcp --client claude
```

### Prerequisites

- Node.js 18+
- npx
- Docker and Docker Compose (for local sandbox testing only)
- MCP Client (Claude Desktop App for example)

### Test Sandbox Setup

If you don't have a mongo db server to connect to and want to create a sample sandbox, follow these steps

1. Start MongoDB using Docker Compose:

```bash
docker-compose up -d
```

2. Seed the database with test data:

```bash
npm run seed
```

### Configure Claude Desktop

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application\ Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

#### Local Development Mode:

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "node",
      "args": [
        "dist/index.js",
        "mongodb://root:example@localhost:27017/test?authSource=admin"
      ]
    }
  }
}
```

### Test Sandbox Data Structure

The seed script creates three collections with sample data:

#### Users

- Personal info (name, email, age)
- Nested address with coordinates
- Arrays of interests
- Membership dates

#### Products

- Product details (name, SKU, category)
- Nested specifications
- Price and inventory info
- Tags and ratings

#### Orders

- Order details with items
- User references
- Shipping and payment info
- Status tracking

## 🎯 Example Prompts

Try these prompts with Claude to explore the functionality:

### Basic Operations

```plaintext
"What collections are available in the database?"
"Show me the schema for the users collection"
"Find all users in San Francisco"
```

### Advanced Queries

```plaintext
"Find all electronics products that are in stock and cost less than $1000"
"Show me all orders from the user john@example.com"
"List the products with ratings above 4.5"
```

### Index Management

```plaintext
"What indexes exist on the users collection?"
"Create an index on the products collection for the 'category' field"
"List all indexes across all collections"
```

### Document Operations

```plaintext
"Insert a new product with name 'Gaming Laptop' in the products collection"
"Update the status of order with ID X to 'shipped'"
"Find and delete all products that are out of stock"
```

## 📝 Available Tools

The server provides these tools for database interaction:

### Query Tools

- `find`: Query documents with filtering and projection
- `listCollections`: List available collections
- `insertOne`: Insert a single document
- `updateOne`: Update a single document
- `deleteOne`: Delete a single document

### Index Tools

- `createIndex`: Create a new index
- `dropIndex`: Remove an index
- `indexes`: List indexes for a collection

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
