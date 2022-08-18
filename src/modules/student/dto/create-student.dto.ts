import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';
import { Student } from './../entities/student.entity';

export class CreateStudentDto extends Student {
  @IsString()
  @IsNotEmpty()
  @Length(3, 45)
  @ApiProperty({
    description: `student's name.`,
    example: 'Saitama',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `student's date of birth.`,
    example: '03/007/2009',
  })
  birth_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `student's phone number.`,
    example: '(55) 11 99999 9999',
  })
  phone: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Institution to which the student belongs.',
    example: 1,
  })
  institution_id?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: ' student address.',
    example: 1,
  })
  address_id?: number;
}
