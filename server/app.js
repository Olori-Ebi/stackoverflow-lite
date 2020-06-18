import express from 'express';
import bodyParser from 'body-parser';
import questionRouter from './routes/question';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', questionRouter);
app.get('/', (req, res) => {
  res.send('Congratulations on your first endpoint');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

export default app;
