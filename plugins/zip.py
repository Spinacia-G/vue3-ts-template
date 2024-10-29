# 压缩/dist目录，保存到/release目录下，同时复制.zip文件到剪贴板
import os
import sys
import win32clipboard
from ctypes import *
import zipfile
import datetime

class DROPFILES(Structure):
    _fields_ = [
        ("pFiles", c_uint),
        ("x", c_long),
        ("y", c_long),
        ("fNC", c_int),
        ("fWide", c_bool),
    ]

pDropFiles = DROPFILES()
pDropFiles.pFiles = sizeof(DROPFILES)
pDropFiles.fWide = True
matedata = bytes(pDropFiles)

def set_clipboard_files(paths):
    files = ("\0".join(paths)).replace("/", "\\")
    data = files.encode("U16")[2:]+b"\0\0"
    win32clipboard.OpenClipboard()
    try:
        win32clipboard.EmptyClipboard()
        win32clipboard.SetClipboardData(
            win32clipboard.CF_HDROP, matedata+data)
    finally:
        win32clipboard.CloseClipboard()

# 复制指定文件到剪切板
def set_clipboard_file(file):
    set_clipboard_files([file])

# 读取剪切板中的文件路径
def read_clipboard_file_paths():
    win32clipboard.OpenClipboard()
    paths = None
    try:
        return win32clipboard.GetClipboardData(win32clipboard.CF_HDROP)
    finally:
        win32clipboard.CloseClipboard()

# 压缩文件夹并将结果复制到剪切板
def zip_folder_and_copy(more_info):
    test_path = ''
    output_name = ''
    # 获取当前日期
    today = datetime.datetime.now().strftime('%y%m%d')
    time = datetime.datetime.now().strftime('%H%M')

    if more_info == '':
        suffix = today + time + '.zip'
    else:
        suffix = today + time + '_' + more_info + '.zip'

    # 当前项目的路径
    cur_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    # dist路径
    dist_path = cur_path + '\\dist'
    # 输出路径
    release_path = cur_path + '\\release\\prod_' + suffix

    # 压缩文件夹
    zip = zipfile.ZipFile(release_path, 'w', zipfile.ZIP_DEFLATED)
    for path, dir_names, filenames in os.walk(dist_path):
        if 'ignore-string' in path:
            continue

        fpath = path.replace(dist_path, '')
        for filename in filenames:
            zip.write(os.path.join(path, filename), os.path.join(fpath, filename))
    zip.close()

    # 将压缩得到的zip文件复制到剪切板
    set_clipboard_file(release_path)

info = ''
if len(sys.argv) > 1:
    info = sys.argv[1]
zip_folder_and_copy(info)

