import { IsEmail, IsDefined, Length } from 'class-validator';

export class ParameterItemDto {
  readonly key?: String;
  readonly value?: String;

}