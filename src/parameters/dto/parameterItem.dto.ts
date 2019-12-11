import { IsEmail, IsDefined, Length } from 'class-validator';

export class ParameterItemDto {
  readonly paramId? : String;
  readonly key?: String;
  readonly value?: String;
}