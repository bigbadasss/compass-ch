---
cssclasses:
  - lifeos-dashboard
---
下面的内容全部根据你已经写下的笔记自动生成。修改每日笔记模板、季度回顾笔记或配置后，本页面会自动更新，无需手动修改代码。

```dataviewjs
await dv.view("系统/视图/quicklinks");
```

> [!theme] 人生主题
> ![[人生主题#人生主题]]

## 生命之轮（本季度回顾）
```dataviewjs
await dv.view("系统/视图/wheel");
```

## 每日问题
显示每日笔记中所有 `dq_*` 属性的趋势和平均值。可以选择问题和时间范围。
```dataviewjs
await dv.view("系统/视图/dailyquestions", { days: 30 });
```

## 习惯
```dataviewjs
await dv.view("系统/视图/habits", { days: 21 });
```

## 看板
```dataviewjs
await dv.view("系统/视图/boards", { compact: true });
```

## 人生倒计时
```dataviewjs
await dv.view("系统/视图/memento");
```

## 询问助手
打开 [[AI 助手]] 查看完整提示词库，或直接运行下面的操作（需要 Agent Client 插件和已配置的代理）：
```agent
type: button
text: "今天什么最重要"
prompt: "使用 vault_read 读取 提示词/14 今天最重要的事.md，并按照其中的 “提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: right-pane
```
```agent
type: button
text: "回顾本周"
prompt: "使用 vault_read 读取 提示词/03 每周回顾.md，并按照其中的 “提示词”部分处理我当前打开的笔记；如果当前笔记不适用，则处理当前周期。"
viewType: right-pane
```

## 相关仪表盘
- [[习惯画布|习惯画布]]
- [[每日问题|每日问题]]
- [[任务仪表盘|任务仪表盘]]
- [[项目仪表盘|项目仪表盘]]
- [[看板]]
- [[AI 助手]]
- [[初始设置|初始化设置]]
- [[理想一周|理想一周]] · [[核心价值观|核心价值观]] · [[人生主题|人生主题]]
