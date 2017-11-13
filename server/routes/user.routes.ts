import { Router } from 'express';
import UserCtrl from '../controllers/user';

const router = Router();
const userCtrl = new UserCtrl();

router.get('/logged', (req, res) => {
    res.sendStatus(200);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

router.get('/all', userCtrl.getAll);

router.post('/add', userCtrl.insert);

router.post('/edit/:id', userCtrl.update);

router.post('/changepass', userCtrl.changePass);

router.delete('/deleteUser/:id', userCtrl.delete);

export const UserRoutes: Router = router;
