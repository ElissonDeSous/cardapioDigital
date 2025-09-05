import multer from "multer";
import crypto from "crypto";
import { dirname, extname, resolve } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  upload(folder) {
    return {
      storage: multer.diskStorage({
        destination: (request, file, callback) => {
          callback(null, resolve(__dirname, "..", "..", folder));
        },
        filename: (request, file, callback) => {
          const hash = crypto.randomBytes(16).toString("hex");
          const fileName = `${hash}-${file.originalname}`;
          callback(null, fileName);
        },
      }),
    };
  },
};
