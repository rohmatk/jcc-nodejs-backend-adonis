import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Booking from "App/Models/Booking";
import Field from "App/Models/Field";
import Venue from "App/Models/Venue";
import {ManyToManyQueryBuilder} from "@adonisjs/lucid/build/src/Orm/Relations/ManyToMany/QueryBuilder";
import PlayerBooking from "App/Models/PlayerBooking";

export default class BookingsController {
  public async index ({response, params}: HttpContextContract) {
    try {
      const venueId = params.venue_id;

      let dataVenue = await Venue.query()
        .where('id', venueId)
        .select(['id','name', 'address', 'phone'])
        .preload('bookings', (query) => {
          query.select(['id', 'field_id', 'user_id', 'play_date_start', 'play_date_finish']);
        })
        .firstOrFail();

      return response.status(200).json({
        response_code: "00",
        response_message: `berhasil get data booking dari venue ${venueId}`,
        data: dataVenue
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
    const userId = auth.user?.id;

    try {
      await Field.query().where('id', fieldId).andWhere('venue_id', params.venue_id).firstOrFail();

      const booking = await Booking.create({
        fieldId, userId, playDateStart, playDateFinish,
      });

      // @ts-ignore
      await booking.related('players').save(auth.user);

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

  public async update ({request, response, auth, params}: HttpContextContract) {
    let bookingId = params.id;
    const fieldId = request.input('field_id');
    const playDateStart = request.input('play_date_start');
    const playDateFinish = request.input('play_date_finish');
    const userId = auth.user?.id;

    // @ts-ignore
    const data = await Booking.query().where('id', bookingId).andWhere('user_id', userId).first();

    if (!data) {
      return response.status(400).json({
        message: "Tidak dapat mengupdate booking"
      });
    }

    // @ts-ignore
    await Booking.query().where('id', bookingId).andWhere('user_id', userId).update({
      field_id: fieldId,
      play_date_start: playDateStart,
      play_date_finish: playDateFinish
    })

    return response.status(200).json({
      response_code: "00",
      response_message: "Booking Updated"
    })
  }

  public async joinBooking ({response, auth, params}: HttpContextContract) {
    const playerId = auth.user?.id;
    const bookingId = params['id'];
    const searchPayload = {'user_id': playerId, 'booking_id': bookingId};
    const savePayload = {'user_id': playerId, 'booking_id': bookingId};

    try {
      // @ts-ignore
      const join = await PlayerBooking.firstOrCreate(searchPayload, savePayload);
      return response.json({
        response_code: "00",
        response_message: "Berhasil Join Booking",
        join
      });
    } catch (errors) {
      return response.status(400).json({
        response_code: "01",
        response_message: "Booking tidak ditemukan"
      });
    }
  }

  public async unjoinBooking ({response, auth, params}: HttpContextContract) {
    const playerId = auth.user?.id;
    const bookingId = params['id'];

    try {
      await PlayerBooking.query()
        // @ts-ignore
        .where('user_id', playerId)
        .andWhere('booking_id', bookingId)
        .firstOrFail();

      await PlayerBooking.query()
        // @ts-ignore
        .where('user_id', playerId)
        .andWhere('booking_id', bookingId)
        .delete();

      return response.status(200).json({
        response_code: "00",
        response_message: "Berhasil Unjoin Booking",
      });
    } catch (error) {
      return response.status(400).json({
        response_code: "01",
        response_message: "Unjoin gagal, user dan booking tidak ditemukan"
      })
    }
  }

  public async show ({response, params}: HttpContextContract) {
    try {
      let data = await Booking.query()
        .preload('players', (query: ManyToManyQueryBuilder) => {
          query.select(['id', 'full_name', 'email'])
        })
        .select(['id', 'field_id', 'play_date_start', 'play_date_finish', 'user_id'])
        .withCount('players')
        .where('id', params.id)
        .firstOrFail();

      data.$original['players_count'] = data.$extras['players_count'];
      data.$original['players'] = data.$preloaded['players'];

      return response.json({
        response_code: "00",
        response_message: "Berhasil get data booking by id",
        data: data.$original
      });
    } catch (errors) {
      return response.status(400).json({
        error_message: errors.message
      })
    }
  }

  public async destroy ({response, auth, params}: HttpContextContract) {
    const bookingId = params.id;
    const userId = auth.user?.id;

    try {
      // @ts-ignore
      const booking = await Booking.query().where('id', bookingId).andWhere('user_id', userId).firstOrFail();
      await booking.delete();

      return response.status(200).json({
        response_code: "00",
        response_message: "Booking Deleted"
      })
    } catch (error) {
      return response.status(400).json({
        response_code: "01",
        response_message: error.message
      })
    }
  }

  public async schedules ({response, auth}) {
    const userId = auth.user?.id;
    const userName = auth.user?.fullName;

    console.log(userName);
    const books = await Booking.query().preload('players', (query) => {
      query.where('id', userId);
    }).select('id', 'field_id', 'play_date_start', 'play_date_finish');

    const schedules = [];

    for (let i = 0; i < books.length; i++) {
      const dataBooking = books[i]?.$original;
      // @ts-ignore
      if (books[i].$preloaded.players?.length !== 0) {
        // @ts-ignore
        schedules.push(dataBooking);
      }
    }

    return response.status(200).json({
      response_code: "00",
      response_message: "Schedules Fetched",
      name: userName,
      schedules
    });
  }
}