const multer = require("multer");
const fs = require('fs');
const path = require('path');

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10mb

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "image/png",
    "image/jpg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {licenseId} = req.params;

        const uploadPath = path.join(
            process.cwd(),
            "uploads",
            "licenses",
            licenseId
        );

        fs.mkdir(uploadPath, {
            recursive: true
        });
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
        return cb(new Error("Unsupported file type"), false);
    }
    cb(null, true);
}

const upload = multer({
    storage, 
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

module.exports = upload