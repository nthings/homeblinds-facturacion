import { Router } from 'express';
import FacturaCtrl from '../controllers/factura';

const router: Router = Router();
const facturaCtrl = new FacturaCtrl();

router.get('/all', facturaCtrl.getAll);

router.get('/get/:id', facturaCtrl.get);

router.post('/add', facturaCtrl.insert);

router.post('/edit/:id', facturaCtrl.update);

router.delete('/delete/:id', facturaCtrl.delete);

router.get('/send/:id', facturaCtrl.send);

export const FacturaRoutes: Router = router;
