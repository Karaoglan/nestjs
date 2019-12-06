import { IsEmail, IsDefined, Length } from 'class-validator';

export class CompanyDto {
  readonly member_code?: Number;

  @IsDefined()
  @Length(3, 10)
  readonly title: string;
	readonly member_type?: string;

	@IsEmail(undefined, {
    message: "Email address must be valid mail"
  })
  readonly email?: string;
  readonly lei_code?: Number;
  readonly trade_reg_office?: String;
  readonly trade_reg_no?: Number;
  readonly trade_reg_date?: Date;
  readonly tax_office?: String;
  readonly tax_no?: Number;
  readonly mernis_no?: Number;
  readonly bank?: String;
  readonly iban?: Number;
  readonly web_page?: String;
  readonly invoice_email?: String;
  readonly phone_number?: Number;
  readonly contact_person?: String;
  readonly address?: String;
}