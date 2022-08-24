import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsNotEmpty, IsString, Length, IsDate, IsDateString } from "class-validator"

export class CreateQueryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: `Student's id.`,
    example: 1,
  })
  student_id: number | null

  @IsString()
  @IsNotEmpty()
  @Length(0, 520)
  @ApiProperty({
    description: `Query note.`,
    example: 'A abhkcsbakcbsehajcsknelknfmdsn ef',
  })
  note: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Date the Query.`,
    example: '23/08/2022',
  })
  date: string
}