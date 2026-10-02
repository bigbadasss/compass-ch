# 为 Compass 中文版做贡献

## 工作 Vault 与模板的关系

维护者在工作 Vault 中保存真实笔记，公开仓库保存经过清理的模板。`scripts/build_template.py` 会排除 Git 状态、本机配置、工作区文件、Agent Client 会话、附件、知识库内容和收件箱内容，只保留用户目录中带 `example` 标签的示例笔记；随后重置个人配置与插件设置，加入版本信息，运行 `scripts/verify_template.py`，最后生成压缩包。具体发布要求见 `scripts/RELEASE.md`。

```bash
python3 scripts/build_template.py --out build --name Compass --version 1.0.0 --zip
python3 scripts/verify_template.py build/Compass
```

## 贡献规则

1. **在维护源中修改系统文件，再通过构建脚本发布。** 仪表盘、视图、使用指南、模板、提示词、脚本、`AGENTS.md` 和插件设置都在维护源中修改。不要只改构建产物，否则下次构建会丢失修改。
2. **绝不提交密钥或本机状态。** 不得提交真实 `.mcp.json`、`.claude/settings.local.json`、Agent Client 会话、导出聊天、工作区状态、`.vault-meta/`、API 密钥、证书、绝对路径、用户名或邮箱地址。
3. **验证必须通过。** 提交拉取请求前，在仓库根目录运行 `python3 scripts/verify_template.py .`。它需要 Python 3 和 Node。GitHub Actions 也会运行同一检查。
4. **正文中不要使用英文长破折号字符。** 验证程序会拒绝该字符，请改用逗号、句号、冒号或括号。
5. **同步许可证与版本。** 插件版本变化时，同时更新 `THIRD_PARTY_NOTICES.md` 和 `系统/版本.md`。
6. **记录用户可见变化。** 在 `CHANGELOG.md` 中写明新增、变更、模板合并说明、插件变化和破坏性变化。
7. **遵守属性与任务约定。** 继续使用 `dq_*`、`habit_*`、`wheel_*` 等机器键，以及 `AGENTS.md` 中规定的任务和链接格式。
8. **维护汉化台账。** 同步英文上游或调整中文路径时，更新 `汉化记录/state.json`、`path-map.json` 和 `CHANGELOG.md`。

## 建议新的提示词

每个重复工作在 `提示词/` 中使用一篇笔记，并遵守 `使用指南/20 提示词库.md` 的格式。

- **Frontmatter**：填写 `purpose`、`when`、`inputs`、`writes`、`risk`、`tools` 和 `agents`。这些是机器字段，名称保持不变。
- **正文**：先放 Agent Client 按钮块，再把完整提示词放在 `## 提示词` 下。按钮只引用本地提示词路径，并保持 `autoSend` 关闭。
- **提示词内容**：先写共同规则，再用编号步骤说明每次读取和写入使用的 MCP 工具，最后写明代理不得执行的操作。
- **按钮位置**：说明按钮应放在哪个仪表盘或模板，并在 `使用指南/20 提示词库.md` 的表格中加入一行。

可以使用“提示词建议”Issue 模板，也可以复制现有提示词并提交拉取请求。具有写入能力的提示词必须符合 `AGENTS.md` 的安全规则。
