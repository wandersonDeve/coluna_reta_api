import { UseGuards, Controller, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { LoggedUser } from "src/modules/auth/decorator/logged-user.decorator";
import { CreateQueryDto } from "./dto/create-query.dto";
import { CreateQueryService } from "./services";

@ApiTags('Query-Student')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('queryStudent')
export class QueryStudentController {
  constructor(
    private createQueryService: CreateQueryService,
  ) {}

  @Post('/query')
  @ApiOperation({
    summary: 'Create a new query for student - (FOR USERS).',
  })
  async createQuery(@LoggedUser() user: User, @Body() data: CreateQueryDto) {
    return this.createQueryService.execute(data);
  }
}