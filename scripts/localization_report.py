#!/usr/bin/env python3
"""根据汉化台账列出英文上游更新后需要处理的中文文件。"""

import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
STATE_PATH = ROOT / "localization" / "state.json"
MAP_PATH = ROOT / "localization" / "path-map.json"


def load_json(path):
    with path.open(encoding="utf-8") as stream:
        return json.load(stream)


def mapped_path(source, mapping):
    exact = {item["source"]: item["target"] for item in mapping["exact_mappings"]}
    if source in exact:
        return exact[source]
    prefixes = sorted(mapping["prefix_mappings"], key=lambda item: len(item["source"]), reverse=True)
    for item in prefixes:
        if source.startswith(item["source"]):
            return item["target"] + source[len(item["source"]):]
    return source


def main():
    state = load_json(STATE_PATH)
    mapping = load_json(MAP_PATH)
    base = state["upstream_base_commit"]
    target = sys.argv[1] if len(sys.argv) > 1 else "upstream/main"
    command = ["git", "diff", "--name-status", f"{base}..{target}"]
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
    if result.returncode:
        print(f"无法比较 {base} 与 {target}。请先运行：git fetch upstream main", file=sys.stderr)
        print(result.stderr.strip(), file=sys.stderr)
        return 1
    if not result.stdout.strip():
        print("上游基准之后没有文件变化。")
        return 0
    print(f"上游变化：{base[:12]}..{target}")
    print("状态\t英文上游路径\t中文目标路径")
    for line in result.stdout.splitlines():
        parts = line.split("\t")
        status = parts[0]
        source = parts[-1]
        print(f"{status}\t{source}\t{mapped_path(source, mapping)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

