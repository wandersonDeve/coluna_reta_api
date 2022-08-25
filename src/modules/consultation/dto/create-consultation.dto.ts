import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Forwarding } from 'src/modules/consultation/utils/fowarding.enum';

export class CreateConsultationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: `Student's id.`,
    example: 1,
  })
  student_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Consultation date.`,
    example: '23/08/2022',
  })
  consultation_date: string;

  @IsEnum(Forwarding)
  @IsNotEmpty()
  @ApiProperty({
    description: `Referral of student consultation.`,
    example: Forwarding.PHYSIOTHERAPY,
  })
  forwarding: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Cobb angle for student consultation.`,
    example: '60°',
  })
  cobb_angle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Date Return the consultation.`,
    example: '03/09/2022',
  })
  return_date: string;
}
