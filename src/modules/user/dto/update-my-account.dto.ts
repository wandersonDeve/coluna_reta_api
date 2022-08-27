import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class UpdateMyAccountDto {
  @IsString()
  @IsOptional()
  @Length(3, 45)
  @ApiProperty({
    description: 'The name of the user.',
    example: 'Erik Magnus',
  })
  name: string;

  @IsEmail()
  @IsOptional()
  @Length(5, 45)
  @ApiProperty({
    description: 'The email of the user.',
    example: 'campo@colunareta4.com',
  })
  email: string;
}
