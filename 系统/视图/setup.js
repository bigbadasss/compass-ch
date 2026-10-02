// Compass Setup status widget. Usage: await dv.view("系统/视图/setup")
// Detects what is still at its template default. Renders booleans only; never shows key values; never writes.
const cfg = dv.page("系统/Compass 配置") || {};
const cur = dv.current() || {};
const rows = [];
const add = (tier, item, ok, where, note) => rows.push({ tier, item, ok, where, note: note || "" });
const readJson = async p => { try { return JSON.parse(await app.vault.adapter.read(p)); } catch (e) { return null; } };
const readText = async p => { try { const f = app.vault.getAbstractFileByPath(p); return f ? await app.vault.cachedRead(f) : ""; } catch (e) { return ""; } };
const enabled = id => { try { return app.plugins.enabledPlugins.has(id); } catch (e) { return false; } };
const pset = id => { try { return app.plugins.plugins[id]?.settings || null; } catch (e) { return null; } };
const today = moment();

// Tier 0: the app
for (const [id, name] of [["life-os-app", "Life OS"], ["dataview", "Dataview"], ["templater-obsidian", "Templater"], ["periodic-notes", "Periodic Notes"], ["quickadd", "QuickAdd"], ["obsidian-tasks-plugin", "Tasks"], ["obsidian-kanban", "Kanban"]])
  add(0, `${name} 插件已启用`, enabled(id), "设置 → 第三方插件");
add(0, "Life OS 应用命令已注册", !!app.commands.findCommand("life-os-app:open-home"), "命令面板 → Life OS: Open Life OS home");
add(0, "Dataview JavaScript 查询已启用", !!(pset("dataview")?.enableDataviewJs), "设置 → Dataview");
add(0, "lifeos CSS 代码片段已启用", (() => { try { return app.customCss.enabledSnippets.has("lifeos"); } catch (e) { return false; } })(), "设置 → 外观 → CSS 代码片段");
add(0, "Periodic Notes 的每日笔记文件夹与配置一致", (() => { const pn = pset("periodic-notes"); return !!pn && pn.daily?.folder === (cfg.daily_folder || "01 日志/每日") && /每日笔记\.md$/.test(pn.daily?.template || ""); })(), "设置 → Periodic Notes");
add(0, "Templater 会在新建文件时运行", (() => { const t = pset("templater-obsidian"); return !!t && (t.trigger_on_file_creation === true || t.trigger_on_file_creation_mode === "folder"); })(), "设置 → Templater");
add(0, "QuickAdd 捕获选项已启用为命令", (() => { const ch = pset("quickadd")?.choices || []; return ["Journal entry", "Log a win", "Gratitude", "Add task"].every(n => ch.find(c => (c.name || "").includes(n))?.command === true); })(), "设置 → QuickAdd（每个选项旁的闪电图标）");
add(0, "已为今日笔记和每日问题设置快捷键", (() => { try { const hk = app.hotkeyManager.customKeys || {}; return ["quickadd:choice:lifeos-daily", "templater-obsidian:模板/每日问题提示.md"].every(id => (hk[id] || []).length > 0); } catch (e) { return false; } })(), "设置 → 快捷键");

// Tier 1: make it yours
add(1, "已设置出生日期", !!cfg.birthdate && String(cfg.birthdate).slice(0, 10) !== "1990-01-01", "[[Compass 配置]]");
const theme = await readText("03 规划/人生主题.md");
add(1, "已写下人生主题", theme.length > 0 && !theme.includes("Replace this line with your life theme"), "[[人生主题]]");
const values = await readText("03 规划/核心价值观.md");
add(1, "已写下核心价值观", values.length > 0 && !/\*\*Value one\*\*/.test(values), "[[核心价值观]]");
add(1, "理想一周已按自己的情况填写（已删除 example 属性）", !((dv.page("03 规划/理想一周") || {}).example === true), "[[理想一周]]", "填写表格，然后删除 example 属性");
add(1, "已检查每日问题、习惯和生命之轮领域", Array.isArray(cfg.questions) && cfg.questions.length > 0 && Array.isArray(cfg.habits) && cfg.habits.length <= 5, "[[Compass 配置]]", Array.isArray(cfg.habits) && cfg.habits.length > 5 ? "习惯超过 5 个；建议每个阶段保留 3 到 5 个" : "");
const examples = dv.pages("#example").length;
add(1, "已删除示例笔记", examples === 0, "[[16 初始化助手]] 第 6 步，或删除带 example 标签的笔记", examples ? `还剩 ${examples} 篇示例笔记` : "");

// Tier 2: the practice
const daily = cfg.daily_folder || "01 日志/每日";
const dqp = cfg.dq_prefix || "dq_";
add(2, "今天的每日笔记已创建", !!dv.page(`${daily}/${today.format("YYYY-MM-DD")}`), "Ctrl/Cmd+Shift+D");
const real = dv.pages(`"${daily}"`).where(p => /^\d{4}-\d{2}-\d{2}$/.test(p.file.name) && !(p.tags || []).includes("example")).array();
const answered = real.filter(p => Object.entries(p.file.frontmatter || {}).some(([k, v]) => k.startsWith(dqp) && v !== null && v !== "" && v !== undefined));
const last30 = answered.filter(p => today.diff(moment(p.file.name), "days") < 30).length;
add(2, "已回答第一组真实的每日问题", answered.length > 0, "今晚按 Ctrl/Cmd+Shift+Q，或打开 [[02 End of Day Coaching]]");
add(2, `最近 30 天已回答天数（目标 25 天）`, last30 >= 25, "继续保持", `${last30}/30`);
add(2, "本周周记已创建", !!dv.page(`${cfg.weekly_folder || "01 日志/每周"}/${today.format("gggg-[W]ww")}`), "命令面板：Periodic Notes: Open weekly note", "从第 2 周开始");
add(2, "本季度的季度回顾笔记已创建", !!dv.page(`${cfg.retreat_folder || "02 季度回顾"}/${today.format("YYYY-[Q]Q")} 季度个人回顾`), "[[04 工作流 - 季度个人回顾]]", "从第 60 天开始");
const plan = (await readText("09 阅读/阅读计划.md")).replace(/```[\s\S]*?```/g, "");
if (app.vault.getAbstractFileByPath("09 阅读")) add(2, "已决定是否使用阅读模块（填写计划或删除文件夹）", /^- \[ \]/m.test(plan), "[[07 工作流 - 每日阅读]]", "可选");

// Tier 3: AI in the vault (optional)
add(3, "Agent Client 插件已启用", enabled("agent-client"), "设置 → 第三方插件", "可选");
const ac = await readJson(".obsidian/plugins/agent-client/data.json");
const configuredCommands = Object.values(ac?.presetAgents || {}).map(p => p?.command || "").filter(Boolean);
const isLinux = navigator.userAgent.includes("Linux") && !navigator.userAgent.includes("Android");
add(3, "Agent Client 已设置至少一个本地代理路径", configuredCommands.some(cmd => !isLinux || cmd.startsWith("/")), "设置 → Agent Client → 选择代理 → Auto-detect", "可选；Linux Flatpak 需要使用包装脚本的完整路径，参见指南 14");
add(3, "代理已登录（自行确认）", cur.setup_claude_login === true, "在本笔记属性中勾选 setup_claude_login", "可选；为兼容升级而保留此属性名");
add(3, "已为代理注册 Obsidian MCP 服务（自行确认）", cur.setup_mcp_registered === true, "完成 [[19 Obsidian MCP 桥接]] 后勾选 setup_mcp_registered", "可选");
add(3, "已在 Agent Client 中进行过对话", (ac?.savedSessions || []).length > 0, "[[AI 助手]]", "可选");

// Tier 4: browser and web (optional)
add(4, "Local REST API 已启用", enabled("obsidian-local-rest-api"), "设置 → 第三方插件", "可选");
const ra = await readJson(".obsidian/plugins/obsidian-local-rest-api/data.json");
add(4, "已生成 REST API 密钥（这里不会显示）", typeof ra?.apiKey === "string" && ra.apiKey.length > 0 && ra?.enableInsecureServer === true, "设置 → Local REST API", "可选");
add(4, "Vault Lens 扩展已连接（自行确认）", cur.setup_vault_lens === true, "完成 [[17 搜索服务]] 后勾选 setup_vault_lens", "可选");
add(4, "Web viewer 核心插件已启用", (() => { try { return app.internalPlugins.plugins.webviewer?.enabled === true; } catch (e) { return false; } })(), "设置 → 核心插件", "可选");
add(4, "已设置 SEO 扫描目录", ((await readJson(".obsidian/plugins/seo/data.json"))?.scanDirectories || "").includes("06 写作"), "设置 → SEO", "可选");
add(4, "Vault 文件夹已有备份（自行确认）", cur.setup_backup === true, "将文件夹复制到其他位置，然后勾选 setup_backup");

// Render
const root = dv.container.createEl("div", { cls: "lifeos-widget" });
if (cur.status === "done") { root.createEl("p", { text: "设置已标记为完成。把本笔记的 status 属性改回 open，可以重新打开清单。" }); }
else {
  const tiers = { 0: "第 0 层：应用基础", 1: "第 1 层：完成个性化", 2: "第 2 层：建立实践", 3: "第 3 层：Vault 中的 AI（可选）", 4: "第 4 层：浏览器和网页工具（可选）" };
  const total = rows.filter(r => r.tier <= 2).length, done = rows.filter(r => r.tier <= 2 && r.ok).length;
  root.createEl("p", { text: `必需项目已完成 ${done}/${total}。下面的可选层属于扩展功能，不完成也不影响 Vault 基本使用。` });
  for (const t of [0, 1, 2, 3, 4]) {
    root.createEl("h4", { text: tiers[t] });
    const table = root.createEl("table", { cls: "lifeos-table" });
    const th = table.createEl("thead").createEl("tr"); for (const h of ["", "项目", "处理位置", "说明"]) th.createEl("th", { text: h });
    const tb = table.createEl("tbody");
    for (const r of rows.filter(x => x.tier === t)) {
      const tr = tb.createEl("tr");
      tr.createEl("td", { text: r.ok ? "✅" : "⬜" });
      tr.createEl("td", { text: r.item });
      const td = tr.createEl("td");
      const m = r.where.match(/^\[\[([^\]]+)\]\]/);
      if (m) { const a = td.createEl("a", { text: m[1], cls: "internal-link", attr: { href: m[1], "data-href": m[1] } }); a.addEventListener("click", e => { e.preventDefault(); app.workspace.openLinkText(m[1], "", false); }); td.appendText(r.where.slice(m[0].length)); }
      else td.setText(r.where);
      tr.createEl("td", { text: r.note });
    }
  }
}
