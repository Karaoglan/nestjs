import { IsEmail } from 'class-validator';

export class UserDto {
	readonly tckn: string;
	readonly password: string;
	readonly rememberMe?: boolean;

	@IsEmail(undefined, {
    message: "Email address must be valid mail"
	})
	readonly email: string;
}