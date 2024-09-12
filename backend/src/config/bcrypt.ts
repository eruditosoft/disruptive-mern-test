import { compareSync, hashSync } from "bcryptjs";


export class BcryptAdpater {
  private constructor(){
    
  }
  static hash( key: string ): string {
    return hashSync( key );
  }
  static compare( key: string, hash: string ): boolean {
    return compareSync( key, hash );
  }
}
