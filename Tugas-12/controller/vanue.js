const Venue = require('../models/venue');

class VenuesController {
    static async save(req, res) {
        // console.log(req.body.name)
        let newVenue = Venue.build({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        })
        console.log("cek : ", newVenue instanceof Venue);
        console.log(newVenue.dataValues);
        await newVenue.save();
        res.status(200).json({
            message: "Created",
            data: newVenue
        })
    }
    
    static async getAll(req, res) {
        let getVenue = await Venue.findAll({
            attributes: ['name', 'address', 'phone']
        });
        res.status(200).json({
            message: "GET ALL",
            data: getVenue
        })
    }

    static async getByID(req, res) {
        let getVenue = await Venue.findAll({
            attributes: ['name', 'address', 'phone'],
            where: {
                id: [req.params.id]
            }
        });
        res.status(200).json({
            message: "GET ByID",
            data: getVenue
        })
    }

    static async updateByID(req, res) {
        await Venue.update({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        },{
            where: {
                id: [req.params.id]
            }
        });

        let getVenue = await Venue.findAll({
            attributes: ['name', 'address', 'phone'],
            where: {
                id: [req.params.id]
            }
        });
        res.status(200).json({
            message: "GET ByID",
            data: getVenue
        })
    }

    static async deleteByID(req, res) {
        await Venue.destroy({
            where: {
                id: [req.params.id]
            }
        });

        let getVenue = await Venue.findAll({
            attributes: ['name', 'address', 'phone']
        });
        res.status(200).json({
            message: "GET ByID",
            data: getVenue
        })
    }
    
}

module.exports = VenuesController;