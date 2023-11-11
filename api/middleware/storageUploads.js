import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },

  filename: (req, file, cb) => {
    const fileExt =
      file.originalname.split(".")[file.originalname.split(".").length - 1];

    let fileName = uuid() + `.${fileExt}`;

    cb(null, fileName);
  },
});

const types = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage, fileFilter });
