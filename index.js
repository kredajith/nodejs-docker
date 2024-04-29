import { PrismaClient } from '@prisma/client'
import express from 'express';


const prisma = new PrismaClient()
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/getUser', async (req, res) => {

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  res.send(allUsers)
})

app.get('/', async (req, res) => {
  res.send("Welcome to Nodejs API")
})



app.post('/createUser', async (req, res) => {
  const body = req.body;
  console.log("body", req)
  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      posts: {
        create: body.posts,
      },
      profile: {
        create: body.profile,
      },
    },
  })

  res.send("success");

})

app.listen(8000, () => console.log('Server is running on port 8000'));
