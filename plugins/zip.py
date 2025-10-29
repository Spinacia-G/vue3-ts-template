# Compresses the /dist directory into a zip file saved in the /release directory
# and copies the resulting zip file to the clipboard on Windows.

# pip install pywin32

# python zip.py --prefix sample --suffix init --ignore Cesium,data

import os
import sys
import win32clipboard
from ctypes import *
import zipfile
import datetime
import argparse
import subprocess
import stat

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

def set_clipboard_file(file):
    set_clipboard_files([file])

def read_clipboard_file_paths():
    win32clipboard.OpenClipboard()
    paths = None
    try:
        return win32clipboard.GetClipboardData(win32clipboard.CF_HDROP)
    finally:
        win32clipboard.CloseClipboard()

def get_git_info(cur_path):
    try:
        git_user = subprocess.check_output(
            ['git', 'config', 'user.name'],
            cwd=cur_path, encoding='utf-8', errors='ignore'
        ).strip()
        git_email = subprocess.check_output(
            ['git', 'config', 'user.email'],
            cwd=cur_path, encoding='utf-8', errors='ignore'
        ).strip()
        author_info = f'Author: {git_user} <{git_email}>'
    except Exception as e:
        author_info = f'Author: Failed to get ({e})'
    return author_info

def write_package_log(package_log_path, now_str, author_info):
    with open(package_log_path, 'w', encoding='utf-8') as f:
        f.write(f'Package Time: {now_str}\n')
        f.write(f'{author_info}\n\n')

def make_zip(dist_path, release_path, ignore_dirs, cur_path):
    with zipfile.ZipFile(release_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for path, dir_names, filenames in os.walk(dist_path):
            dir_names[:] = [d for d in dir_names if d not in ignore_dirs]
            fpath = path.replace(dist_path, '')
            for filename in filenames:
                zipf.write(os.path.join(path, filename), os.path.join(fpath, filename))
        stats_path = os.path.join(cur_path, 'stats.html')
        if os.path.exists(stats_path):
            zipf.write(stats_path, 'stats.html')

def zip_folder_and_copy(file_name, more_info, ignore_dirs):
    now = datetime.datetime.now()
    today = now.strftime('%y%m%d')
    time = now.strftime('%H%M')
    now_str = now.strftime('%Y-%m-%d %H:%M:%S')
    suffix = today + time + (f'_{more_info}' if more_info else '') + '.zip'
    cur_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    dist_path = os.path.join(cur_path, 'dist')
    release_dir = os.path.join(cur_path, 'release')
    if not os.path.exists(release_dir):
        os.makedirs(release_dir)
    release_path = os.path.join(release_dir, f'{file_name}_{suffix}')
    package_log_path = os.path.join(dist_path, 'package.log')

    author_info = get_git_info(cur_path)
    write_package_log(package_log_path, now_str, author_info)
    make_zip(dist_path, release_path, ignore_dirs, cur_path)
    set_clipboard_file(release_path)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--prefix', type=str, default='prod', help='zip文件名前缀')
    parser.add_argument('--suffix', type=str, default='', help='zip文件名后缀')
    parser.add_argument('--ignore', type=str, default='', help='要忽略的文件夹名，多个用逗号分隔')
    args = parser.parse_args()
    ignore_dirs = [d for d in args.ignore.split(',') if d]
    zip_folder_and_copy(args.prefix, args.suffix, ignore_dirs)
