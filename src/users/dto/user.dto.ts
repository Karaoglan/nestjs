import { IsEmail } from 'class-validator';

export class UserDto {
	readonly userId: string;
	readonly username: string;
	readonly password: string;

	@IsEmail(undefined, {
    message: "Email address must be valid mail"
	})
	readonly email: string;
}