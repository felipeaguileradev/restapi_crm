const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email });

  if (!usuario) {
    //   el usuario no existe
    await res.status(401).json({ mensaje: "Ese usuaior no existe" });
    next();
  } else {
    //   el usuario existe, verificar si el password es correcto o no
    if (!bcrypt.compareSync(password, usuario.password)) {
      await res.status(401).json({ mensaje: "Password incorrecto" });
      next();
    } else {
      // password correcto, firmar token
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          id: usuario._id,
        },
        "LLAVEULTRASECRETA",
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  }
};
