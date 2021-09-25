import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  public async handle ({auth, response}: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = auth.user?.role;
    // @ts-ignore
    const allow = allowedRoles.indexOf(user);

    if(allow !== -1) {
      await next()
    } else {
      return response.unauthorized({
        response_code: "01",
        response_message: "you are not allowed to access"
      });
    }
  }
}