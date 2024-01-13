/*
RUTAS DE EVENTOS
host+/api/events
*/

const { Router } = require("express");
const {validarToken}=require('../middlewares/validar-token')
const router = Router();
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/event");
const { check } = require("express-validator");
const { valiodarCampos } = require("../middlewares/validar.campos");
const { isDate } = require("../helpers/isDate");

router.use(validarToken)
router.use(valiodarCampos)

router.get(
    "/",[valiodarCampos],
     getEventos);

router.post(
    "/",
    [
        check("title", "El titulo debe ser obligatorio").not().isEmpty(),
        check("start", "La fecha de inicio es obligatoria").custom(isDate),
        check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
        valiodarCampos
    ],
    crearEvento);

router.put(
    "/:id",
    [
    check("title", "El titulo debe ser obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
    valiodarCampos
    ],
    actualizarEvento);

router.delete(
    "/:id",[valiodarCampos],eliminarEvento);

module.exports = router;
