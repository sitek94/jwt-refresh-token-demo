import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

import { Match } from '../../common/decorators/match.decorator'

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string
}
