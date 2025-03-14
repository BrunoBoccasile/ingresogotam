import { Router } from "express";
import { getAreas } from "../controllers/areas.controller.js";
// import { validateJson } from "../validators/json.js";
const router = Router();

router.get("/areas", getAreas);

export default router;