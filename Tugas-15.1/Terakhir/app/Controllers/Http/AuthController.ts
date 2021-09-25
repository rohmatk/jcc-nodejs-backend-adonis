import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import UserValidator from "App/Validators/UserValidator";
import User from "App/Models/User";

export default class AuthController {
  public async login ({request, auth, response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '3 days',
    });

    return response.status(200).json({
      message: "Login Success",
      token
    })
  }

  public async register ({request, response}: HttpContextContract) {
    let email = request.input('email');
    let password = request.input('password');
    let full_name = request.input('full_name');
    let phone = request.input('phone');

    await request.validate(UserValidator);

    const data = await User.create({
      email, password, full_name, phone
    });

    return response.status(201).json({
      message: "Register Success",
      data
    });

  }
}