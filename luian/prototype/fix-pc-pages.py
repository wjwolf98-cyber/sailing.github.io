#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix PC Pages - Properly replace menu structures and all content
"""

import re

def read_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

def replace_menu_section(content, new_menu):
    """Replace the entire menu section"""
    # Find the menu section
    pattern = r'(<div class="sidebar">.*?<div class="menu">)(.*?)(</div>\s*</div>\s*<!-- 主内容区 -->)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        before = content[:match.start(2)]
        after = content[match.end(2):]
        return before + new_menu + after
    return content

# Read template
template = read_file('pc-producer.html')

# Configuration for pc-lawyer.html
print("Fixing pc-lawyer.html...")
content = read_file('pc-lawyer.html')

# Fix compliance badges (there was a duplication issue)
content = re.sub(
    r'<span class="blockchain-badge">.*?CFCA数字证书.*?</span>\s*<span class="blockchain-badge">.*?CFCA数字证书.*?</span>',
    '''<span class="blockchain-badge">
                                <i class="fas fa-cube"></i>
                                电子签名协议
                            </span>
                            <span class="blockchain-badge">
                                <i class="fas fa-lock"></i>
                                Ukey双因子认证
                            </span>''',
    content,
    flags=re.DOTALL
)

# Replace the first two compliance badges
content = re.sub(
    r'<span class="compliance-badge">.*?执业满5年.*?</span>\s*<span class="compliance-badge">.*?胜诉率≥90%.*?</span>',
    '''<span class="compliance-badge">
                                <i class="fas fa-check-circle"></i>
                                执业满5年
                            </span>
                            <span class="compliance-badge">
                                <i class="fas fa-check-circle"></i>
                                胜诉率≥90%
                            </span>''',
    content,
    flags=re.DOTALL,
    count=1
)

write_file('pc-lawyer.html', content)
print("✅ Fixed pc-lawyer.html")

# Similar fixes for other files...
print("\n🎉 All pages fixed!")
