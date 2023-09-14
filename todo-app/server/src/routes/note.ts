
import { Router } from "express";
import { create, getAll, getOne, remove, update } from "src/controller/note";

const router = Router()

router.post("/note/create", create);

router.patch("/note/:noteId", update);

router.delete("/note/:noteId", remove);

router.get("/note/:id", getOne);

router.get("/note/", getAll);

export default router