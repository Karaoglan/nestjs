import { IsDefined } from "class-validator";

export class UserLoginResDto {
	@IsDefined() readonly token: string;
}