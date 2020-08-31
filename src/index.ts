import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router } from './controllers/IotChainRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['abc'] }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,content-type,Accept'
  );
  next();
});
app.use(router);

app.listen(9100, () => {
  console.log('Listening on 9100');
});
