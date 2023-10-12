import './config.js';
import dotenv from 'dotenv'
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import dataSource from './db/dataSource.js';

const app = express();

const PORT = 5000;

dotenv.config();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.post('test', (req, res) => {
    res.send(`We are here`)
})

app.get('/', (req, res) => {
    res.send(`we are here frrom get`)
})

// catch 404 and forward to error handler
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