import Client from '../models/client';
import BaseCtrl from './base';

export default class ClientCtrl extends BaseCtrl {
    model = Client;

    getByRFC = (req, res) => {
        this.model.findOne({rfc: req.params.rfc}, (err, client: any) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            if (!client) {
                return res.sendStatus(404);
            }
            res.status(200).json(client);
        });
    }
}
