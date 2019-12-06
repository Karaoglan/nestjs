import { IsEmail, IsString, IsDefined, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

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

	@IsDefined()
	readonly password: string;
	
	@IsString()
	@IsDefined()
	readonly eth_address: string;

	@IsEmail(undefined, {
    message: "Email address must be valid mail"
	})
	@IsDefined()
	@MaxLength(100, {
		message: "email is too long"
	})
	readonly email: string;
}