const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://admin:_humberto27@maincluster.36akptz.mongodb.net/Lecto_escritura', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const usuarioSchema = new mongoose.Schema({
  nombreCompleto: String,
  correo: String,
  contrasena: String,
  nivelCuenta: Number
}, { versionKey: false });

const Usuario = mongoose.model('Usuario', usuarioSchema);

app.post('/register', async (req, res) => {
  const { nombreCompleto, correo, contrasena, nivelCuenta } = req.body;
  const hashedPassword = await bcrypt.hash(contrasena, 10);
  const usuario = new Usuario({ nombreCompleto, correo, contrasena: hashedPassword, nivelCuenta });
  await usuario.save();
  res.send('Usuario registrado con éxito');
});

app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) {
    return res.status(400).send('Correo o contraseña incorrectos');
  }

  const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!validPassword) {
    return res.status(400).send('Correo o contraseña incorrectos');
  }

  const token = jwt.sign({ id: usuario._id }, 'secretkey');
  res.status(200).json({ token, mensaje: 'Login exitoso' });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
