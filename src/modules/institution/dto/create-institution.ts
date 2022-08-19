import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateInstitutionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the Institution.',
    example: 'UNIP',
  })
  name: string
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The phone number of the Institution.',
    example: '(11) 2090-4500',
  })
  phone_number: string

  @IsNumber()
  @ApiProperty({
    description: 'Institution address id.',
    example: 1,
  })
  address_id?: number | null
}