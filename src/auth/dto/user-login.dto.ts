export class UserLoginDto {
	readonly tckn: string;
	readonly password: string;
  readonly rememberMe?: boolean;
  readonly token?: string;
}