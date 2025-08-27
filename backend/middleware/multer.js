


import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // call cb correctly
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // give unique names
  }
});

const upload = multer({ storage });

export default upload;
