import Factura from '../models/factura';
import Client from '../models/client';
import BaseCtrl from './base';
import * as nodemailer from 'nodemailer';

export default class FacturaCtrl extends BaseCtrl {
    model = Factura;

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
                // const smtp = nodemailer.createTransport({
                //     host: 'smtp.live.com', // hostname
                //     secureConnection: false,  // TLS requires secureConnection to be false
                //     port: 587, // port for secure SMTP
                //     auth: {
                //         user: '' + process.env.HOTMAIL_USER + '',
                //         pass: '' + process.env.HOTMAIL_PASSWORD + ''
                //     },
                //     tls: {
                //         ciphers: 'SSLv3'
                //     }
                // });
                const smtp = nodemailer.createTransport('smtp://' + process.env.HOTMAIL_USER + ':' + process.env.HOTMAIL_PASSWORD + '@smtp-mail.outlook.com');
                const mailOptions = {
                    to: process.env.EMAIL,
                    from: process.env.HOTMAIL_USER,
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
