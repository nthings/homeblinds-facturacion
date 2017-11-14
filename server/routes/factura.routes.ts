import {Router} from 'express';

const facturapi = require('facturapi')('sk_test_7ybLJDB9dvRXnDmrKz5YdAMw5aNkmrVP');
const router = Router();

router.get('/all', (req, res) => {
    facturapi.invoices.list()
        .then(list => {
            res.send(list.data);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/add', (req, res) => {
    facturapi.invoices.create(req.body)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/get/:id', (req, res) => {
    facturapi.invoices.retrieve(req.params.id)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/cancel/:id', (req, res) => {
    facturapi.invoices.cancel(req.params.id)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/send/:id', (req, res) => {
    facturapi.invoices.sendByEmail(req.params.id)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

export const FacturaRoutes: Router = router;
