import './config.js';
import dotenv from 'dotenv'
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import dataSource from './db/dataSource.js';


const app = express();
dotenv.config()
const PORT = 5000


// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;

dotenv.config();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.post('test', (req, res) => {
    res.send(`We are here`)
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

export default app;