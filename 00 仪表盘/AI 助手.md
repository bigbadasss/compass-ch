通过 Agent Client 在 Vault 中使用已经配置好的代理。工作流会要求代理遵守 `AGENTS.md`，但这是行为规则，并不能从技术上保证每个客户端都会请求批准。请确认你使用的客户端已经关闭自动批准。设置方法参见 [[14 Agent Client 与 Claude Code]]。没有安装插件时，可以读取 `提示词/` 中的笔记，把其中的 “提示词”部分复制到你选择的代理中，参见 [[20 提示词库]]。

## 发送前检查

下面的按钮会准备提示词，但不会自动发送。请先在输入框中检查内容。嵌入式聊天会把当前这篇 AI 助手笔记作为上下文，但不会自动包含你刚才查看的其他笔记。

- 检查当前选择的代理、提及的笔记、附件，以及是否展开关联笔记。
- 使用模型服务商的对话可能会把提示词，以及已经包含或随后检索到的笔记发送给服务商。日记和人物关系笔记可能包含敏感个人信息。
- 进行大范围回顾前，先让代理列出准备读取的笔记路径和日期范围。只批准你愿意提供的上下文。
- 批准读取上下文，不等于批准修改、安装、付费或发布。
- 已配置代理或本地 API 密钥，不代表身份验证成功、连接可用或工作流已经通过测试。

Life OS 自带仪表盘不会直接调用模型服务商。这些控件会把操作交给 Agent Client，实际行为由 Agent Client 设置、外部客户端和所选代理共同决定。

## 每日
```agent
type: button
text: "开始今天"
prompt: "使用 vault_read 读取 提示词/01 早间启动.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "陪我完成今晚的问题"
prompt: "使用 vault_read 读取 提示词/02 晚间复盘.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "今天什么最重要"
prompt: "使用 vault_read 读取 提示词/14 今天最重要的事.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```

## 每周与每季度
```agent
type: button
text: "回顾本周"
prompt: "使用 vault_read 读取 提示词/03 每周回顾.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "准备季度回顾"
prompt: "使用 vault_read 读取 提示词/04 季度回顾准备.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "引导本次季度回顾"
prompt: "使用 vault_read 读取 提示词/05 季度回顾引导.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "分析问题和习惯趋势"
prompt: "使用 vault_read 读取 提示词/13 趋势分析.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```

## 工作
```agent
type: button
text: "整理任务收件箱"
prompt: "使用 vault_read 读取 提示词/06 任务整理.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "准备这次会议"
prompt: "使用 vault_read 读取 提示词/07 会议准备.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "启动这个项目"
prompt: "使用 vault_read 读取 提示词/08 项目启动.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "整理看板"
prompt: "使用 vault_read 读取 提示词/09 看板整理.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```

## 写作与研究
```agent
type: button
text: "继续处理这篇内容"
prompt: "使用 vault_read 读取 提示词/10 写作流程.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "发布前 SEO 检查"
prompt: "使用 vault_read 读取 提示词/11 发布前 SEO 检查.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "把本页面归档到知识库"
prompt: "使用 vault_read 读取 提示词/12 研究资料归档.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```

## 系统
```agent
type: button
text: "检查 Vault 健康状态"
prompt: "使用 vault_read 读取 提示词/15 知识库健康检查.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```
```agent
type: button
text: "帮我设置这个 Vault"
prompt: "使用 vault_read 读取 提示词/16 初始化助手.md，并按照其中的“提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: embed
autoSend: false
```

## 对话
```agent-client
type: chat
agent: claude-code-acp
height: 600px
id: lifeos-assistant
persist: true
noteContext: hosting
```
