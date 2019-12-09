import { IsEmail, IsString, IsDefined, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

	@ApiProperty()
	@IsDefined()
	readonly tckn: string;

	//readonly id: string;

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

	status: string;
	readonly phoneNumber: string;
	
	@IsDefined()
	readonly companyId: string;

	password?: string;

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
