import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import {DateTime} from "luxon";

export default class Verify {
  public async handle ({auth, response, request}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    let dataVerifiedAt: any | DateTime = '';
    if (request.input('email')) {
      let email = request.input('email');
      const dataUser = await User.findBy('email', email);

      dataVerifiedAt = dataUser?.verifiedAt;
    }

    let user = auth.user?.verifiedAt;

    if (user || dataVerifiedAt) {
      await next();
    } else {
      return response.unauthorized({
        response_code: "01",
        response_message: "Email Unverified, please verify"
      });
    }
  }
}