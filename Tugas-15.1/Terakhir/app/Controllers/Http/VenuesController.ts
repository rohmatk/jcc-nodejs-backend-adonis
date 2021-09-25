import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VenueValidator from "App/Validators/VenueValidator";
import Venue from "App/Models/Venue";

export default class VenuesController {

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