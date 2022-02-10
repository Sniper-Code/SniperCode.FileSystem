# **SniperCode.FileSystem**

[![Automated Test File System](https://github.com/Sniper-Code/SniperCode.FileSystem/actions/workflows/node.automated.test.yml/badge.svg?branch=main)](https://github.com/Sniper-Code/SniperCode.FileSystem/actions/workflows/node.automated.test.yml)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Sniper-Code/SniperCode.FileSystem)
![GitHub last commit](https://img.shields.io/github/last-commit/Sniper-Code/SniperCode.FileSystem) 
![GitHub](https://img.shields.io/github/license/Sniper-Code/SniperCode.FileSystem)![GitHub top language](https://img.shields.io/github/languages/top/Sniper-Code/SniperCode.FileSystem)
![npm](https://img.shields.io/npm/v/snipercode.filesystem)

## **Table of Contents**

- [**SniperCode.FileSystem**](#snipercodefilesystem)
  - [**Table of Contents**](#table-of-contents)
  - [**Introduction**](#introduction)
  - [**Installation**](#installation)
  - [**Uninstall**](#uninstall)
  - [**Exposed API**](#exposed-api)
    - [**File**](#file)
  - [**Release**](#release)

## **Introduction**

SniperCode.FileSystem is a file system library for JavaScript providing a simple and easy to use file system API based on [Node.js](https://nodejs.org/en/). It is designed to be used in a Node.js environment and a core part of the JCore Framework.

## **Installation**

To install SniperCode.FileSystem, run the following command:

```bash
    npm install snipercode.filesystem
```

## **Uninstall**

To uninstall SniperCode.FileSystem, run `npm uninstall snipercode.filesystem`.

## **Exposed API**

All the exposed API is documented below.

### **File**

This API is used to access file system and self explanatory endpoints. Example:

```Node.js
    const {
        File_System
    } = require('SniperCode.FileSystem');

    // All the exposed endpoints are static methods of File_System class so you can access them directly.

    // Example:
        console.log(File_System.scan_dir('./))
    // Prints the list of files and directories in the current directory.
```

All the endpoints are listed below.

1. File_System.path_resolve
1. File_System.is_file
1. File_System.file_path
1. File_System.file_ext
1. File_System.file_name
1. File_System.file_name_with_ext
1. File_System.file_size
1. File_System.file_exists
1. File_System.file_stats
1. File_System.read_file
1. File_System.write_file
1. File_System.update_file
1. File_System.append_file
1. File_System.delete_file
1. File_System.rename_file
1. File_System.copy_file
1. File_System.move_file
1. File_System.is_dir
1. File_System.dir_path
1. File_System.dir_name
1. File_System.dir_exists
1. File_System.scan_dir
1. File_System.search_dir
1. File_System.scan_dir_recursive_depth
1. File_System.scan_dir_recursive
1. File_System.mkdir
1. File_System.rename_dir
1. File_System.copy_dir
1. File_System.delete_dir

## **Release**

Visit [GitHub Release](https://github.com/Sniper-Code/SniperCode.FileSystem/releases) to see the latest release.
