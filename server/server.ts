import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { expressjwt as jwt } from 'express-jwt';
import path from 'path';
import UserCtrl from './controllers/user';
import {UserRoutes, ClientRoutes, InvoiceRoutes, ProductRoutes} from './routes';

const app = express();
const userCtrl = new UserCtrl();


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Log
app.use(morgan('dev'));

// Mongoose
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not defined');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(
        // Connection successfull
        () => {
            // Login User
            app.post('/login', userCtrl.login);

            // app.set('apiKey', process.env.API_KEY_1);
            // app.post('/change', (req, res) => {
            //     req.app.set('apiKey', process.env['API_KEY_' + req.body.key]);
            //     res.sendStatus(200);
            // });
            // API location
            app.use('/users', jwt({secret: process.env.SESSION_SECRET, algorithms: ['HS256']}), UserRoutes);
            app.use('/clients', jwt({secret: process.env.SESSION_SECRET, algorithms: ['HS256']}), ClientRoutes);
            app.use('/invoices', jwt({secret: process.env.SESSION_SECRET, algorithms: ['HS256']}), InvoiceRoutes);
            app.use('/products', jwt({secret: process.env.SESSION_SECRET, algorithms: ['HS256']}), ProductRoutes);

            // Static files serving:
            // - On Vercel: Served automatically from public/ by Vercel's CDN (express.static NOT supported)
            // - Locally: Need express.static() for development
            if (!process.env.VERCEL) {
                app.use(express.static(path.join(__dirname, '../../public')));
            }
            
            // SPA fallback - only needed for local dev
            // On Vercel, routing handles this via vercel.json
            if (!process.env.VERCEL) {
                app.get('*', (req, res) => {
                    const indexPath = path.join(__dirname, '../../public/index.html');
                    res.sendFile(indexPath);
                });
            }
            // Set server, In heroku we listen to a unix sock
            const port: any = process.env.PORT || 3000;
            app.listen(port, () => console.log(`Running on localhost:${port}`));

        },
        // Error
        err => {
            console.log(err);
        }
    );


