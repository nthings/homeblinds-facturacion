import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as expressJwt from 'express-jwt';
import * as path from 'path';
import UserCtrl from './controllers/user';
import {UserRoutes, ClientRoutes, FacturaRoutes, ProductRoutes} from './routes';

const app = express();
const userCtrl = new UserCtrl();


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Log
app.use(morgan('dev'));

// Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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
            app.use('/users', expressJwt({secret: process.env.SESSION_SECRET}), UserRoutes);
            app.use('/clients', expressJwt({secret: process.env.SESSION_SECRET}), ClientRoutes);
            app.use('/facturas', expressJwt({secret: process.env.SESSION_SECRET}), FacturaRoutes);
            app.use('/products', expressJwt({secret: process.env.SESSION_SECRET}), ProductRoutes);

            // Angular DIST output folder
            app.use(express.static(path.join(__dirname, '../client')));

            // Send all other requests to the Angular app
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '../client/index.html'));
            });
            // Set server, In heroku we listen to a unix sock
            const port: any = process.env.PORT || 3000;
            app.listen(port, () => console.log(`Running on localhost:${port}`));

        },
        // Error
        err => {
            console.log(err);
        }
    );


