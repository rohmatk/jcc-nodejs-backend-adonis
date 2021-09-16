import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookingValidator from "App/Validators/BookingValidator"

export default class BookingsController {
    public async store ({request, response}: HttpContextContract) {

        let nama = request.input('nama');
        let nama_venue = request.input('nama_venue')
        let play_date = request.input('play_date')
    
        await request.validate(BookingValidator)
    
        return response.status(201).json({
          id: 1,
          nama,
          nama_venue,
          play_date
        })
    
    }
}
