import { IsDate, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProfileDto {
  @IsString({ message: 'First Name should be a string value.' })
  @IsOptional()
  @MinLength(3, {
    message: 'First Name should have a minimum of 3 characters.',
  })
  firstName?: string;

  @IsString({ message: 'Last Name should be a string value.' })
  @IsOptional()
  @MinLength(3, {
    message: 'Last Name should have a minimum of 3 characters.',
  })
  lastName?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;
}
