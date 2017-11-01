import { Router } from 'express';
import ClientCtrl from '../controllers/client';

const router: Router = Router();
const clientCtrl = new ClientCtrl();

router.get('/all', clientCtrl.getAll);

router.post('/add', clientCtrl.insert);

router.get('/get/:rfc', clientCtrl.getByRFC);

router.post('/edit/:id', clientCtrl.update);

router.delete('/delete/:id', clientCtrl.delete);

export const ClientRoutes: Router = router;
