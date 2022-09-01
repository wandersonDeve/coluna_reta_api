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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Clinic name for consultation.`,
    example: 'Santa Helena',
  })
  clinic: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Date the consultation will take place.`,
    example: '05/09/2022',
  })
  consultation_date: string;
}
