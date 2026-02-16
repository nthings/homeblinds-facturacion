import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import User from '../models/user';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
    model = User;

    login = async (req, res) => {
        try {
            const user: any = await this.model.findOne({ username: req.body.username.toLowerCase() });
            if (!user) {
                return res.sendStatus(403);
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.sendStatus(403);
            }
            const token = jwt.sign({user: user}, process.env.SESSION_SECRET); // , { expiresIn: 10 } seconds
            res.status(200).json({user: user, token: token});
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }

    changePass = async (req, res) => {
        try {
            const user = await this.model.findOne({username: req.body.username});
            if (!user) {
                console.log("User not found");
                return res.sendStatus(401);
            }
            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isMatch) {
                return res.sendStatus(403);
            }
            user.password = req.body.password;
            user.nuevo = false;
            await user.save();
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }

    getDepartmentsAndRoles = (req, res) => {
        console.log(req.params.id);
        this.model.findById(req.params.id)
            .populate('Department')
            .populate('Role')
            .exec()
            .then(user => {
                if (!user) {
                    console.log('User not found');
                    return res.sendStatus(401);
                }
                console.log(user);
                return res.send((user as any).departamentos);
            })
            .catch(err => {
                console.error(err);
                return res.sendStatus(500);
            });
    }
}
