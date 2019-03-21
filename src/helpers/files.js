import fs from 'fs'
import path from 'path'

export const getCWD = process.cwd;

export const getBase = () => {
    return path.basename(process.cwd());
};

export const rmFileIfExists = (filePath) => {
    if(fileExists(filePath)) {
        fs.unlinkSync(filePath);
    }
}

export const fileExists = (filePath) => {
    return fs.existsSync(filePath)
};

export const dirExists = (dirPath) => {
    try {
        return fs.statSync(dirPath).isDirectory();
    } catch (err) {
        return false;
    }
};

export const mkDirIfNotExists = (dirName, options) => {
    if(!dirExists(dirName)) {
        fs.mkdirSync(dirName, options)
    }
};