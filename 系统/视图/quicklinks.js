// Compass quick links: capture buttons (QuickAdd commands) + jump to today's multi-scale planning notes.
// Usage: await dv.view("系统/视图/quicklinks")
const cfg = dv.page("系统/Compass 配置") || {};
const DAILY = cfg.daily_folder || "01 日志/每日";
const WEEKLY = cfg.weekly_folder || "01 日志/每周";
const QUARTERLY = cfg.quarterly_folder || "01 日志/每季度";
const RETREATS = cfg.retreat_folder || "02 季度回顾";
const root = dv.container.createEl("div", { cls: "lifeos-widget" });

const now = moment();
const links = [
  ["今天", `${DAILY}/${now.format("YYYY-MM-DD")}`, now.format("YYYY-MM-DD")],
  ["本周", `${WEEKLY}/${now.format("gggg-[W]ww")}`, now.format("gggg-[W]ww")],
  ["本季度", `${QUARTERLY}/${now.format("YYYY-[Q]Q")}`, now.format("YYYY-[Q]Q")],
  ["季度回顾", `${RETREATS}/${now.format("YYYY-[Q]Q")} 季度个人回顾`, `${now.format("YYYY-[Q]Q")} 季度个人回顾`],
];
const p = root.createEl("p");
p.appendText("跳转：");
links.forEach(([lab, path, name], i) => {
  if (i) p.appendText("  ·  ");
  const a = p.createEl("a", { text: `${lab} (${name})`, cls: "internal-link", attr: { href: name, "data-href": name } });
  a.addEventListener("click", e => { e.preventDefault(); app.workspace.openLinkText(name, path, false); });
});

// Buttons resolve the QuickAdd choice by NAME at click time, so ids may change freely.
const buttons = [
  ["📝 写日记", "Journal entry", "lifeos-journal"],
  ["🏆 记录收获", "Log a win", "lifeos-win"],
  ["🙏 记录感恩", "Gratitude", "lifeos-gratitude"],
  ["✅ 添加任务", "Add task", "lifeos-task"],
];
const wrap = root.createEl("div", { cls: "lifeos-buttons" });
for (const [lab, name, fallbackId] of buttons) {
  const b = wrap.createEl("button", { text: lab });
  b.addEventListener("click", () => {
    const qa = app.plugins?.plugins?.quickadd;
    const choice = qa?.settings?.choices?.find(c => (c.name || "").includes(name));
    const id = `quickadd:choice:${choice ? choice.id : fallbackId}`;
    const ok = app.commands.executeCommandById(id);
    if (!ok) new Notice(`未找到 QuickAdd 选项“${name}”，或该选项尚未启用为命令。请检查 QuickAdd 设置。`);
  });
}
