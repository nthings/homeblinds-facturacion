import { Router } from 'express';
const Facturapi = require('facturapi');
const facturapi = new Facturapi(process.env.API_KEY, {
    apiVersion: 'v2'
});

const router = Router();

const getProductsByPage = async (products: Array<any>, page: number): Promise<any> => {
    const response = await facturapi.products.list({ page });
    products = products.concat(response.data);
    if (response.total_pages > page) {
        products = await getProductsByPage(products, page + 1);
    }
    return products;
}

router.get('/all', async (req, res) => {
    try {
        const products = await getProductsByPage([], 1);
        res.send(products);
    } catch (err) {
        console.log(err);
        res.send(500).send(err.message);
    }
});

router.post('/add', async (req, res) => {
    try {
        const product = await facturapi.products.create(req.body);
        res.send(product);
    } catch (err) {
        console.log(err);
        res.send(500).send(err.message);
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const product = await facturapi.products.retrieve(req.params.id);
        res.send(product);
    } catch (err) {
        console.log(err);
        res.send(500).send(err.message);
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const product = await facturapi.products.update(req.params.id, req.body);
        res.send(product);
    } catch (err) {
        console.log(err);
        res.send(500).send(err.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const product = await facturapi.products.del(req.params.id);
        res.send(product);
    } catch (err) {
        console.log(err);
        res.send(500).send(err.message);
    }
});

export const ProductRoutes: Router = router;
