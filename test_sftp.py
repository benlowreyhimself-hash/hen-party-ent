#!/usr/bin/env python3
import paramiko
import sys
import os

host = "ftp.benlowrey.com"
username = "benlowre"
port = 722

# Check if paramiko is available
try:
    import paramiko
except ImportError:
    print("paramiko not installed. Installing...")
    os.system("pip3 install paramiko")
    import paramiko

print(f"Connecting to {host}:{port} via SFTP...")

# Try to connect
try:
    transport = paramiko.Transport((host, port))
    
    # If password provided as argument
    if len(sys.argv) > 1:
        password = sys.argv[1]
        transport.connect(username=username, password=password)
    else:
        print("Password required. Please provide as argument.")
        print("Usage: python3 test_sftp.py <password>")
        sys.exit(1)
    
    sftp = paramiko.SFTPClient.from_transport(transport)
    
    print("\n✓ Connected successfully!")
    print(f"Current directory: {sftp.getcwd()}")
    
    print("\nListing root directory:")
    files = sftp.listdir('.')
    for item in files[:20]:  # Show first 20 items
        print(f"  - {item}")
    
    print(f"\nTotal items: {len(files)}")
    
    sftp.close()
    transport.close()
    print("\n✓ Connection test successful!")
    
except paramiko.AuthenticationException:
    print("✗ Authentication failed. Please check your password.")
    sys.exit(1)
except Exception as e:
    print(f"✗ Error: {e}")
    sys.exit(1)

