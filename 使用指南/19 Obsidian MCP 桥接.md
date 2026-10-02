# Obsidian MCP 桥接

Local REST API 5.x 可以在本机提供 MCP 服务，使支持 MCP 的代理以结构化方式读取和操作 Obsidian。

## 地址与配置

默认本地地址为：

`http://127.0.0.1:27123/mcp`

根目录的 `.mcp.example.json` 是配置示例。复制到客户端自己的用户配置时，替换 `PASTE_YOUR_LOCAL_REST_API_KEY`。真实密钥不得写入 Vault 或提交到 Git。

## 注册步骤

1. 启用 Local REST API 插件。
2. 在插件设置中生成本机密钥。
3. 确认服务只在 `127.0.0.1` 回环地址可用。
4. 在代理客户端中注册 MCP 地址和密钥。
5. 使用只读工具测试 `vault_read 使用指南/00 从这里开始.md`。
6. 再测试搜索和打开笔记，最后才测试经过批准的写入。

## 权限原则

- 读取不代表允许修改。
- 修改前读取目标笔记并展示准确变更。
- 不得把真实密钥提交到 `.mcp.json` 或聊天记录。
- Agent Client、Codex、Claude Code 和 Gemini 的配置方式不同，应使用各自当前文档。

`.claude/settings.json` 只预先允许只读工具。写入仍应由用户逐次批准。
