import { PageMetaParametersDTO } from './pageMetaParameters.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  @ApiProperty()
  readonly orderByColumn: string;

  constructor({ pageOptionsDto, itemCount }: PageMetaParametersDTO) {
    this.orderByColumn = pageOptionsDto.orderByColumn;
    this.page = pageOptionsDto.page;
    this.take = +pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
