import { Router } from 'express';

const router = Router();

const getCustomersByPage = async (customers: Array<any>, page: number) => {
    try {
        const response = await require('facturapi')(req.app.get('apiKey')).customers.list({page});
        customers.concat(response.data);
        if (response.total_pages > page) {
            getCustomersByPage(customers, page+1);
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

router.get('/all', async (req, res) => {
    try {
        let customers = [];
        getCustomersByPage(customers, 1)
        res.send(customers);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.post('/add', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).customers.create(req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/get/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).customers.retrieve(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/edit/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).customers.update(req.params.id, req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/delete/:id', (req, res) => {
    require('facturapi')(req.app.get('apiKey')).customers.del(req.params.id)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => { /* handle the error */
            console.log(err);
            res.sendStatus(500);
        });
});

export const ClientRoutes: Router = router;
