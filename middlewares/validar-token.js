const { response } = require("express");
const jwt = require('jsonwebtoken')

const validarToken = (req, res = response, next) => {

  const token = req.header("x-token");


  if (!token) {
    return res.status(4001).json({
      ok: false,
      mdg: "No existe el token",
    });
  }

  try {
    const {uid,name}= jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
        )

        req.uid= uid,
        req.name= name
    
  } catch (error) {
    return res.status(401).json({
    ok:false,
    msg:"no es valido el token"
    })
    
  }


  next();
};

module.exports = {
  validarToken,
};
