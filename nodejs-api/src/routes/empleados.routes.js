import { Router } from "express";
import { getEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from "../controllers/empleados.controller.js";
import { validateCreate, validateUpdate } from "../validators/empleados.js";
// import { validateJson } from "../validators/json.js";
const router = Router();

router.get("/empleados", getEmpleados);

router.get("/empleados/:id", getEmpleado);

router.post("/empleados", validateCreate, createEmpleado);

router.patch("/empleados/:id", validateUpdate, updateEmpleado);

router.delete("/empleados/:id", deleteEmpleado);

export default router;