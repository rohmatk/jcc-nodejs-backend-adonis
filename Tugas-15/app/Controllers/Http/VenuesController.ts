import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';

export default class VenuesController {
    async index({ response }: HttpContextContract) {
        const venues = await Database.query().select('*').from('venues')
        return response.status(200).json({
            data: venues
        })
    }

    async store({ request, response }: HttpContextContract) {
        let validate = schema.create({
            name: schema.string(),
            address: schema.string(),
            phone: schema.string({}, [
                rules.mobile({ locales: ['id-ID'] })
            ])
        })
        let validated = await request.validate({
            schema: validate
        })
        await Database
            .insertQuery()
            .table('venues')
            .insert(validated)
        return response.status(200).json({
            data: validated
        })
    }

    async show({ response, params }: HttpContextContract) {
        let id = params.id
        const venue = await Database.query().select('*').from('venues').where('id', id)
        return response.status(200).json({
            data: venue
        })
    }

    async update({ request, response, params } : HttpContextContract) {
        let validate = schema.create({
            name: schema.string(),
            address: schema.string(),
            phone: schema.string({}, [
                rules.mobile({ locales: ['id-ID'] })
            ])
        })

        let validated = await request.validate({
            schema: validate
        })
        await Database
            .from('venues')
            .where('id', params.id)
            .update({ 
                name: validated.name,
                address: validated.address,
                phone: validated.phone
            })
        return response.status(200).json({
            message: "OK",
            data: validated
        })
    }

    async destroy({ response, params } : HttpContextContract) {
        await Database
            .from('venues')
            .where('id', params.id)
            .delete()
        return response.status(200).json({
            message: "Delete success"
        })
    }
}
