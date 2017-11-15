import {Router} from 'express';
const facturapi = require('facturapi')('sk_test_7ybLJDB9dvRXnDmrKz5YdAMw5aNkmrVP');

const router = Router();

router.get('/all', (req, res) => {
    facturapi.customers.list()
        .then(list => {
            res.send(list.data);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/add', (req, res) => {
    facturapi.customers.create(req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/get/:id', (req, res) => {
    facturapi.customers.retrieve(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/edit/:id', (req, res) => {
    facturapi.customers.update(req.params.id, req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/delete/:id', (req, res) => {
    facturapi.customers.del(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

export const ClientRoutes: Router = router;
