import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FieldValidator from "App/Validators/FieldValidator";
import Field from "App/Models/Field";

export default class FieldsController {
  public async index ({response, params}: HttpContextContract) {
    const venue_id = params.venue_id;

    try {
      const data = await Field.query().where('venue_id', venue_id);

      return response.status(200).json({
        response_code: "00",
        response_message: "Data Fetched",
        data
      })
    } catch (err) {
      return response.json({
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
  public async store ({request, response, params}: HttpContextContract) {
    const venue_id = params.venue_id;
    let name = request.input('name');
    let type = request.input('type');

    await request.validate(FieldValidator);

    try {
      const data = await Field.create({
        name, type, venue_id
      });

      return response.status(201).json({
        response_code: "00",
        response_message: "Data Successfully Stored",
        data
      });
    } catch (err) {
      return response.json({
        response_code: "01",
        error_message: err.message
      });
    }
  }

  public async update ({request, response, params}: HttpContextContract) {
    const venue_id = params.venue_id;
    const id = params.id;
    const name = request.input('name');
    const type = request.input('type');

    await request.validate(FieldValidator);

    try {
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
      return response.json({
        response_code: "01",
        error_message: err.message
      });
    }

  }

  public async destroy ({response, params}) {
    const venue_id = params.venue_id;
    const id = params.id;

    try {
      const data = await Field.query().where('venue_id', venue_id).andWhere('id', id).firstOrFail();
      await data.delete();

      return response.status(202).json({
        response_code: "00",
        response_message: `Data Venue ${venue_id} Field ${id} Successfully Deleted`
      });
    } catch (err) {
      return response.json({
        response_code: "01",
        error_message: err.message
      });
    }
  }
}