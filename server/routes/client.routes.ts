import { Router } from 'express';
const Facturapi = require('facturapi');
const facturapi = new Facturapi(process.env.API_KEY, {
    apiVersion: 'v2'
});

const router = Router();


const getCustomersByPage = async (facturapi: any, customers: Array<any>, page: number): Promise<any> => {
    try {
        const response = await facturapi.customers.list({ page });
        customers = customers.concat(response.data);
        if (response.total_pages > page) {
            customers = await getCustomersByPage(facturapi, customers, page + 1);
        }
        return customers;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

router.get('/all', async (req, res) => {
    try {
        const customers = await getCustomersByPage(facturapi, [], 1)
        res.send(customers);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.post('/add', (req, res) => {
    facturapi.customers.create(req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.get('/get/:id', (req, res) => {
    facturapi.customers.retrieve(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.post('/edit/:id', (req, res) => {
    facturapi.customers.update(req.params.id, req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    facturapi.customers.del(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.status(500).send(err);
        });
});

export const ClientRoutes: Router = router;
