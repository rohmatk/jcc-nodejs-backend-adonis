import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';

export default class GenresController {
    async index({ response }: HttpContextContract) {
        const genres = await Database.query().select('*').from('genres')
        return response.status(200).json({
            data: genres
        })
    }
    async store({ request, response }: HttpContextContract) {
        let validate = schema.create({
            name: schema.string()
        })
        let validated = await request.validate({
            schema: validate
        })
        await Database
            .insertQuery()
            .table('genres')
            .insert(validated)
        return response.status(200).json({
            data: validated
        })
    }
    async show({ response, params }: HttpContextContract) {
        let id = params.id
        const genres = await Database.query().select('*').from('genres').where('id', id)
        const movies = await Database.query().select('*').from('movies').where('genre_id', id)
        return response.status(200).json({
            id: genres[0].id,
            name: genres[0].name,
            movies: movies
        })
    }
    async update({ request, response, params } : HttpContextContract) {
        let validate = schema.create({
            name: schema.string()
        })
        let validated = await request.validate({
            schema: validate
        })
        await Database
            .from('genres')
            .where('id', params.id)
            .update({
                name: validated.name
            })
        return response.status(200).json({
            message: "OK",
            data: validated
        })
    }
    async destroy({ response, params } : HttpContextContract) {
        await Database
            .from('genres')
            .where('id', params.id)
            .delete()
        return response.status(200).json({
            message: "Delete success"
        })
    }
}
