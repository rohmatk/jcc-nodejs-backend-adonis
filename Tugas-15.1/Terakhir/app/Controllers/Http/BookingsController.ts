import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Booking from "App/Models/Booking";
import Field from "App/Models/Field";
import Venue from "App/Models/Venue";
import Database from "@ioc:Adonis/Lucid/Database";
import {ManyToManyQueryBuilder} from "@adonisjs/lucid/build/src/Orm/Relations/ManyToMany/QueryBuilder";

export default class BookingsController {

  public async index ({response, params}: HttpContextContract) {
    try {
      const venueId = params.venue_id;

      let data = await Venue.query()
        .preload('bookings', (query: ManyToManyQueryBuilder) => {
          query.select(['id', 'field_id', 'play_date_start', 'play_date_finish', 'booking_user_id'])
        })
        .select(['id','name', 'address', 'phone'])
        .where('id', venueId)
        .firstOrFail();

      return response.status(200).json({
        response_code: "00",
        response_message: `berhasil get data booking dari venue ${venueId}`,
        data
      })

    } catch (errors) {
      return response.status(400).json({
        error_message: errors.message,
        error_details: errors
      });
    }
  }

  public async store ({request, auth, response, params}: HttpContextContract) {
    const fieldId = request.input('field_id');
    const playDateStart = request.input('play_date_start');
    const playDateFinish = request.input('play_date_finish');
    const venueId = params['venue_id'];
    // @ts-ignore
    const bookingUserId = auth.user.$original.id;

    try {
      await Field.query().where('id', fieldId).andWhere('venue_id', params.venue_id).firstOrFail();

      await Booking.create({
        fieldId, venueId, playDateStart, playDateFinish, bookingUserId
      });

      return response.status(201).json({
        response_code: "00",
        response_message: "Berhasil Booking"
      });
    } catch (errors) {
      return response.status(400).json({
        errors_message: errors.message,
        error_details: errors
      })
    }
  }

  public async books ({response, auth, params}: HttpContextContract) {
    // @ts-ignore
    const player_id = auth.user.$original.id;
    const booking_id = params['booking_id'];

    try {
      await Database.table('player_bookings').insert({
        booking_id, player_id
      });

      return response.json({
        response_code: "00",
        response_message: "Berhasil Join Booking"
      });
    } catch (errors) {
      return response.status(400).json({
        errors_message: "Invalid Booking"
      })
    }

  }

  public async detailBooking ({response, params}: HttpContextContract) {

    const data = await Booking.query().preload('players', (query: ManyToManyQueryBuilder) => {
      query.select(['id', 'full_name', 'email'])
    }).select(
      ['id', 'field_id', 'play_date_start', 'play_date_finish', 'booking_user_id']
    ).where('id', params.booking_id).firstOrFail();

    const player_counts = data.players.length;
    data.$original['player_counts'] = player_counts;
    data.$original['players'] = data.$preloaded['players']

    return response.json({
      response_code: "00",
      response_message: "Berhasil get data booking by id",
      data: data.$original
    })
  }

}