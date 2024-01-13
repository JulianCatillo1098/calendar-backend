const { response } = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");
const Evento = require("../models/Evento");
const { populate } = require("dotenv");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");
  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegio pra actualizar esta nota",
      });
    }

    const nuevoEveto = {
      ...req.body,
      user: uid,
    
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEveto,
      {new:true}
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  
  const eventoId = req.params.id;
  const uid = req.uid
  
  //console.log("eventoID =",eventoId)
  //console.log("IDdelUsuario =",uid)

  try {
    const evento = await Evento.findById(eventoId);
    
  //console.log("evento =",evento)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegio para Eliminar esta nota",
      });
    }
    await Evento.findByIdAndDelete(eventoId);
    
    res.json({
      ok: true,
      msg:"el evento ha sido eliminado",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};


module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
