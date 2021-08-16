import { IsEmail, IsNotEmpty } from "class-validator";
import { ILogin } from "./auth.interface";

export class LoginValidator {
  constructor(data: ILogin) {
    this.email = data.email;
    this.password = data.password;
  }

  @IsEmail({}, { message: "Email không đúng" })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  password: string;
}
