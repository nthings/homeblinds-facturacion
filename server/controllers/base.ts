abstract class BaseCtrl {

    abstract model: any;

    // Get all
    getAll = async (req, res) => {
        try {
            const docs = await this.model.find({});
            res.json(docs);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    // Count all
    count = async (req, res) => {
        try {
            const count = await this.model.countDocuments();
            res.json(count);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    // Insert
    insert = async (req, res) => {
        try {
            const obj = new this.model(req.body);
            const item = await obj.save();
            res.status(200).json(item);
        } catch (err: any) {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                return res.sendStatus(400);
            }
            console.error(err);
            res.status(500).send(err);
        }
    }

    // Get by id
    get = async (req, res) => {
        try {
            const obj = await this.model.findOne({_id: req.params.id});
            res.json(obj);
        } catch (err: any) {
            if (err && err.code === 11000) {
                return res.sendStatus(400);
            }
            console.error(err);
            res.status(500).send(err);
        }
    }

    // Update by id
    update = async (req, res) => {
        try {
            await this.model.findOneAndUpdate({_id: req.params.id}, req.body);
            res.sendStatus(200);
        } catch (err: any) {
            if (err && err.code === 11000) {
                return res.sendStatus(400);
            }
            console.error(err);
            res.status(500).send(err);
        }
    }

    // Delete by id
    delete = async (req, res) => {
        try {
            await this.model.findOneAndDelete({_id: req.params.id});
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
}

export default BaseCtrl;
