---
birthdate: 
life_expectancy: 80
daily_folder: 01 日志/每日
weekly_folder: 01 日志/每周
quarterly_folder: 01 日志/每季度
retreat_folder: 02 季度回顾
projects_folder: 04 项目
dq_prefix: dq_
habit_prefix: habit_
wheel_prefix: wheel_
board_done_lanes: 已完成,已发布,归档
questions:
  - key: dq_goals
    text: 今天，我是否尽力设定清晰的目标？
  - key: dq_progress
    text: 今天，我是否尽力推动目标取得进展？
  - key: dq_meaning
    text: 今天，我是否尽力寻找意义？
  - key: dq_happy
    text: 今天，我是否尽力让自己快乐？
  - key: dq_relationships
    text: 今天，我是否尽力建立积极的人际关系？
  - key: dq_engaged
    text: 今天，我是否尽力全身心投入？
habits:
  - habit_journal
  - habit_exercise
  - habit_reading
wheel_areas:
  - wheel_health
  - wheel_relationships
  - wheel_family
  - wheel_career
  - wheel_finances
  - wheel_growth
  - wheel_fun
  - wheel_meaning
---
# Compass 配置

这里是系统读取设置的唯一位置。`系统/视图/` 中的每个仪表盘组件都会从 `dv.page("系统/Compass 配置")` 开始读取配置；每日笔记、季度回顾和每日问题模板也会在创建新笔记时读取下面的列表。只需修改这里，不必移动其他内容。

## 个人设置
| 属性 | 用途 | 说明 |
| --- | --- | --- |
| `birthdate` | 人生倒计时组件 | ISO 日期，格式为 `YYYY-MM-DD`。请自行填写。 |
| `life_expectancy` | 人生倒计时组件 | 预期寿命，单位为年。 |

## 每日问题（`questions`）
这些问题来自马歇尔·戈德史密斯的《触发改变》，按 1 到 10 分评价“我是否尽力”，衡量的是努力程度，不是结果。你可以修改问题文字、增加或删除条目。为兼容已有数据，建议保留现有键名；新增键必须以 `dq_` 开头，使用小写字母且不能包含空格。新建每日笔记会自动采用这份列表，晚间提示会依次提问，仪表盘会自动发现所有 `dq_*` 属性。

下面是 Mike Schmitz 视频中的问题预设，如有需要可替换上面的列表：
```yaml
questions:
  - {key: dq_spiritual, text: 今天，我是否尽力获得精神成长？}
  - {key: dq_spouse, text: 今天，我是否尽力关爱伴侣？}
  - {key: dq_kids, text: 今天，我是否尽力关爱孩子？}
  - {key: dq_friend, text: 今天，我是否尽力做一个好朋友？}
  - {key: dq_learn, text: 今天，我是否尽力学习新东西？}
  - {key: dq_create, text: 今天，我是否尽力创造？}
  - {key: dq_exercise, text: 今天，我是否尽力锻炼？}
```

## 习惯（`habits`）
这里的条目会作为复选框属性加入每篇新建的每日笔记。每个阶段保留 3 到 5 个习惯即可，键名使用 `habit_` 前缀。

## 生命之轮（`wheel_areas`）
这里的条目会作为 1 到 10 分的数字属性加入每篇新建的季度回顾笔记。键名使用 `wheel_` 前缀；雷达图会根据键名自动生成标签。

## 文件夹和前缀
| 属性 | 用途 |
| --- | --- |
| `daily_folder`, `weekly_folder`, `quarterly_folder`, `retreat_folder`, `projects_folder` | 仪表盘组件和快捷链接；必须与 Periodic Notes 设置一致。 |
| `dq_prefix`, `habit_prefix`, `wheel_prefix` | 用于自动发现对应属性。 |
| `board_done_lanes` | 看板仪表盘中被视为已完成的泳道名称。为兼容默认看板，请保留英文值。 |

中文版已经翻译了默认问题和界面文字。底层键名、路径和完成泳道保留英文，以确保模板、插件和历史数据继续正常工作。
