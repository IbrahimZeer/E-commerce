import './config.js';
import dotenv from 'dotenv'
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import dataSource from './src/db/dataSource.js';
import adminRouter from './src/routes/route_admin.js'
import customerRouter from './src/routes/route_customer.js'
import routeOrder from './src/routes/route_order.js'
import routePayment from './src/routes/route_payment.js'
import routeProduct from './src/routes/route_product.js'
import routeReview from './src/routes/route_review.js'


dotenv.config()

const app = express();

dotenv.config();

const PORT = 5000

app.use(express.json());

// routes of application
app.use('/', adminRouter);
app.use('/', customerRouter);
app.use('/', routeOrder);
app.use('/', routePayment);
app.use('/', routeProduct);
app.use('/', routeReview);


app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

dataSource.initialize().then(() => {
  console.log("Connected to DB!");
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});


export default app;