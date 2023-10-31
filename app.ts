import './config.js';
import dotenv from 'dotenv'
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dataSource from './src/db/dataSource.js';
import adminRouter from './src/routes/route_admin.js'
import customerRouter from './src/routes/route_customer.js'
import routeOrder from './src/routes/route_order.js'
import routePayment from './src/routes/route_payment.js'
import routeProduct from './src/routes/route_product.js'
import routeReview from './src/routes/route_review.js'
import routeCategory from './src/routes/route_categories.js'
import routeCart from './src/routes/route_cart.js'
import fileUpload from 'express-fileupload'
import dataSourceRDS from './src/db/dataSource.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000



app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }))

// routes of application
app.use('/admin', adminRouter);
app.use('/users', customerRouter);
app.use('/orders', routeOrder);
app.use('/Products', routeProduct);
app.use('/category', routeCategory);
app.use('/carts', routeCart);
app.use('/review', routeReview);
app.use('/', routePayment);


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
// dataSourceRDS.initialize().then(() => {
//   console.log("Connected to DB!");
// }).catch(err => {
//   console.error('Failed to connect to DB RDS: ' + err);
// });
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});


export default app;