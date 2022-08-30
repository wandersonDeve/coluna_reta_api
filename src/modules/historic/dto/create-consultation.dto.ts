import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConsultationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: `Student's id.`,
    example: 1,
  })
  student_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: `Student history id.`,
    example: 1,
  })
  historic_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Name the clinic.`,
    example: 'Santa Helena',
  })
  clinic: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Consultation Date of the consultation.`,
    example: '05/09/2022',
  })
  consultation_date: string;
}
