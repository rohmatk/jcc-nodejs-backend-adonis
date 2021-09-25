import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FieldValidator from "App/Validators/FieldValidator";
import Field from "App/Models/Field";
import Venue from "App/Models/Venue";

export default class FieldsController {

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