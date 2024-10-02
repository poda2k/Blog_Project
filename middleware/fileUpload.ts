import multer, { FileFilterCallback } from 'multer';
import express, { Request, Response } from 'express';
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  };


export const upload = multer({
    storage: storage,
    fileFilter : fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  });

