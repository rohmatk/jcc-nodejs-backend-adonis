const Vanue = require('../models/vanue');

class VanuesController {
    static async save(req, res) {
        // console.log(req.body.name)
        let newVanue = Vanue.build({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        })
        console.log("cek : ", newVanue instanceof Venue);
        console.log(newVenue.dataValues);
        await newVanue.save();
        res.status(200).json({
            message: "Created",
            data: newVanue
        })
    }
    
    static async getAll(req, res) {
        let getVanue = await Vanue.findAll({
            attributes: ['name', 'address', 'phone']
        });
        res.status(200).json({
            message: "GET ALL",
            data: getVanue
        })
    }

    static async getByID(req, res) {
        let getVanue = await Vanue.findAll({
            attributes: ['name', 'address', 'phone'],
            where: {
                id: [req.params.id]
            }
        });
        res.status(200).json({
            message: "GET ByID",
            data: getVanue
        })
    }

    static async updateByID(req, res) {
        await Vanue.update({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        },{
            where: {
                id: [req.params.id]
            }
        });

        let getVanue = await Vanue.findAll({
            attributes: ['name', 'address', 'phone'],
            where: {
                id: [req.params.id]
            }
        });
        res.status(200).json({
            message: "GET ByID",
            data: getVanue
        })
    }

    static async deleteByID(req, res) {
        await Vanue.destroy({
            where: {
                id: [req.params.id]
            }
        });

        let getVanue = await Vanue.findAll({
            attributes: ['name', 'address', 'phone']
        });
        res.status(200).json({
            message: "GET ByID",
            data: getVanue
        })
    }
    
}

module.exports = VanuesController;