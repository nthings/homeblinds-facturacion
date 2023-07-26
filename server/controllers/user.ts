import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import User from '../models/user';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
    model = User;

    login = (req, res) => {
        this.model.findOne({ username: req.body.username.toLowerCase() }, (err, user: any) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                if (!isMatch) {
                    return res.sendStatus(403);
                }
                const token = jwt.sign({user: user}, process.env.SESSION_SECRET); // , { expiresIn: 10 } seconds
                res.status(200).json({user: user, token: token});
            });
        });
    }

    changePass = (req, res) => {
        this.model.findOne({username: req.body.username}, (err, user) => {
            //User not found
            if (!user) {
                console.log("User not found");
                return res.sendStatus(401);
            }
            bcrypt.compare(req.body.oldPassword, user.password, (err, isMatch) => {
                // Passwords don't match
                if (!isMatch) {
                    return res.sendStatus(403);
                }
                user.password = req.body.password;
                user.nuevo = false;
                user.save((err) => {
                    // error saving user
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    res.sendStatus(200);
                });
            });
        });
    }

    getDepartmentsAndRoles = (req, res) => {
        console.log(req.params.id);
        this.model.findById(req.params.id)
            .populate('Department')
            .populate('Role')
            .exec((err, user) => {
                if (!user) {
                    console.log('User not found');
                    return res.sendStatus(401);
                }
                console.log(user);
                return res.send(user.departamentos);
            });
    }
}
