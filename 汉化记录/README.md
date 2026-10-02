# Compass 中文版汉化台账

本目录是中文版与英文上游之间的长期维护记录。任何 Agent 开始汉化、同步上游或修改目录结构前，都应先读取本文件、`state.json`、`path-map.json` 和 `glossary.json`。

## 目标

1. 所有面向中文用户显示的界面、说明和示例使用简体中文。
2. 用户可见的业务文件夹和笔记文件名使用中文。
3. 必须保持稳定的程序标识、属性键、插件 ID 和标准仓库文件名继续使用英文。
4. 每次同步英文上游时，都能确定哪些英文文件发生变化，以及应更新哪个中文文件。

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `state.json` | 上游地址、基准提交、当前阶段和最近一次汉化状态 |
| `path-map.json` | 英文路径到中文路径的对应关系，以及必须保留的技术路径 |
| `glossary.json` | 统一译名、保留标识和禁止翻译的机器键 |
| `CHANGELOG.md` | 每批汉化的范围、测试结果和未完成事项 |
| `scripts/localization_report.py` | 比较上游提交，生成下一轮待汉化文件清单 |

## 上游更新后的标准流程

1. 获取英文上游：`git fetch upstream main`。
2. 生成变化报告：`python3 scripts/localization_report.py upstream/main`。
3. 按 `path-map.json` 找到对应的中文目标文件。
4. 翻译新增或变化的用户可见内容，同时保留 `glossary.json` 中的机器标识。
5. 更新 `state.json` 的 `upstream_base_commit`，并在 `CHANGELOG.md` 记录本轮结果。
6. 运行项目验证和 Obsidian 实际加载测试。

## 路径改名原则

- 使用 Git 移动文件，保留历史记录。
- 每次只迁移一个顶层模块，同时修改所有模板、查询、脚本和插件中的纯文本路径。
- Obsidian 自动更新双向链接并不覆盖 JavaScript、JSON、Python 和 Tasks 查询，因此不能只在文件管理器中改名。
- 每完成一个模块，立即运行路径、标题片段、模板和插件验证。
- `.obsidian/plugins/life-os-app/main.js` 的可见文字单独作为插件汉化批次处理。

## 完成标准

- Obsidian 文件浏览器中的用户业务目录与笔记标题为中文。
- Life OS、Markdown 仪表盘、模板、提示词和示例内容为中文。
- 新建每日、每周、季度、项目和人物笔记均进入中文目录。
- 仪表盘、任务查询、QuickAdd、Templater、Periodic Notes 和 Life OS 路径全部有效。
- 构建候选版本通过全部自动检查，并完成桌面端与移动端人工测试。
