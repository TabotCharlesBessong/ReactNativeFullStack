import { Request, RequestHandler } from "express";
import formidable, { File } from "formidable";

export interface RequestWithFiles extends Request {
  files?: { [key: string]: File };
}

const fileParser: RequestHandler = async (req: RequestWithFiles, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data;"))
    return res.status(422).json({ error: "Only accepts form-data!" });

  const form = formidable({ multiples: false });

  // form.parse method now resolves with array, which we can destructure like below.
  const [fields, files] = await form.parse(req);

  // because fields and files both are object like 'fields = { name: [ "John Doe" ] }'
  // and 'files = { avatar: [ PersistentFile {...} ] }'
  // so we can use for in loop which loops through the object and take out the first value from the object field
  // like req.body[key] will give in this example req.body[name] = "John Doe"
  // and for image this will be req.files[avatar] = File

  for (let key in fields) {
    const field = fields[key];
    if (field) {
      req.body[key] = field[0];
    }
  }

  for (let key in files) {
    const file = files[key];

    // at first req.files can be undefined so we have to add default value empty {}
    if (!req.files) {
      req.files = {};
    }

    if (file) {
      req.files[key] = file[0];
    }
  }

  next();
};

export default fileParser;
