import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Forwarding } from '../../../modules/historic/utils/fowarding.enum';

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
  
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: `1st image of the student for the field visit.`,
    example: 'https://notortopedia.com.br/wp-content/uploads/2022/02/osteomielite-conheca-as-causas-e-sintomas-not-ortopedia-blog_1.jpg',
  })
  image_1: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `2st image of the student for the field visit`,
    example: 'https://www.hong.com.br/wp-content/uploads/2016/06/escoliose-o-que-e.jpg',
  })
  image_2: string;
}
