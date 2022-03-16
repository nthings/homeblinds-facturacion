import { Router } from 'express';
const router = Router();

router.get('/all', (req, res) => {
    require('facturapi')(req.app.get('apiKey'), {
        apiVersion: 'v1'
    }).products.list()
        .then(list => {
            res.send(list.data);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/add', (req, res) => {
    require('facturapi')(req.app.get('apiKey'), {
        apiVersion: 'v1'
    }).products.create(req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/get/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey'), {
        apiVersion: 'v1'
    }).products.retrieve(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/edit/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey'), {
        apiVersion: 'v1'
    }).products.update(req.params.id, req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/delete/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey'), {
        apiVersion: 'v1'
    }).products.del(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

export const ProductRoutes: Router = router;
