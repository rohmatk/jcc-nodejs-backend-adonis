import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';

export default class MoviesController {
    async index({ response }: HttpContextContract) {
        const movies = await Database.query().select('*').from('movies')
        return response.status(200).json({
            data: movies
        })
    }

    async store({ request, response }: HttpContextContract) {
        let validate = schema.create({
            title: schema.string(),
            resume: schema.string(),
            release_date: schema.string(),
            genre_id: schema.number()
        })
        let validated = await request.validate({
            schema: validate
        })
        await Database
            .insertQuery()
            .table('movies')
            .insert(validated)
        return response.status(200).json({
            data: validated
        })
    }

    async show({ response, params }: HttpContextContract) {
        let id = params.id
        const movie = await Database.query().select('*').from('movies').where('id', id)
        return response.status(200).json({
            data: movie
        })
    }

    async update({ request, response, params } : HttpContextContract) {
        let validate = schema.create({
            title: schema.string(),
            resume: schema.string(),
            release_date: schema.string(),
            genre_id: schema.number()
        })
        let validated = await request.validate({
            schema: validate
        })
        await Database
            .from('movies')
            .where('id', params.id)
            .update({
                title: validated.title,
                resume: validated.resume,
                release_date: validated.release_date,
                genre_id: validated.genre_id
            })
        return response.status(200).json({
            message: "OK",
            data: validated
        })
    }

    async destroy({ response, params } : HttpContextContract) {
        await Database
            .from('movies')
            .where('id', params.id)
            .delete()
        return response.status(200).json({
            message: "Delete success"
        })
    }
}
