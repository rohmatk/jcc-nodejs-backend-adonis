import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FieldValidator from "App/Validators/FieldValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class FieldsController {

  public async index ({response, params}: HttpContextContract) {
    const venue_id = params.venue_id;

    const data = await Database.query().select(
      ['id', 'name', 'type', 'venue_id']
    ).from('fields').where('venue_id', venue_id);

    return response.status(200).json({
      response_code: "00",
      response_message: "Data Fetched",
      data
    })
  }

  public async show ({response, params}: HttpContextContract) {
    try {
      const venue_id = params.venue_id;
      const id = params.id

      const data = await Database.query().select(
        ['id', 'name',' type', 'venue_id']
      ).from('fields').where('venue_id', venue_id).andWhere('id', id).firstOrFail();

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

    let [ lastInsertId ] = await Database.table('fields').insert({
      name, type, venue_id
    });

    const data = await Database.query().select(
      ['id', 'name', 'type', 'venue_id']
    ).from('fields').where('id', lastInsertId);

    return response.status(201).json({
      response_code: "00",
      response_message: "Data Successfully Stored",
      data
    });
  }

  public async update ({request, response, params}: HttpContextContract) {
    const venue_id = params.venue_id;
    const id = params.id;
    const name = request.input('name');
    const type = request.input('type');

    await request.validate(FieldValidator);

    await Database.from('fields').where('venue_id', venue_id).andWhere('id', id).update({
      name, type, venue_id
    });

    const data = await Database.query().select(
      ['id', 'name', 'type', 'venue_id']
    ).where('venue_id', venue_id).andWhere('id', id).from('fields').firstOrFail();

    return response.status(201).json({
      response_code: "00",
      response_message: `Data Venue ${venue_id} Field ${id} Updated`,
      data
    })
  }

  public async destroy ({response, params}) {
    const venue_id = params.venue_id;
    const id = params.id;

    await Database.from('fields').where('venue_id', venue_id).andWhere('id', id).delete();

    return response.status(202).json({
      response_code: "00",
      response_message: `Data Venue ${venue_id} Field ${id} Successfully Deleted`
    });
  }

}