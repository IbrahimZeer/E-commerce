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
import AWS from 'aws-sdk';
import path from 'path';
import multer from 'multer';
import multerS3 from 'multer-s3'
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import fs from 'fs'

dotenv.config()
const app = express();
const PORT = 5000

AWS.config.update({
  accessKeyId: process.env.YOUR_AWS_ACCESS_KEY,
  secretAccessKey:process.env.YOUR_AWS_SECRET_KEY,
  region: process.env.YOUR_AWS_REGION,
});

// const s3:undefined| = new S3Client({
//   region: process.env.YOUR_AWS_REGION,
//   credentials:{
//   secretAccessKey:process.env.YOUR_AWS_SECRET_KEY,
//   accessKeyId: process.env.YOUR_AWS_ACCESS_KEY,
//   },
// });

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//       callback(null, 'images/');
//   },
//   filename: (req, file, callback) => {
//       callback(null, Date.now() + '-' + file.originalname)
//   }
// });
// const upload = multer({
//   storage: multerS3({
//     s3 : s3,
//     bucket: 'armedfaresibraa',
//     acl:"public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key:function (req, file, cb) {
//       cb(null, file.originalname);
//     }
  
//   })
// })
// app.post('/upload', upload.single('photos'), (req:express.Request, res:express.Response)=> {
//   console.log(req.file);
  
//   res.send('Successfully uploaded ' )
// })
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//       callback(null, 'images/');
//   },
//   filename: (req, file, callback) => {
//       callback(null, Date.now() + '-' + file.originalname)
//   }
// });
// const upload = multer({ storage });

// app.post('/analyze', upload.single('file'), (req, res) => {
//   if (!req.file) {
//       res.status(500).send("Failed Upload File!");
//       return;
//   }

//     // Load the image file from disk
//     const fileBuffer = fs.readFileSync(req.file.path);

//     // Configure parameters for Rekognition
//     const params = {
//         Image: {
//             Bytes: fileBuffer,
//         },
//     };
//     rekognition.detectLabels(params, (err, data) => {
//       if (err) {
//           console.error('Error analyzing image:', err);
//           res.status(500).json({ error: 'Failed to analyze image' });
//       } else {
//           const labels = data.Labels?.map((label) => label.Name);
//           res.json({ labels });
//       }
//   });
// });


app.use(morgan('tiny'));
app.use(express.json());

// routes of application
app.use('/admin', adminRouter);
app.use('/users', customerRouter);
app.use('/orders', routeOrder);
app.use('/', routePayment);
app.use('/Products', routeProduct);
app.use('/', routeReview);
app.use('/category', routeCategory);
app.use('/carts', routeCart);


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