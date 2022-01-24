const {
    File_System
} = require('../../'),
    os = require('os'),
    path = require('path');

describe('File System Testing 🧪', () => {
    it('Should reveal the platform', () => {
        expect(File_System.platform).toBe(os.platform());
    })

    it("Should determine whether it's directory of not", () => {
        expect(File_System.is_dir('./')).toBe(true);
        expect(File_System.is_dir('./package.json')).toBe(false);
    })

    it("Should return directory path", () => {
        expect(File_System.dir_path('./')).toBe('.');
        expect(File_System.dir_path('./package.json')).toBe('.');
    })

    it("Should return directory name", () => {
        expect(File_System.dir_name(File_System.path_resolve('./'))).toBe('SniperCode.FileSystem');
        expect(File_System.dir_name(File_System.path_resolve('./src'))).toBe('src');
    })

    it("Should return directory exists", () => {
        expect(File_System.dir_exists('./')).toBe(true);
        expect(File_System.dir_exists('./src/package.json')).toBe(false);
    })

    it("Should resolve path", () => {
        expect(File_System.path_resolve('./')).toBe(path.resolve('./'));
        expect(File_System.path_resolve('./src', './package.json')).toBe(path.resolve('./src/package.json'));
    })

    it("Should search the file and dirs", () => {
        expect(File_System.path_resolve(File_System.search_dir('./', 'package.json').base_path)).toEqual(File_System.path_resolve('./'));
    })

    describe("📂 Directory List", () => {

        it("Should return list of dir items", () => {
            const scan_dir = File_System.scan_dir('./');
            expect(scan_dir.includes('package.json')).toBe(true);
            expect(scan_dir.includes('src')).toBe(true);
            expect(scan_dir.includes('tests')).toBe(true);
        })

        it("Should return object of dir items in defined depth recursively", () => {
            const scan_dir__recursively_depth = File_System.scan_dir_recursive_depth('./', 3);
            expect(scan_dir__recursively_depth['SniperCode.FileSystem'].dir_name).toBe('SniperCode.FileSystem');
            expect(scan_dir__recursively_depth.file.includes(".gitignore")).toBe(true);
        })

        it("Should return list of dir items recursively", () => {
            const scan_dir_recursive = File_System.scan_dir_recursive('./');
            expect(scan_dir_recursive.includes('index.js')).toBe(true);
            expect(scan_dir_recursive.includes('README.md')).toBe(true);
            expect(scan_dir_recursive.includes('package.json')).toBe(true);
        })

    })

    describe("📁 Directory Create, Rename, Copy, Move, Delete", () => {
        it("Should create directory", () => {
            File_System.mkdir('./test_dir');
            expect(File_System.dir_exists(path.resolve('./test_dir'))).toBe(true);
        })

        it("Should rename directory", () => {
            File_System.rename_dir('./test_dir', './test_dir_renamed');
            expect(File_System.dir_exists(path.resolve('./test_dir_renamed'))).toBe(true);
        })

        it("Should copy directory", () => {
            File_System.copy_dir('./test_dir_renamed', './test_dir_renamed_copy');
            expect(File_System.dir_exists(path.resolve('./test_dir_renamed_copy'))).toBe(true);
            File_System.copy_file('README.md', './test_dir_renamed_copy/README.md');
        })

        it("Should move directory", () => {
            File_System.move_dir('./test_dir_renamed_copy', './test_dir_renamed');
            expect(File_System.dir_exists(path.resolve('./test_dir_renamed/test_dir_renamed_copy'))).toBe(true);
        })

        it("Should delete directory", () => {
            File_System.delete_dir('./test_dir_renamed');
            expect(File_System.dir_exists(path.resolve('./test_dir_renamed'))).toBe(false);
        })
    })
});