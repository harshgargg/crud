const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = 4000

const cors = require('cors')
const router = require('./Routes/router')

app.use(
  cors({
      origin:"*",
      credentials:true,
  })
)
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})