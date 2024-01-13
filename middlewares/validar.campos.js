const { response } = require("express");
const { validationResult } = require("express-validator");

const valiodarCampos = (req, res = response, netx) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  netx()
};

module.exports={
valiodarCampos
}


