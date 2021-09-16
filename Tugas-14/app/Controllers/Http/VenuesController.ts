import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VenueValidator from 'App/Validators/VenueValidator'

export default class VenuesController {
    public async store ({request, response}: HttpContextContract) {
        let nama = request.input('nama');
        let alamat  = request.input('alamat');
        let phone = request.input('phone');
    
        await request.validate(VenueValidator);
    
        return response.status(201).json({
          id: 1,
          nama,
          alamat,
          phone
        });
    }
}
