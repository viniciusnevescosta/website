---
title: Obsidian with Syncthing and Gitwatch workflow
description: Open-source sync and backup for Obsidian.
date: Dec 30 2023
---

If you are looking for a way to keep your notes synchronized across all your devices while maintaining a bulletproof, automated backup history—without relying on proprietary clouds—this guide is for you.

We are going to combine three powerful tools: Obsidian, Syncthing, and Gitwatch.

_**Note:** This guide assumes you are running a Linux distribution (I was using Fedora when I originally designed this workflow). While the concepts apply to any OS, the specific commands below are tailored for the Linux terminal._

Why This Stack?
Before we start typing commands, let's look at the tools.

- Obsidian: A powerful, extensible knowledge base that works on top of a local folder of plain text Markdown files.

- Syncthing: A continuous file synchronization program. It replaces proprietary sync and cloud services with something open, trustworthy, and decentralized.

- Gitwatch: A script that watches a folder for changes and automatically commits them to a Git repository. This is our safety net.

## Part 1: Installation
Let's get our tools ready.

### 1. Obsidian
You can grab Obsidian from your distro's software manager (like GNOME Software) or download the AppImage/Flatpak directly from the [official website](https://obsidian.md/download).

### 2. Syncthing
We need Syncthing on every device you want to keep in sync (your laptop, desktop, phone, etc.). On Fedora, install it via dnf:

```bash
sudo dnf install syncthing
```

### 3. Gitwatch
Gitwatch relies on git and inotify-tools. Let's install dependencies and set up the script:

```bash
# Install dependencies
sudo dnf install git inotify-tools

# Clone the repository
git clone https://github.com/gitwatch/gitwatch.git

# Install the script globally
cd gitwatch
sudo install -b gitwatch.sh /usr/local/bin/gitwatch
```

## Part 2: Configuration

### 1. Setting up Obsidian
First, create a dedicated home for your notes. I recommend a structure like ```./documents/obsidian```. Inside that, create a subfolder specifically for the vault you want to sync, for example, ```./documents/obsidian/sync```.

### 2. Configuring Syncthing
Now, let's connect your devices.

Start Syncthing: Run syncthing in your terminal. It should automatically open the web GUI at http://127.0.0.1:8384.

Connect Devices: Click **"Add Remote Device"** and exchange Device IDs between your computers and phone.

Sync the Folder: Click **"Add Folder".** Give it a label (e.g., "Obsidian Vault") and point it to your path: /home/youruser/documents/obsidian/sync.

Share: Check the devices you want to share this folder with. Once you accept the prompt on your other devices, your files will sync peer-to-peer. Magic!

The Catch: Syncthing is amazing at syncing, but it also syncs mistakes. If you accidentally delete a file on your phone, it disappears from your computer instantly. As the Syncthing [FAQ](https://medium.com/r/?url=https%3A%2F%2Fdocs.syncthing.net%2Fusers%2Ffaq.html%23is-syncthing-my-ideal-backup-application) states: 

> Syncthing is not a great backup application… use other tools to keep your data safe from your (or our) mistakes.

This is where Git comes in to save the day.

### 3. Setting up Gitwatch
We will use Git to create a versioned history of your notes. Even if you delete everything, you can roll back time.

Initialize the Repo: Navigate to your vault and start git:

```bash
cd /home/youruser/documents/obsidian/sync
git init
```

_**Tip:** I recommend setting up an SSH key for GitHub, GitLab, etc. So you don't have to enter passwords. You can check out this [gist](https://gist.github.com/rahularity/86da20fe3858e6b311de068201d279e3) for a quick SSH how-to._

This command tells Gitwatch to watch the folder and push changes to your remote repository automatically.

```bash
cd /
gitwatch -s [seconds] -r [remote repo] -b main [folder path, e.g., /home/user/documents/obsidian/sync]
```

## Part 3: Automating Everything
We don't want to run these commands manually every time we boot up. Let's use systemd to make them run silently in the background.

First, create the user systemd directory:

```bash
mkdir -p "$HOME/.config/systemd/user"
cd "$HOME/.config/systemd/user"
```

### 1. Automating Syncthing
Create a file named ```syncthing@.service``` and paste this configuration:

```toml
[Unit]
Description=Syncthing - Open Source Continuous File Synchronization for %I
Documentation=man:syncthing(1)
After=network.target
StartLimitIntervalSec=60
StartLimitBurst=4

[Service]
User=%i
ExecStart=/usr/bin/syncthing serve --no-browser --no-restart --logflags=0
Restart=on-failure
RestartSec=1
SuccessExitStatus=3 4
RestartForceExitStatus=3 4

# Hardening
ProtectSystem=full
PrivateTmp=true
SystemCallArchitectures=native
MemoryDenyWriteExecute=true
NoNewPrivileges=true

# Elevated permissions to sync ownership (disabled by default),
# see https://docs.syncthing.net/advanced/folder-sync-ownership
#AmbientCapabilities=CAP_CHOWN CAP_FOWNER

[Install]
WantedBy=multi-user.targetcd /
mkdir -p "$HOME/.config/systemd/user && cd $HOME/.config/systemd/user"
```

Start the service, replace 'myuser' with your system username:

```bash
systemctl enable syncthing@myuser.service
systemctl start syncthing@myuser.service
```

### 2. Automating Gitwatch
Create a file named ```gitwatch@.service``` in the same directory:

```toml
[Unit]
Description=Watch file or directory and git commit all changes. run with: systemctl --user --now enable gitwatch@$(systemd-escape "'-r url/to/repository' /path/to/folder").service

[Service]
Environment="SCRIPT_ARGS=%I"
ExecStart=/usr/local/bin/gitwatch -s [seconds until committing] -r [remote repo link] -b main [folder path, ex: /home/user/Documents/obsidian/Sync]

[Install]
WantedBy=default.target
```

Start the service:

```bash
systemctl --user --now enable gitwatch@$(systemd-escape "'-r url/to/repository' /path/to/folder").service
```

## Conclusion
And there you have it. You now have a note-taking system that allows you to write on any device, syncs instantly via Syncthing, and creates an immutable backup history in the cloud via Gitwatch.

It’s private, it’s robust, and best of all—it’s yours.
