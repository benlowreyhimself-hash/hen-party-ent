#!/usr/bin/env python3
import ftplib
import sys

host = "ftp.benlowrey.com"
username = "benlowre"
port = 21

# Try to connect (will prompt for password if needed)
try:
    print(f"Connecting to {host}...")
    ftp = ftplib.FTP()
    ftp.connect(host, port)
    print("Connected! Attempting login...")
    # If no password provided, this will fail and we'll ask
    if len(sys.argv) > 1:
        password = sys.argv[1]
        ftp.login(username, password)
    else:
        print("Password required. Please provide as argument or we'll try anonymous.")
        ftp.login(username)  # This will prompt or fail
except ftplib.error_perm as e:
    if "password" in str(e).lower() or "530" in str(e):
        print("Password required for authentication.")
        sys.exit(1)
    else:
        print(f"Error: {e}")
        sys.exit(1)
except Exception as e:
    print(f"Connection error: {e}")
    sys.exit(1)

try:
    print("\nCurrent directory:")
    print(ftp.pwd())
    
    print("\nListing root directory:")
    files = []
    ftp.retrlines('LIST', files.append)
    for item in files[:20]:  # Show first 20 items
        print(item)
    
    print(f"\nTotal items in root: {len(files)}")
    ftp.quit()
    print("\n✓ Connection successful!")
except Exception as e:
    print(f"Error: {e}")
    ftp.quit()

