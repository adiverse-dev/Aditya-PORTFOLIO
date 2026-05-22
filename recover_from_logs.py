import json
import re
import os

log_path = r'C:\Users\07oms\.gemini\antigravity-ide\brain\e10c2c74-a0a8-4084-bef8-870dbbc67b7c\.system_generated\logs\transcript.jsonl'

# Dictionary to hold the very first code block found for each file
restored_contents = {}

def unescape_and_clean(text):
    lines = text.split('\n')
    clean_lines = []
    parsing = False
    for line in lines:
        if line.startswith('1: '):
            parsing = True
        if parsing:
            m = re.match(r'^\d+: (.*)$', line)
            if m:
                clean_lines.append(m.group(1))
            elif re.match(r'^\d+:$', line):
                clean_lines.append('')
            elif line.startswith('The above content shows the entire, complete file contents') or line.startswith('The following code has been modified'):
                pass
    return '\n'.join(clean_lines)

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            # Find any view_file response
            if data.get('type') == 'TOOL_RESPONSE' or 'output' in str(data):
                content_str = str(data)
                # Look for file paths inside the response
                if 'File Path: `file:///' in content_str:
                    # we need to be careful with JSON escaping
                    pass
            # Or simpler: look at the raw line for 'File Path: `file:///'
            # Since the output is stored in the json, let's extract it.
            if 'output' in data.get('content', '') or ('tool_calls' in data):
                pass
        except Exception:
            pass

# Let's just scan the raw json lines for "File Path: `file:///c:/Users/07oms/Downloads/portfolio-Aditya/src/"
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        if 'File Path: `file:///c:/Users/07oms/Downloads/portfolio-Aditya/src/' in line:
            # extract the JSON object
            data = json.loads(line)
            # the output is usually in a dictionary like:
            # {"step_index":..., "content": "...", "tool_calls": [...], "source": ...}
            # Or for a tool response: {"step_index": ..., "source": "SYSTEM", "type": "TOOL_RESPONSE", "content": "..."}
            # Let's inspect the `content` or `output` if it's a dict.
            # Usually tool responses are in a `response` field or similar.
            pass

# Let's do a pure regex on the raw file text, handling \r\n properly and making it resilient
with open(log_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The output might be JSON-escaped (e.g. \n instead of actual newline).
# So we need to parse the JSON lines first to get the unescaped strings!
for line in content.splitlines():
    try:
        data = json.loads(line)
        # Check if this step is a response to view_file
        # Sometimes it's inside `output` or `content`. We'll just dump all string values in the JSON object and search them.
        def find_strings(obj):
            if isinstance(obj, dict):
                for v in obj.values():
                    yield from find_strings(v)
            elif isinstance(obj, list):
                for v in obj:
                    yield from find_strings(v)
            elif isinstance(obj, str):
                yield obj

        for s in find_strings(data):
            if 'File Path: `file:///c:/Users/07oms/Downloads/portfolio-Aditya/src/' in s:
                # We found a string containing the view_file output!
                # Extract the file path
                m_path = re.search(r'File Path: `file:///c:/Users/07oms/Downloads/portfolio-Aditya/(src/[^`]*)`', s)
                if m_path:
                    file_path = m_path.group(1)
                    if file_path not in restored_contents:
                        clean_content = unescape_and_clean(s)
                        if clean_content.strip():
                            restored_contents[file_path] = clean_content
    except Exception:
        pass

for path, code in restored_contents.items():
    print(f"Restoring {path}...")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(code)
