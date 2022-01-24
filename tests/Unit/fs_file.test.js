const {
    File_System
} = require('../../'),
    os = require('os'),
    path = require('path');

describe('File System Testing 🧪', () => {
    it("Should reveal the platform", () => {
        expect(File_System.platform).toBe(os.platform());
    })

    it("Should create a new file with content", () => {
        File_System.write_file('./test.txt', 'Hello World');
        expect(File_System.is_file('./test.txt')).toBe(true);
    })

    it("Should reveal extension and file name", () => {
        expect(File_System.file_ext('./test.txt')).toBe('.txt');
        expect(File_System.file_name('./test.txt')).toBe('test');
        expect(File_System.file_name_with_ext('./test.txt')).toBe('test.txt');
    })

    it("Should reveal file size", () => {
        expect(File_System.file_size('./test.txt')).toBe(11);
    })

    it("Should reveal file stats", () => {
        expect(File_System.file_stats('./test.txt').size).toBe(11);
    })

    it("Should append in file", () => {
        File_System.append_file('./test.txt', '\nHello World');
        expect(File_System.read_file('./test.txt')).toBe('Hello World\nHello World');
    })

    it("Should update file content", () => {
        File_System.update_file('./test.txt', 'Hello World');
        expect(File_System.read_file('./test.txt')).toBe('Hello World');
    })

    it("Should rename file", () => {
        File_System.rename_file('./test.txt', 'test2.txt');
        expect(File_System.is_file('./test2.txt')).toBe(true);
        expect(File_System.file_exists('./test2.txt')).toBe(true);
    })

    it("Should copy file", () => {
        File_System.copy_file('./test2.txt', './test3.txt');
        expect(File_System.is_file('./test3.txt')).toBe(true);
        expect(File_System.file_exists('./test3.txt')).toBe(true);
    })

    it("Should move file", () => {
        File_System.move_file('./test3.txt', './tests/test4.txt');
        expect(File_System.is_file('./tests/test4.txt')).toBe(true);
        expect(File_System.file_exists('./tests/test4.txt')).toBe(true);
    })

    it("Should delete file", () => {
        File_System.delete_file('./tests/test4.txt');
        expect(File_System.file_exists('./tests/test4.txt')).toBe(false);
        File_System.delete_file('./test2.txt');
        expect(File_System.file_exists('./test2.txt')).toBe(false);
    })
})