import Factura from '../models/factura';
import Client from '../models/client';
import BaseCtrl from './base';
import * as nodemailer from 'nodemailer';

export default class FacturaCtrl extends BaseCtrl {
    model = Factura;

    replaceReferenceClient = (req, res) => {
        this.model.find({cliente: req.body.rfc}, (err, facturas) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            if (!facturas) {
                return res.sendStatus(200);
            }

            facturas.forEach((factura) => {
                factura.cliente = req.body;
                this.model.findOneAndUpdate({_id: factura._id}, factura, (errUpdate) => {
                    if (errUpdate) {
                        console.error(errUpdate);
                        return res.sendStatus(500);
                    }
                });
            });

            res.sendStatus(200);
        });
    }
}
