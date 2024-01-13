/*
RUTAS DE USUARIO/AUTH
host+/api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");

const { valiodarCampos } = require("../middlewares/validar.campos");

const { validarToken } = require("../middlewares/validar-token");

router.post(
  "/new",
  [
    check("name", "El nombre debe ser obligatorio").not().isEmpty(),
    check("gmail", "El gmail debe ser obligatorio").isEmail(),
    check("password", "La contraseña debe se mayor de 6 caracteres").isLength((min = 6)),
    valiodarCampos
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("gmail", "El gmail debe ser obligatorio").isEmail(),
    check("password", "La contraseña debe se mayor de 6 caracteres").isLength(min = 6),
    valiodarCampos
  ],
  loginUsuario
);

router.get("/renew",[validarToken], revalidarToken);

module.exports = router;
