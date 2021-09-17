import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';

enum fieldType {"futsal", "mini soccer", "basketball"};

export default class FieldsController {
    async index({ response }: HttpContextContract) {
        const fields = await Database.query().select('*').from('fields')
        return response.status(200).json({
            data: fields
        })
    }

    async store({ request, response }: HttpContextContract) {
        let validate = schema.create({
            name: schema.string(),
            type: schema.number(),
            venue_id: schema.number()
        })
        let validated = await request.validate({
            schema: validate
        })
        let validatedResult = {
            name: validated.name,
            type: fieldType[validated.type],
            venue_id: validated.venue_id
        }
        await Database
            .insertQuery()
            .table('fields')
            .insert(validatedResult)
        return response.status(200).json({
            data: validatedResult
        })
    }

    async show({ response, params }: HttpContextContract) {
        let id = params.id
        const venue = await Database.query().select('*').from('fields').where('id', id)
        return response.status(200).json({
            data: venue
        })
    }

    async update({ request, response, params } : HttpContextContract) {
        let validate = schema.create({
            name: schema.string(),
            type: schema.number(),
            venue_id: schema.number()
        })
        let validated = await request.validate({
            schema: validate
        })
        let validatedResult = {
            name: validated.name,
            type: fieldType[validated.type],
            venue_id: validated.venue_id
        }
        await Database
            .from('fields')
            .where('id', params.id)
            .update({ 
                name: validatedResult.name,
                type: validatedResult.type,
                venue_id: validatedResult.venue_id
            })
        return response.status(200).json({
            message: "OK",
            data: validatedResult
        })
    }

    async destroy({ response, params } : HttpContextContract) {
        await Database
            .from('fields')
            .where('id', params.id)
            .delete()
        return response.status(200).json({
            message: "Delete success"
        })
    }
}
