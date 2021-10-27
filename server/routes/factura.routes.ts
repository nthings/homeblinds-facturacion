import { Router } from 'express';
import * as fs from 'fs';

const router = Router();

router.get('/all', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).invoices.list()
        .then(list => {
            res.send(list.data);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/add', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).invoices.create(req.body)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/get/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).invoices.retrieve(req.params.id)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/cancel/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).invoices.cancel(req.params.id)
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/send/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).invoices.sendByEmail(req.params.id,
        { email: 'homeblinds@hotmail.com' })
        .then(invoice => {
            res.send(invoice);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/download/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).invoices.downloadZip(req.params.id)
        .then(invoice => {
            res.set('Content-Type', 'application/zip');
            res.set('Content-Disposition', `attachment; filename=${req.params.id}.zip`);
            invoice.pipe(res);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

export const FacturaRoutes: Router = router;
