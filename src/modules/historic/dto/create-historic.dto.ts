import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Forwarding } from 'src/modules/historic/utils/fowarding.enum';

export class CreateHistoricDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: `Student's id.`,
    example: 1,
  })
  student_id: number;

  @IsEnum(Forwarding)
  @IsOptional()
  @ApiProperty({
    description: `Referral of student.`,
    example: Forwarding.PHYSIOTHERAPY,
  })
  forwarding?: Forwarding;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Cobb angle for student.`,
    example: '60°',
  })
  cobb_angle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Date Return.`,
    example: '03/09/2022',
  })
  return_date: string;
}
