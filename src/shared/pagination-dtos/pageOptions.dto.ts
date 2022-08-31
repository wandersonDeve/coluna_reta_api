import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../../shared/utils/order.util';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.asc })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.asc;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: 20,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly take?: number = 20;

  @ApiPropertyOptional({ default: 'id' })
  @IsOptional()
  @IsString()
  readonly orderByColumn?: string = 'id';

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
