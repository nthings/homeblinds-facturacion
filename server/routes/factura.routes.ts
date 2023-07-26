import { Router } from 'express';
const Facturapi = require('facturapi');
const facturapi = new Facturapi(process.env.API_KEY, {
    apiVersion: 'v2'
});

const router = Router();

router.get('/all', (req, res) => {
    facturapi.invoices.list()
        .then(list => {
            res.send(list.data);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.post('/add', (req, res) => {
    facturapi.invoices.create(req.body)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.get('/get/:id', (req, res) => {
    facturapi.invoices.retrieve(req.params.id)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.delete('/cancel/:id', (req, res) => {
    facturapi.invoices.cancel(req.params.id, { motive: "03" })
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.get('/send/:id', (req, res) => {
    facturapi.invoices.sendByEmail(req.params.id,
        { email: 'homeblinds@hotmail.com' })
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.get('/download/:id', (req, res) => {
    facturapi.invoices.downloadZip(req.params.id)
        .then(invoice => {
            res.set('Content-Type', 'application/zip');
            res.set('Content-Disposition', `attachment; filename=${req.params.id}.zip`);
            invoice.pipe(res);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

export const FacturaRoutes: Router = router;
