
export default class LoginService {

  static async doLogin( { email }: { email: string; } ): Promise<string> {
    console.log( email );
    return Promise.resolve( email );
  }
}