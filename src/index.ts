
import express from 'express'
import bodyParser from 'body-parser';
import cardRoutes from './routes/cardRoutes';

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use('/cards', cardRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})