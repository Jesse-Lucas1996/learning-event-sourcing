
import express from 'express'
import bodyParser from 'body-parser';
import walletRoute from './routes/walletRoute';

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', walletRoute);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})