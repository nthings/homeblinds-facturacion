import { Router } from 'express';
const Facturapi = require('facturapi');
const facturapi = new Facturapi(process.env.API_KEY, {
    apiVersion: 'v2'
});

const router = Router();

const getInvoicesByPage = async (invoices: Array<any>, page: number): Promise<any> => {
    const response = await facturapi.invoices.list({ page });
    invoices = invoices.concat(response.data);
    if (response.total_pages > page) {
        invoices = await getInvoicesByPage(invoices, page + 1);
    }
    return invoices;
}

router.get('/all', async (req, res) => {
    try {
        const invoices = await getInvoicesByPage([], 1)
        res.send(invoices);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.post('/add', async (req, res) => {
    try {
        console.log(req.body)
        const invoice = await facturapi.invoices.create(req.body);
        res.send(invoice);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const invoice = await facturapi.invoices.retrieve(req.params.id);
        res.send(invoice);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.delete('/cancel/:id', async (req, res) => {
    try {
        const motive = req.query.motive || "03"
        const invoice = await facturapi.invoices.cancel(req.params.id, { motive: req.query.motive })
        res.send(invoice);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.get('/send/:id', async (req, res) => {
    try {
        const invoice = await facturapi.invoices.sendByEmail(req.params.id,
            { email: 'homeblinds@hotmail.com' });
        res.send(invoice);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.get('/download/:id', async (req, res) => {
    try {
        // Tell the browser that this is a zip file.
        res.writeHead(200, {
            'Content-Type': 'application/zip',
            'Content-disposition': `attachment; filename=${req.params.id}.zip`
        })
        const zipStream = await facturapi.invoices.downloadZip(req.params.id)
        zipStream.pipe(res)
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

export const InvoiceRoutes: Router = router;
