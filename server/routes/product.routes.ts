import { Router } from 'express';
const Facturapi = require('facturapi');
const facturapi = new Facturapi(process.env.API_KEY, {
    apiVersion: 'v2'
});
const router = Router();

router.get('/all', (req, res) => {
    facturapi.products.list()
        .then(list => {
            res.send(list.data);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.post('/add', (req, res) => {
    facturapi.products.create(req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.get('/get/:id', (req, res) => {
    facturapi.products.retrieve(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.post('/edit/:id', (req, res) => {
    facturapi.products.update(req.params.id, req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    facturapi.products.del(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

export const ProductRoutes: Router = router;
