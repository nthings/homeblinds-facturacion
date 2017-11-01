import Factura from '../models/factura';
import Client from '../models/client';
import BaseCtrl from './base';
import * as nodemailer from 'nodemailer';

export default class FacturaCtrl extends BaseCtrl {
    model = Factura;

    getAll = (req, res) => {
        this.model.find({}, (err, docs) => {
            if (err) {
                return console.error(err);
            }
            res.json(docs);
        });
    }

    send = (req, res) => {
        this.model.findOne({_id: req.params.id}, (err, factura: any) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            if (!factura) {
                return res.sendStatus(404);
            }

            Client.findOne({rfc: factura.cliente}, (clientErr, cliente: any) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                if (!cliente) {
                    return res.sendStatus(404);
                }
                factura.cliente = cliente;
                const smtp = nodemailer.createTransport({
                    service: 'hotmail',
                    auth: {
                        user: process.env.HOTMAIL_USER,
                        pass: process.env.HOTMAIL_PASSWORD
                    }
                });
                const mailOptions = {
                    to: process.env.EMAIL,
                    from: '',
                    subject: 'FACTURA HOMEBLINDS',
                    text: JSON.stringify(factura)
                };
                smtp.sendMail(mailOptions, (errMail) => {
                    if (errMail) {
                        console.log(errMail);
                        return res.status(500);
                    }
                    res.status(200).send('Envíamos correctamente la factura');
                });
            });
        });
    }
}
