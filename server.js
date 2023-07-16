import express from "express";
import ViteExpress from "vite-express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json({extended: true, limit: '1mb'}))

app.get('/users/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(JSON.stringify({users: users}));
});

app.get('/users/:userID', async (req, res) => {
  prisma.user.findUnique({
    where: {
      id: req.params.userID,
    },
  }).then((user) => {
    res.send(user);
  }).catch((e) => {
    console.log(e);
    res.send({error: e});
  })
})

app.put('/users/:userID', async (req, res) => {
  const data = req.body;
  prisma.user.update({
    where: {
      id: parseInt(req.params.userID),
    },
    data: {
      name: data.name,
      email: data.email,
      phno: data.phno
    }
  }).then((updateUser) => {
    res.send(updateUser);
  }).catch((e) => {
    res.send({error: e});
  })
})

app.delete('/users/:userID', async (req, res) => {
  prisma.user.delete({
    where: {
      id: parseInt(req.params.userID),
    }
  }).then((deleteUser) => {
    res.send(deleteUser);
  }).catch((e) => console.log(e));
})

app.post('/users/', async (req, res) => {
  const data = req.body;
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phno: data.phno,
    }
  })
  res.send(user);
})


const server = app.listen(3000, "0.0.0.0", () =>
  console.log("Server is listening...")
);

ViteExpress.bind(app, server);