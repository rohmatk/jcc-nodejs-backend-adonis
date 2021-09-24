import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VenueValidator from "App/Validators/VenueValidator";
import Venue from "App/Models/Venue";

export default class VenuesController {

  public async index ({ response }: HttpContextContract) {
    const data = await Venue.all();

    return response.status(200).json({
      response_code: "00",
      response_message: "Data Fetched",
      data
    });
  }

  public async show ({response, params}: HttpContextContract) {
    let id = params.id;
    try {
      const data = await Venue.findOrFail(id);

      return response.status(200).json({
        response_code: "00",
        response_message: `Data ${id} fetched`,
        data
      });
    } catch (err) {
      return response.json({
        response_code: "01",
        error_message: err.message
      });
    }
  }

  public async store ({request, response}: HttpContextContract) {
    let name = request.input('name');
    let address = request.input('address');
    let phone = request.input('phone');

    await request.validate(VenueValidator);

    const data = await Venue.create({
      name, address, phone
    });

    return response.created({
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

    try {
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
      return response.json({
        response_code: "01",
        error_message: err.message
      })
    }

  }

  public async destroy ({response, params}: HttpContextContract) {
    const id = params.id;

    try {
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