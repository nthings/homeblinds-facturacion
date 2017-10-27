import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as expressJwt from 'express-jwt';
import * as path from 'path';
import UserCtrl from './controllers/user';
import {UserRoutes} from './routes';

const app = express();
const userCtrl = new UserCtrl();


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Log
app.use(morgan('dev'));

// Mongoose
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})
// mongoose.connect('mongodb://localhost:27017/users', { useMongoClient: true })

    .then(
        // Connection successfull
        () => {
            // Login User
            app.post('/login', userCtrl.login);

            // API location
            app.use('/users', expressJwt({secret: process.env.SESSION_SECRET}), UserRoutes);

            // Angular DIST output folder
            app.use(express.static(path.join(__dirname, '../client')));

            // Send all other requests to the Angular app
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '../client/index.html'));
            });
            // Set server, In heroku we listen to a unix sock
            const port: number = process.env.PORT || 3000;
            app.listen(port, () => console.log(`Running on localhost:${port}`));

        },
        // Error
        err => {
            console.log(err);
        }
    );


