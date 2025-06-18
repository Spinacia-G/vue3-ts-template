# Generate subsets of fonts to optimize file sizes

# pip install fonttools

import os

cur_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
source_path = cur_path + '\\src\\assets\\font\\source\\fontName.ttf'
output_path = cur_path + '\\src\\assets\\font\\fontName.ttf'

def merge_array(arr):
    merged = ''.join(arr)
    return ''.join(dict.fromkeys(merged))

arr = [
    'test'
]

subset_str = merge_array(arr)

command = f"fonttools subset --text='{subset_str}' --output-file={output_path} {source_path}"
os.system(command)
