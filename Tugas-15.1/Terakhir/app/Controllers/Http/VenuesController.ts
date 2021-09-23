import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VenueValidator from "App/Validators/VenueValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class VenuesController {

  public async index ({ response }: HttpContextContract) {
    const data = await Database.query().from('venues').select(['id', 'name', 'address', 'phone']);

    return response.status(200).json({
      response_code: "00",
      response_message: "Data Fetched",
      data
    });
  }

  public async show ({response, params}: HttpContextContract) {
    let id = params.id;

    const data = await Database.query().select(
      ['id', 'name', 'address', 'phone']
    ).from('venues').where('id', id).firstOrFail();

    return response.status(200).json({
      response_code: "00",
      response_message: `Data ${id} fetched`,
      data
    });
  }

  public async store ({request, response}: HttpContextContract) {
    let name = request.input('name');
    let address = request.input('address');
    let phone = request.input('phone');

    await request.validate(VenueValidator);

    const [ lastInsertId ] = await Database.table('venues').insert({
      name, address, phone
    });

    const data = await Database.query().select(
      ['id', 'name', 'address', 'phone']
    ).from('venues').where('id', lastInsertId);

    return response.status(201).json({
      response_code: "00",
      response_message: "Data Successfully Stored",
      data
    });
  }

  public async update ({request, response, params}: HttpContextContract) {
    const id = params.id;
    let name = request.input('name');
    let address = request.input('address');
    let phone = request.input('phone');

    await request.validate(VenueValidator);

    await Database.from('venues').where('id', id).update({
      name, address, phone
    });

    const data = await Database.query().select(['id', 'name', 'address', 'phone']).from('venues').where('id', id).firstOrFail();

    return response.status(201).json({
      response_code: "00",
      response_message: `Data ${id} Successfully Updated`,
      data
    });
  }

  public async destroy ({response, params}: HttpContextContract) {
    const id = params.id;

    await Database.from('venues').where('id', id).delete();

    return response.status(202).json({
      response_code: "00",
      response_message: `Data ${id} Successfully Deleted`
    })
  }
}