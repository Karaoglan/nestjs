import { IsDefined } from "class-validator";

export class UserLoginDto {
	@IsDefined() readonly tckn: string;
	@IsDefined() readonly password: string;
}