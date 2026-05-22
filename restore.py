import json
import sys

log_path = r'C:\Users\07oms\.gemini\antigravity-ide\brain\e10c2c74-a0a8-4084-bef8-870dbbc67b7c\.system_generated\logs\transcript.jsonl'

app_versions = []
css_versions = []

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            for tc in data.get('tool_calls', []):
                if tc['name'] in ('write_to_file', 'replace_file_content', 'multi_replace_file_content'):
                    args = tc.get('args', {})
                    target = args.get('TargetFile', '')
                    if 'App.tsx' in target:
                        if 'CodeContent' in args:
                            app_versions.append(args['CodeContent'])
                    elif 'index.css' in target:
                        if 'CodeContent' in args:
                            css_versions.append(args['CodeContent'])
        except Exception as e:
            pass

if len(app_versions) >= 2:
    with open('src/App.tsx', 'w', encoding='utf-8') as f:
        f.write(app_versions[-2])
    print("Restored App.tsx")

if len(css_versions) >= 2:
    with open('src/index.css', 'w', encoding='utf-8') as f:
        f.write(css_versions[-2])
    print("Restored index.css")
