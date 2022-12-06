const express = require("express");
const ruta = express.Router();

let modeloDatos = require("../Modelo/modelo");
let horarios = require("../Modelo/horarios");
let needle = require("../Modelo/needle");

ruta.get('/', (req, res) => {
  modeloDatos.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.get('/horarios', (req, res) => {
  horarios.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.get('/needle', (req, res) => {
  needle.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

const bcrypt = require("bcrypt");
ruta.post('/registrar', async (req, res, next) => {

  const emailExiste = await modeloDatos.findOne({ email: req.body.email })
  if (emailExiste) {
    return res.status(400).json({ error: "el usuario ya se encuentra registrado" })
  }
  //const encryp=await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, 10);

  const user = new modeloDatos({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: password
  })

  modeloDatos.create(user, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

ruta.post('/regneedle', async (req, res, next) => {

  const ingreso = new needle({
    name: req.body.name,
    cod: req.body.cod,
    g09: req.body.g09,
    g05: req.body.g05,
    a75: req.body.a75,
    a76: req.body.a76,
    a06: req.body.a06,
    a09: req.body.a09,
    a12: req.body.a12,
    a16: req.body.a16,
    obs: req.body.obs
  })

  needle.create(ingreso, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

ruta.get("/edit-student/:id", (req, res) => {
  modeloDatos.findById(req.params.id, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.put("/update-student/:id", (req, res, next) => {
  modeloDatos.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Student successfully updated!");
      }
    }
  );
});

ruta.delete("/delete-student/:id", (req, res, next) => {
  modeloDatos.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

ruta.delete("/delneedle/:id", (req, res, next) => {
  needle.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});


const jwt = require("jsonwebtoken")

ruta.post("/login", async (req, res) => {
  const user = await modeloDatos.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      error: "usuario no esta registrado"
    })
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).json({
      error: "contraseña invalida"
    })
  }

  res.json({
    error: null,
    data: "acceso exitoso"
  })
  const token = jwt.sign({
    email: user.email,
    id: user._id
  }, "claveSecreta")
  res.header("auth-token", token).json({
    error: null,
    data: { token }
  })
})
module.exports = ruta;