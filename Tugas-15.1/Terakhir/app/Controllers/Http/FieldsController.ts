import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FieldValidator from "App/Validators/FieldValidator";
import Field from "App/Models/Field";
import Venue from "App/Models/Venue";

export default class FieldsController {

  /**
   * @swagger
   * /api/v1/venues/{venue_id}/fields:
   *   get:
   *     description: Fetching all the fields exist in certain venue
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Fields
   *     summary: Index Venue's Fields API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the fields venue
   *     responses:
   *       200:
   *         description: Field Successfully Fetched
   *       400:
   *         description: Venue id Not Found
   *       401:
   *         description: Access Restricted (Unauthorized)
   *
   * */
  public async index ({response, params}: HttpContextContract) {
    const venue_id = params.venue_id;

    try {
      const data = await Field.query().where('venue_id', venue_id).select(['id', 'name', 'type', 'venue_id']);

      if (data.length  == 0) {
        throw new Error("Venue ID is not exists");
      }

      return response.status(200).json({
        response_code: "00",
        response_message: "Data Fetched",
        data
      })
    } catch (err) {
      return response.status(400).json({
        response_code: "01",
        error_message: err.message
      });
    }
  }

  /**
   * @swagger
   * /api/v1/venues/{venue_id}/fields/{id}:
   *   get:
   *     description: Fetching spesific field from a venue using field id and venue id
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Fields
   *     summary: Show Venue's Field API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the field's venue
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the spesific field to show
   *     responses:
   *       200:
   *         description: Field Successfully Fetched
   *       404:
   *         description: Data Not Found
   *       401:
   *         description: Access Restricted (Unauthorized)
   *
   * */
  public async show ({response, params}: HttpContextContract) {
    try {
      const venue_id = params.venue_id;
      const id = params.id
      const data = await Field
        .query()
        .where('venue_id', venue_id)
        .andWhere('id', id)
        .select(['id', 'name', 'type', 'venue_id'])
        .firstOrFail();

      return response.status(200).json({
        response_code: "00",
        response_message: `Data Venue ${venue_id} Field ${id} Fetched`,
        data
      });
    } catch (errors) {
      return response.status(404).json({
        response_code: "01",
        response_message: `Data Not Found`,
        error_message: errors.message
      });
    }

  }


  /**
   * @swagger
   * /api/v1/venues/{venue_id}/fields:
   *   post:
   *     description: Storing new venue's field into database (only venue creator authorized)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Fields
   *     summary: Store Venue's Field API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the field's venue to store
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               type:
   *                 type: string
   *             required:
   *               - name
   *               - type
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               type:
   *                 type: string
   *             required:
   *               - name
   *               - type
   *     responses:
   *       201:
   *         description: Field Successfully stored
   *       422:
   *         description: Request Invalid
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
  public async store ({request, response, auth, params}: HttpContextContract) {
    const venueId = params.venue_id;
    const userId = auth.user?.id;
    let name = request.input('name');
    let type = request.input('type');

    await request.validate(FieldValidator);

    try {
      const venue = await Venue.query()
        .where('id', venueId)
        // @ts-ignore
        .andWhere('user_id', userId)
        .first();

      if (!venue) {
        throw new Error(`Venue anda dengan id ${venueId} tidak ditemukan`);
      }

      const data = await Field.create({
        name, type, venueId
      });

      return response.status(201).json({
        response_code: "00",
        response_message: "Data Successfully Stored",
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
   * /api/v1/venues/{venue_id}/fields/{id}:
   *   put:
   *     description: Updating spesific field using field id (same rule applied with storing)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Fields
   *     summary: Update Venue's Field API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the venue
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the spesific field to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               type:
   *                 type: string
   *             required:
   *               - name
   *               - type
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               type:
   *                 type: string
   *             required:
   *               - name
   *               - type
   *     responses:
   *       201:
   *         description: Field Successfully Updated
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Access Restricted (Unauthorized)
   *       422:
   *         description: Request Invalid
   *
   * */
  public async update ({request, response, auth, params}: HttpContextContract) {
    const venue_id = params.venue_id;
    const user_id = auth.user?.id;
    const id = params.id;
    const name = request.input('name');
    const type = request.input('type');

    await request.validate(FieldValidator);

    try {
      // @ts-ignore
      await Venue.query().where('id', venue_id).andWhere('user_id', user_id).firstOrFail();

      let data = await Field.query().where('venue_id', venue_id).andWhere('id', id).firstOrFail();
      data['name'] = name;
      data['type'] = type;
      await data.save();
      return response.status(201).json({
        response_code: "00",
        response_message: `Data Venue ${venue_id} Field ${id} Updated`,
        data
      });
    } catch (err) {
      return response.status(400).json({
        response_code: "01",
        error_message: "update failed"
      });
    }

  }


  /**
   * @swagger
   * /api/v1/venues/{venue_id}/fields/{id}:
   *   delete:
   *     description: deleting spesific field using field id (same rule applied with update and store)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Fields
   *     summary: Delete Venue's Field API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the venue
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the spesific field to delete
   *     responses:
   *       202:
   *         description: Field Successfully Updated
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Access Restricted (Unauthorized)
   *
   * */
  public async destroy ({response, auth, params}) {
    const venue_id = params.venue_id;
    const user_id = auth.user?.id;
    const id = params.id;

    try {
      // @ts-ignore
      await Venue.query().where('id', venue_id).andWhere('user_id', user_id).firstOrFail();

      const data = await Field.query().where('venue_id', venue_id).andWhere('id', id).firstOrFail();
      await data.delete();

      return response.status(202).json({
        response_code: "00",
        response_message: `Data Venue ${venue_id} Field ${id} Successfully Deleted`
      });
    } catch (err) {
      return response.status(400).json({
        response_code: "01",
        error_message: "delete failed"
      });
    }

  }
}