import {Router} from 'express';
const facturapi = require('facturapi')('sk_test_7ybLJDB9dvRXnDmrKz5YdAMw5aNkmrVP');
const router = Router();

router.get('/all', (req, res) => {
    facturapi.products.list()
        .then(list => {
            res.send(list.data);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/add', (req, res) => {
    facturapi.products.create(req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/get/:id', (req, res) => {
    facturapi.products.retrieve(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/edit/:id', (req, res) => {
    facturapi.products.update(req.params.id, req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/delete/:id', (req, res) => {
    facturapi.products.del(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

export const ProductRoutes: Router = router;
