#!/usr/bin/env python3
"""
Script to download WordPress files via cPanel API
"""
import requests
import json
import os
import sys
from pathlib import Path
from urllib.parse import quote

# Configuration
CPANEL_HOST = "pikkon-lon.krystal.uk"  # From the URL you provided
CPANEL_PORT = 2083
CPANEL_USER = "benlowre"  # Your username
API_TOKEN = "LVKH005D0R6WT7OGINVHDYAZ1C4RKUE3"
LOCAL_BACKUP_DIR = "/Users/benlowrey/Documents/app_builds/hen-party-ent/old-wordpress-backup"

# Disable SSL warnings for self-signed certificates
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def cpanel_api_call(endpoint, params=None, use_uapi=True):
    """Make a cPanel API call"""
    if use_uapi:
        url = f"https://{CPANEL_HOST}:{CPANEL_PORT}/execute/{endpoint}"
    else:
        url = f"https://{CPANEL_HOST}:{CPANEL_PORT}/api2/{endpoint}"
    
    headers = {
        "Authorization": f"cpanel {CPANEL_USER}:{API_TOKEN}"
    }
    
    try:
        response = requests.get(url, headers=headers, params=params, verify=False, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        if hasattr(e, 'response') and e.response:
            print(f"Response: {e.response.text[:500]}")
        return None

def list_files(directory="/"):
    """List files in a directory using UAPI"""
    params = {
        "dir": directory
    }
    # Try UAPI first
    result = cpanel_api_call("Fileman/list_files", params, use_uapi=True)
    if not result or result.get('errors'):
        # Try API2 as fallback
        print("Trying API2 format...")
        result = cpanel_api_call("Fileman/list_files", params, use_uapi=False)
    return result

def download_file(remote_path, local_path):
    """Download a single file"""
    params = {
        "file": remote_path
    }
    url = f"https://{CPANEL_HOST}:{CPANEL_PORT}/execute/FileManager/download_file"
    headers = {
        "Authorization": f"cpanel {CPANEL_USER}:{API_TOKEN}"
    }
    
    try:
        response = requests.get(url, headers=headers, params=params, verify=False, timeout=60, stream=True)
        response.raise_for_status()
        
        # Create local directory if needed
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        
        # Write file
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"Error downloading {remote_path}: {e}")
        return False

def download_directory_recursive(remote_dir, local_dir, max_depth=10, current_depth=0):
    """Recursively download a directory"""
    if current_depth > max_depth:
        print(f"Max depth reached for {remote_dir}")
        return
    
    print(f"{'  ' * current_depth}Exploring: {remote_dir}")
    
    # List files in directory
    files_result = list_files(remote_dir)
    
    if not files_result or 'data' not in files_result:
        print(f"{'  ' * current_depth}  No files found or error")
        return
    
    files = files_result.get('data', [])
    
    for file_info in files:
        # Try different field names for the file/directory name
        file_name = file_info.get('file') or file_info.get('name') or file_info.get('filename') or ''
        file_type = file_info.get('type', '')
        file_path = file_info.get('fullpath') or file_info.get('path', '')
        
        if not file_name or file_name in ['.', '..']:
            continue
        
        remote_path = file_path if file_path else f"{remote_dir}/{file_name}".replace('//', '/')
        local_path = os.path.join(local_dir, file_name)
        
        if file_type == 'dir' or file_info.get('is_dir'):
            # It's a directory, recurse
            print(f"{'  ' * current_depth}  Directory: {file_name}")
            download_directory_recursive(remote_path, local_path, max_depth, current_depth + 1)
        else:
            # It's a file, download it
            print(f"{'  ' * current_depth}  File: {file_name} ({file_info.get('size', 0)} bytes)")
            download_file(remote_path, local_path)

def main():
    if len(sys.argv) > 1:
        target_directory = sys.argv[1]
    else:
        target_directory = "/"
    
    print(f"Connecting to cPanel API at {CPANEL_HOST}:{CPANEL_PORT}...")
    print(f"Username: {CPANEL_USER}")
    print()
    
    # Test connection by listing root
    print("Listing root directory to find WordPress site...")
    result = list_files("/")
    
    if not result:
        print("✗ Failed to connect to cPanel API")
        print("Please check:")
        print("  1. API token is correct")
        print("  2. Hostname is correct")
        print("  3. Port 2083 is accessible")
        sys.exit(1)
    
    print("✓ Connected successfully!")
    print()
    
    # Show available directories
    print("API Response structure:")
    print(json.dumps(result, indent=2)[:500])
    print()
    
    if result and 'data' in result and result['data']:
        print("Available directories/files in root:")
        files_list = result['data'] if isinstance(result['data'], list) else []
        for item in files_list[:30]:
            if isinstance(item, dict):
                # Try different field names for the file/directory name
                file_name = item.get('file') or item.get('name') or item.get('filename') or 'unknown'
                item_type = "📁 Directory" if item.get('type') == 'dir' or item.get('is_dir') else "📄 File"
                size = item.get('humansize') or item.get('size', '')
                print(f"  {item_type}: {file_name} {size}")
            else:
                print(f"  Item: {item}")
        print()
    elif result:
        print("Response received but format may be different. Full response:")
        print(json.dumps(result, indent=2))
        print()
    
    # If target directory specified, download it
    if target_directory != "/":
        print(f"Downloading directory: {target_directory}")
        local_target = os.path.join(LOCAL_BACKUP_DIR, target_directory.replace('/', '_').strip('_'))
        os.makedirs(local_target, exist_ok=True)
        
        download_directory_recursive(target_directory, local_target)
        
        print(f"\n✓ Download complete!")
        print(f"Files saved to: {local_target}")
    else:
        print("\nPlease specify which directory to download:")
        print("Usage: python3 download_via_cpanel.py <directory>")
        print("Example: python3 download_via_cpanel.py public_html")
        print("Example: python3 download_via_cpanel.py /home/benlowre/public_html")

if __name__ == "__main__":
    main()

