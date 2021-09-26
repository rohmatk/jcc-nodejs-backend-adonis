import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VenueValidator from "App/Validators/VenueValidator";
import Venue from "App/Models/Venue";

export default class VenuesController {

  /**
   * @swagger
   * /api/v1/venues/:
   *   get:
   *     description: Fetching all the existing venue
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Venues
   *     summary: Index Venue API
   *     responses:
   *       200:
   *         description: Venue Successfully Fetched
   *         content:
   *           application/json:
   *             schemas:
   *               message:
   *                 type: string
   *                 example:
   *                   response_message: "Data Fetched"
   *               data:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     id: integer
   *                     user_id: string
   *                     name: string
   *                     address: string
   *                     phone: string
   *                   example:
   *                     id: 1
   *                     user_id: eed048fd-6380-4ea3-ab4f-5a2dcfe4d7e3
   *                     name: William Woollett Jr. Aquatics Center
   *                     address: Irvine, California, US
   *                     phone: +6281234567890
   * */
  public async index ({ response }: HttpContextContract) {
    const data = await Venue.query()
      .preload('fields')
      .select(['id', 'user_id', 'name', 'address', 'phone']);

    return response.status(200).json({
      response_code: "00",
      response_message: "Data Fetched",
      data
    });
  }

  /**
   * @swagger
   * /api/v1/venues/{id}:
   *   get:
   *     description: Fetching spesific venue using spesific venue id
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Venues
   *     summary: Show Venue API
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the venue to show
   *     responses:
   *       200:
   *         description: Venue Successfully Fetched
   *         content:
   *           application/json:
   *             schemas:
   *               message:
   *                 type: string
   *                 example:
   *                   response_message: "Data 1 Fetched"
   *               data:
   *                 type: object
   *                 properties:
   *                   id: integer
   *                   user_id: string
   *                   name: string
   *                   address: string
   *                   phone: string
   *                 example:
   *                   id: 1
   *                   user_id: eed048fd-6380-4ea3-ab4f-5a2dcfe4d7e3
   *                   name: William Woollett Jr. Aquatics Center
   *                   address: Irvine, California, US
   *                   phone: +6281234567890
   *       400:
   *         description: Venue not found
   * */
  public async show ({response, params}: HttpContextContract) {
    let id = params.id;
    try {
      const data = await Venue.query()
        .preload('fields', (query) => {
          query.select(['id', 'name', 'type', 'venue_id']);
        })
        .where('id', id)
        .select(['id', 'user_id', 'name', 'address', 'phone'])
        .firstOrFail();

      return response.status(200).json({
        response_code: "00",
        response_message: `Data ${id} fetched`,
        data
      });
    } catch (err) {
      return response.status(400).json({
        response_code: "01",
        error_message: err.message
      });
    }
  }

  /**
   * @swagger
   * /api/v1/venues:
   *   post:
   *     description: Storing new venue data (only owner role authorized)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Venues
   *     summary: Store Venue API
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             $ref: '#definitions/Venue'
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#definitions/Venue'
   *     responses:
   *       201:
   *         description: Venue Successfully stored
   *       401:
   *         description: Access Restricted (Unauthorized)
   *       422:
   *         description: Request Invalid
   *
   * */
  public async store ({request, auth, response}: HttpContextContract) {
    let name = request.input('name');
    let address = request.input('address');
    let phone = request.input('phone');
    let userId = auth.user?.id;

    await request.validate(VenueValidator);

    const data = await Venue.create({
      name, userId, address, phone
    });

    return response.created({
      response_code: "00",
      response_message: "Data Successfully Stored",
      data
    });
  }


  /**
   * @swagger
   * /api/v1/venues/{id}:
   *   put:
   *     description: Updating spesific venue (only owner role authorized AND the creator of the venue)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Venues
   *     summary: Update Venue API
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the venue to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             $ref: '#definitions/Venue'
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#definitions/Venue'
   *     responses:
   *       201:
   *         description: Venue Successfully Updated
   *       400:
   *         description: Venue id Not Found
   *       401:
   *         description: Access Restricted (Unauthorized)
   *       422:
   *         description: Request Invalid
   *
   * */
  public async update ({request, response, auth, params}: HttpContextContract) {
    const id = params.id;
    const userId = auth.user?.id;
    let name = request.input('name');
    let address = request.input('address');
    let phone = request.input('phone');

    await request.validate(VenueValidator);

    try {
      // @ts-ignore
      await Venue.query().where('id', id).andWhere('user_id', userId).firstOrFail();
      const data = await Venue.findOrFail(id);
      data['name'] = name;
      data['address'] = address;
      data['phone'] = phone;
      await data.save();
      return response.status(201).json({
        response_code: "00",
        response_message: `Data ${id} Successfully Updated`,
        data
      });
    } catch (err) {
      return response.status(400).json({
        response_code: "01",
        error_message: err.message
      })
    }

  }


  /**
   * @swagger
   * /api/v1/venues/{id}:
   *   delete:
   *     description: Deleting spesific venue from database (same rule applies with updating)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Venues
   *     summary: Delete Venue API
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the venue to show
   *     responses:
   *       200:
   *         description: Venue Successfully Deleted
   *         content:
   *           application/json:
   *             schemas:
   *               message:
   *                 type: string
   *                 example:
   *                   response_message: "Data 1 Deleted"
   *       404:
   *         description: Venue not found
   * */
  public async destroy ({response, auth, params}: HttpContextContract) {
    const id = params.id;
    const userId = auth.user?.id;

    try {
      // @ts-ignore
      await Venue.query().where('id', id).andWhere('user_id', userId).firstOrFail();

      const venue = await Venue.findOrFail(id);
      await venue.delete();

      return response.status(202).json({
        response_code: "00",
        response_message: `Data ${id} Successfully Deleted`
      });
    } catch (err) {
      return response.status(404).json({
        response_code: "01",
        error_message: err.message
      });
    }
  }
}