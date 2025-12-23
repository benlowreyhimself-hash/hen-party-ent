#!/usr/bin/env python3
"""
Script to download WordPress files via SFTP
"""
import paramiko
import os
import sys
from pathlib import Path

# Configuration
HOST = "ftp.benlowrey.com"
PORT = 722
USERNAME = "benlowre"
LOCAL_BACKUP_DIR = "/Users/benlowrey/Documents/app_builds/hen-party-ent/old-wordpress-backup"

def download_directory(sftp, remote_dir, local_dir):
    """Recursively download a directory via SFTP"""
    try:
        # Create local directory
        os.makedirs(local_dir, exist_ok=True)
        
        # List remote directory
        items = sftp.listdir_attr(remote_dir)
        
        for item in items:
            remote_path = f"{remote_dir}/{item.filename}" if remote_dir != '.' else item.filename
            local_path = os.path.join(local_dir, item.filename)
            
            if item.st_mode & 0o040000:  # Directory
                print(f"  Downloading directory: {remote_path}")
                download_directory(sftp, remote_path, local_path)
            else:  # File
                print(f"  Downloading file: {remote_path}")
                sftp.get(remote_path, local_path)
        
        return True
    except Exception as e:
        print(f"Error downloading {remote_dir}: {e}")
        return False

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 download_wordpress.py <password> <remote_directory>")
        print("Example: python3 download_wordpress.py mypassword public_html")
        sys.exit(1)
    
    password = sys.argv[1]
    remote_directory = sys.argv[2]
    
    print(f"Connecting to {HOST}:{PORT} via SFTP...")
    
    try:
        transport = paramiko.Transport((HOST, PORT))
        transport.connect(username=USERNAME, password=password)
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        print("✓ Connected successfully!")
        print(f"Current directory: {sftp.getcwd()}")
        
        # List root to show available directories
        print("\nAvailable directories in root:")
        try:
            root_items = sftp.listdir('.')
            for item in root_items[:20]:
                print(f"  - {item}")
        except:
            pass
        
        # Change to target directory
        print(f"\nNavigating to: {remote_directory}")
        try:
            sftp.chdir(remote_directory)
            print(f"Current directory: {sftp.getcwd()}")
        except Exception as e:
            print(f"Error: Could not access directory '{remote_directory}': {e}")
            print("\nAvailable directories:")
            for item in sftp.listdir('.'):
                print(f"  - {item}")
            sftp.close()
            transport.close()
            sys.exit(1)
        
        # Create local backup directory
        local_target = os.path.join(LOCAL_BACKUP_DIR, remote_directory.replace('/', '_'))
        os.makedirs(local_target, exist_ok=True)
        
        print(f"\nStarting download to: {local_target}")
        print("This may take a while depending on file size...\n")
        
        # Download everything
        download_directory(sftp, '.', local_target)
        
        sftp.close()
        transport.close()
        
        print(f"\n✓ Download complete!")
        print(f"Files saved to: {local_target}")
        
    except paramiko.AuthenticationException:
        print("✗ Authentication failed. Please check your password.")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()

