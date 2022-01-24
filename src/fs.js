/**
 * @class File_System
 * @description File System class for the system.
 */
module.exports = class File_System {
    /**
     * Node Js fs module
     * @static
     * @memberof File_System
     */
    static fs = require('fs');
    /**
     * Node Js fs module file type constants.
     * @static
     * @memberof File_System
     */
    static constants = this.fs.constants
    /**
     * Node Js Path module
     * @static
     * @memberof File_System
     */
    static path = require('path');
    /**
     * Node Js Os Module
     * @static
     * @memberof File_System
     */
    static os = require('os');
    /**
     * Reveals Platform of Host System
     * @static
     * @memberof File_System
     */
    static platform = this.os.platform();
    /**
     * Resolves Path to absolute path.
     * @memberof File_System
     * @param  {...any} paths 
     * @returns {string}
     */
    static path_resolve = (...paths) => this.path.resolve(...paths)
    //--------> File System Begins <--------//
    /**
     * Checks whether a file exists.
     * @memberof File_System
     * @param {string} filePath 
     * @returns {boolean}
     */
    static is_file = (filePath) => this.fs.lstatSync(filePath).isFile()
    /**
     * Reveals file path.
     * @memberof File_System
     * @param {string} filePath 
     * @returns {string}
     */
    static file_path = (filePath) => this.path.basename(filePath)
    /**
     * Reveals file extension.
     * @param {string} filePath 
     * @returns {string}
     */
    static file_ext = (filePath) => this.path.extname(filePath)
    /**
     * Reveals file name.
     * @param {string} filePath 
     * @returns {string}
     */
    static file_name = (filePath) => this.path.basename(filePath, this.file_ext(filePath))
    /**
     * Reveals file name with extension.
     * @param {string} filePath 
     * @returns {string}
     */
    static file_name_with_ext = (filePath) => this.path.basename(filePath)
    /**
     * Reveals file size in kb.
     * @param {string} filePath 
     * @returns {number}
     */
    static file_size = (filePath) => this.fs.statSync(filePath).size
    /**
     * Reveals if file exists
     * @param {string} filePath 
     * @returns {boolean}
     */
    static file_exists = (filePath) => this.fs.existsSync(filePath)
    /**
     * Reveals file stats
     * @param {string} filePath 
     * @returns {Stats}
     */
    static file_stats = (filePath) => this.fs.statSync(filePath)
    /**
     * Reads file content.
     * @param {string} filePath 
     * @returns {string}
     */
    static read_file = (filePath) => this.fs.readFileSync(filePath, 'utf8')
    /**
     * Writes file content.
     * @param {string} filePath 
     * @param {any} data 
     */
    static write_file = (filePath, data) => this.fs.writeFileSync(filePath, data)
    /**
     * Appends data to file.
     * @param {string} filePath 
     * @param {any} data 
     */
    static append_file = (filePath, data) => this.fs.appendFileSync(filePath, data)
    /**
     * Updates file content.
     * @param {string} filePath 
     * @param {any} data 
     */
    static update_file = (filePath, data) => this.fs.writeFileSync(filePath, data)
    /**
     * Deletes file.
     * @param {string} filePath 
     */
    static delete_file = (filePath) => this.fs.rmSync(filePath)
    /**
     * Renames old file to new file.
     * @param {string} filePath 
     * @param {string} newName 
     */
    static rename_file = (filePath, newName) => this.fs.renameSync(filePath, this.path.join(this.dir_path(filePath), newName))
    /**
     * Copies file to new location.
     * @param {string} srcPath 
     * @param {string} destPath 
     */
    static copy_file = (srcPath, destPath) => {
        srcPath = this.path_resolve(srcPath);
        destPath = this.path_resolve(destPath);
        if (this.is_file(srcPath)) {
            if (!this.dir_exists(destPath)) {
                this.mkdir(this.dir_path(destPath));
            }
            this.fs.copyFileSync(srcPath, destPath, this.constants.COPYFILE_FICLONE);
        }
    }
    /**
     * Moves one file to another location.
     * @param {string} srcPath 
     * @param {string} destPath 
     */
    static move_file = (srcPath, destPath) => {
        if (this.is_file(srcPath)) {
            this.copy_file(srcPath, destPath);
            this.delete_file(srcPath);
        }
    }
    //----> Directory Begins <----//
    /**
     * Reveals if its directory.
     * @param {string} dirPath 
     * @returns {boolean}
     */
    static is_dir = (dirPath) => this.fs.lstatSync(dirPath).isDirectory()
    /**
     * Reveals directory path.
     * @param {string} dirPath 
     * @returns {string}
     */
    static dir_path = (dirPath) => this.path.dirname(dirPath)
    /**
     * Reveals directory name.
     * @param {string} dirPath 
     * @returns {string}
     */
    static dir_name = (dirPath) => this.path.basename(dirPath)
    /**
     * Checks if directory exists.
     * @param {string} dirPath 
     * @returns {boolean}
     */
    static dir_exists = (dirPath) => this.fs.existsSync(dirPath)
    /**
     * All files in directory.
     * @param {string} dirPath 
     * @returns {string[]}
     */
    static scan_dir = (dirPath) => this.fs.readdirSync(dirPath)
    /**
     * Lists all the details of files in directory till level of depth.
     * @param {string} dirPath 
     * @param {number} depth 
     * @returns {any}
     */
    static scan_dir_recursive_depth = (dirPath, depth = 2) => {
        try {
            let files = {};
            if (depth > 0) {
                const dir_files = this.scan_dir(dirPath);
                files[this.dir_name(this.path_resolve(dirPath))] = {
                    path: this.path_resolve(dirPath),
                    dir_name: this.dir_name(this.path_resolve(dirPath)),
                };
                for (let idx = 0; idx < dir_files.length; idx++) {
                    const
                        file = dir_files[idx],
                        file_path = this.path.join(dirPath, file);
                    // IF Is Directory
                    if (this.is_dir(file_path)) {
                        if (files['dir'] === undefined) {
                            files['dir'] = [];
                        }
                        files['dir'].push(this.scan_dir_recursive_depth(file_path, depth - 1))
                    }
                    else {
                        // Else Is File
                        if (this.is_file(file_path)) {
                            if (files['file'] === undefined) {
                                files['file'] = [];
                            }
                            files['file'].push(this.file_name_with_ext(file_path))
                        } else {
                            // Not dir nor file
                            if (!files[this.dir_name(file_path)]) {
                                if (files['other'] === undefined) {
                                    files['other'] = [];
                                }
                                files['other'].push(this.file_name_with_ext(file_path))
                            }
                        }
                    }
                }
            }
            return files;
        } catch (err) {
            return err;
        }
    }
    /**
     * Scans Directory and returns all the details of files in directory.
     * @param {string} dirPath 
     * @returns {any}
     */
    static scan_dir_recursive = (dirPath) => {
        let files = [];
        const dir = this.scan_dir(dirPath);
        for (let i = 0; i < dir.length; i++) {
            const filePath = dir[i];
            const file = this.path.join(dirPath, filePath);
            if (this.is_dir(file)) {
                files = files.concat(this.scan_dir_recursive(file));
            } else {
                if (this.is_file(file)) {
                    files.push(file);
                } else {
                    files.push(this.path_resolve(file));
                }
            }
        }
        return files;
    }
    static search_dir(dirPath, search_str) {
        let _scan = [];
        _scan = this.scan_dir_recursive(dirPath);
        const base_path = this.path_resolve(dirPath),
            filter = _scan.filter(file => {
                if (file.includes(search_str)) {
                    return file;
                }
            });
        return {
            base_path,
            result: filter
        };
    }
    /**
     * Makes directory.
     * @param {string} dirPath 
     */
    static mkdir = (dirPath) => this.fs.mkdirSync(dirPath, { recursive: true, mode: 0o777 })
    /**
     * Renames old directory to new directory.
     * @param {string} dirPath 
     * @param {string} newName 
     */
    static rename_dir = (dirPath, newName) => this.fs.renameSync(dirPath, this.path.join(this.dir_path(dirPath), newName))
    /**
     * Copies directory to new location.
     * @param {string} srcPath 
     * @param {string} destPath 
     */
    static copy_dir = (srcPath, destPath) => {
        const files = this.scan_dir(srcPath);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const filePath = this.path.join(srcPath, files[i]);
                const destFilePath = this.path.join(destPath, files[i]);
                if (this.is_dir(filePath)) {
                    this.mkdir(destFilePath);
                    this.copy_dir(filePath, destFilePath);
                } else {
                    this.copy_file(filePath, destFilePath);
                }
            }
        } else {
            this.mkdir(destPath);
        }
    }
    /**
     * Moves directory to new location.
     * @param {string} srcPath 
     * @param {string} destPath 
     */
    static move_dir = (srcPath, destPath) => {
        const files = this.scan_dir(srcPath);
        if (files.length >= 0) {
            for (let i = 0; i < files.length; i++) {
                const filePath = this.path.join(srcPath, files[i]);
                const destFilePath = this.path.join(destPath, srcPath, files[i]);
                if (!this.is_dir(filePath)) {
                    this.move_file(filePath, destFilePath);
                } else {
                    this.copy_dir(filePath, destFilePath);
                }
            }
            this.delete_dir(srcPath);
        } else {
            this.mkdir(destPath);
            this.delete_dir(srcPath);
        }
    }
    /**
     * Delete directory.
     * @param {string} dirPath 
     */
    static delete_dir = (dirPath, recursive = true, force = true) => this.fs.rmSync(dirPath, { recursive, force })
}
