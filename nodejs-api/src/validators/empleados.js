import { check } from "express-validator"
import { validationResult } from "express-validator"

export const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array().map(error => error.msg).join(", "),
            status: "ERROR",
        });
    }

    next();
};


const validateCreate = [
    check('nombre')
        .exists()
        .withMessage("El valor del campo 'nombre' no puede ser null").bail()
        .isString()
        .withMessage("El valor del campo 'nombre' debe ser una cadena de caracteres")
        .not()
        .isEmpty()
        .withMessage("El valor del campo 'nombre' no puede estar vacío"),
    check('dni')
        .exists()
        .withMessage("El valor del campo 'dni' no puede ser null").bail()
        .isNumeric()
        .withMessage("El valor del campo 'dni' debe ser numérico"),
    check("nacimiento")
        .exists()
        .withMessage("El valor del campo 'nacimiento' no puede ser null").bail()
        .isDate()
        .withMessage("El valor del campo 'nacimiento' debe ser una fecha"),
    check("desarrollador")
        .exists()
        .withMessage("El valor del campo 'desarrollador' no puede ser null").bail()
        .custom((value, { req, res }) => {
            if (value != 0 && value != 1) {
                throw new Error("El valor en el campo 'desarrollador' debe ser 1 o 0")
            }
            return true
        }),
    check("descripcion")
        .exists()
        .withMessage("El valor del campo 'descripcion' no puede ser null").bail()
        .isString()
        .withMessage("El valor del campo 'descripcion' debe ser una cadena de caracteres")
        .not()
        .isEmpty()
        .withMessage("El valor del campo 'descripcion' no puede estar vacío"),
    check("id_area")
        .exists()
        .withMessage("El valor del campo 'id_area' no puede ser null").bail()
        .isNumeric()
        .withMessage("El valor del campo 'id_area' debe ser numérico"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdate = [
    check('nombre')
        .optional({ nullable: true })
        .isString()
        .withMessage("El valor del campo 'nombre' debe ser una cadena de caracteres")
        .not()
        .isEmpty()
        .withMessage("El valor del campo 'nombre' no puede estar vacío"),
    check('dni')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage("El valor del campo 'dni' debe ser numérico"),
    check("nacimiento")
        .optional({ nullable: true })
        .isDate()
        .withMessage("El valor del campo 'nacimiento' debe ser una fecha"),
    check("desarrollador")
        .optional({ nullable: true })
        .custom((value, { req, res }) => {
            if (value != 0 && value != 1) {
                throw new Error("El valor en el campo 'desarrollador' debe ser 1 o 0")
            }
            return true
        }),
    check("descripcion")
        .optional({ nullable: true })
        .isString()
        .withMessage("El valor del campo 'descripcion' debe ser una cadena de caracteres")
        .not()
        .isEmpty()
        .withMessage("El valor del campo 'descripcion' no puede estar vacío"),
    check("id_area")
        .optional({ nullable: true })
        .isNumeric()
        .withMessage("El valor del campo 'id_area' debe ser numérico"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export { validateCreate, validateUpdate }