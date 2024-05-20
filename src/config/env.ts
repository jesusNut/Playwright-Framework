import { decrypt } from "../utils/CryptojsUtil";

export class env {
  public static readonly BASE_URL = decrypt(process.env.URL!);
  public static readonly USERNAME = decrypt(process.env.USER!);
  public static readonly PASSWORD = decrypt(process.env.PASSWORD!);
}
