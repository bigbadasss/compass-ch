#!/usr/bin/env node
// 只读取系统工作流定义，不连接任何代理或模型服务商。
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve(process.argv[2] || ".");
const source = fs.readFileSync(path.join(root, "00 仪表盘/AI 助手.md"), "utf8");
const buttons = [...source.matchAll(/```agent\n([\s\S]*?)```/g)];
assert.equal(buttons.length, 16, "All 16 assistant workflows must remain available");
for (const [, block] of buttons) {
  assert.match(block, /^autoSend: false$/m, "Workflow must require a separate send action");
  assert.match(block, /^type: button$/m);
  const promptPath = block.match(/(提示词\/[^"\n]+?\.md)/);
  assert.ok(promptPath, "Workflow must name a local prompt");
  assert.ok(fs.existsSync(path.join(root, promptPath[1])), "Named prompt must exist");
}
assert.match(source, /## 发送前检查/);
assert.match(source, /行为规则，并不能从技术上保证/);
assert.match(source, /noteContext: hosting/);
assert.match(source, /不代表身份验证成功/);
console.log("助手契约检查通过：16 个工作流均不自动发送，提示词路径存在，并包含上下文与权限说明。此检查不测试原生客户端行为。");
