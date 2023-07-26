import { Router } from 'express';
const Facturapi = require('facturapi');
const facturapi = new Facturapi(process.env.API_KEY, {
    apiVersion: 'v2'
});

const router = Router();

const getCustomersByPage = async (customers: Array<any>, page: number): Promise<any> => {
    const response = await facturapi.customers.list({ page });
    customers = customers.concat(response.data);
    if (response.total_pages > page) {
        customers = await getCustomersByPage(customers, page + 1);
    }
    return customers;
}

router.get('/all', async (req, res) => {
    try {
        const customers = await getCustomersByPage([], 1)
        res.send(customers);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.post('/add', async (req, res) => {
    try {
        const customer = await facturapi.customers.create(req.body);
        res.send(customer);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const customer = await facturapi.customers.retrieve(req.params.id);
        res.send(customer);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const customer = await facturapi.customers.update(req.params.id, req.body);
        res.send(customer);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const customer = await facturapi.customers.del(req.params.id);
        res.send(customer);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

export const ClientRoutes: Router = router;
