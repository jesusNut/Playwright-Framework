import { decrypt } from "../utils/CryptojsUtil";

export class env {
  public static readonly BASE_URL = decrypt(process.env.URL!);
  public static readonly USERID = decrypt(process.env.USERID!);
  public static readonly PASSWORD = decrypt(process.env.PASSWORD!);
}
