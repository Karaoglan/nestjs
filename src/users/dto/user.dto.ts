import { IsEmail, IsString, IsDefined, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

	@ApiProperty()
	readonly id: string;

	@ApiProperty()
	@IsDefined()
	readonly tckn: string;

	@MaxLength(100, {
		message: "name is too long"
	})
	@IsDefined()
	readonly name: string;

	@MaxLength(100, {
		message: "surname is too long"
	})
	@IsDefined()
	readonly surname: string;

	readonly status: string;
	readonly phoneNumber: string;
	
	@IsDefined()
	readonly companyId: string;

	readonly password?: string;

	readonly ethAddress?: string;

	@IsEmail(undefined, {
    message: "Email address must be valid mail"
	})
	@IsDefined()
	@MaxLength(100, {
		message: "email is too long"
	})
	readonly email: string;
}
