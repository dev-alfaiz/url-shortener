import {
  IsEmail,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @Length(2,50)
  firstName: string;

  @IsString()
  @Length(2,50)
  lastName: string;

}