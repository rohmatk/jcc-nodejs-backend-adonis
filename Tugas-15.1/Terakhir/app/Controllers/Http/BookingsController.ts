import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Booking from "App/Models/Booking";
import Field from "App/Models/Field";
import Venue from "App/Models/Venue";
import {ManyToManyQueryBuilder} from "@adonisjs/lucid/build/src/Orm/Relations/ManyToMany/QueryBuilder";
import PlayerBooking from "App/Models/PlayerBooking";

export default class BookingsController {

  /**
   * @swagger
   * /api/v1/venues/{venue_id}/bookings:
   *   get:
   *     description: Fetching all the bookings from spesific venue
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Bookings
   *     summary: Index Venue's Bookings API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the bookings venue to show
   *     responses:
   *       200:
   *         description: Fetch Success (OK)
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
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

  /**
   * @swagger
   * /api/v1/venues/{venue_id}/bookings:
   *   post:
   *     description: Authenticated user make a booking (only user role authorized)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Bookings
   *     summary: Store Venue's Booking API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the booking's venue to store
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             $ref: '#definitions/Booking'
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#definitions/Booking'
   *     responses:
   *       201:
   *         description: Booking Successfully stored
   *       422:
   *         description: Request Invalid
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
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


  /**
   * @swagger
   * /api/v1/venues/{venue_id}/bookings/{id}:
   *   put:
   *     description: Updating authenticated user's booking (only booking owner (user) authorized)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Bookings
   *     summary: Update Venue's Booking API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the booking's venue to update
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the booking to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             $ref: '#definitions/Booking'
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#definitions/Booking'
   *     responses:
   *       201:
   *         description: Booking Successfully Updated
   *       422:
   *         description: Request Invalid
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
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

  /**
   * @swagger
   * /api/v1/bookings/{id}/join:
   *   post:
   *     description: Auhtenticated user join a booking (only user role authorized)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Bookings
   *     summary: Join Booking API
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of spesific booking to join
   *     responses:
   *       200:
   *         description: Join Success (OK)
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
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

  /**
   * @swagger
   * /api/v1/bookings/{id}/unjoin:
   *   post:
   *     description: Unjoin authenticated user's joined booking (only joined user role authorized)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Bookings
   *     summary: Unjoin Booking API
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of spesific booking to unjoin
   *     responses:
   *       200:
   *         description: Unjoin Success (OK)
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
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

  /**
   * @swagger
   * /api/v1/venues/{venue_id}/bookings/{id}:
   *   get:
   *     description: Fetching spesific booking detail
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Bookings
   *     summary: Show Venue's Booking API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the booking's venue
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of spesific venue's booking to show
   *     responses:
   *       200:
   *         description: Fetch Success (OK)
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
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

  /**
   * @swagger
   * /api/v1/venues/{venue_id}/bookings/{id}:
   *   delete:
   *     description: Deleting certain authenticated user's booking (only booking creator authorized)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Bookings
   *     summary: Delete Venue's Booking API
   *     parameters:
   *       - in: path
   *         name: venue_id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the booking's venue to delete
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: Numeric ID of the booking to delete
   *     responses:
   *       200:
   *         description: Booking Deleted (OK)
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
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

  /**
   * @swagger
   * /api/v1/bookings/schedules:
   *   get:
   *     description: Fetching user authenticated booking schedules (only user role authorized)
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Bookings
   *     summary: Check Booking Schedules API
   *     responses:
   *       200:
   *         description: User Schedules Fetched (OK)
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   * */
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