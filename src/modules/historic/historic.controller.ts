import { UseGuards, Controller, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { LoggedUser } from "src/modules/auth/decorator/logged-user.decorator";
import { CreateHistoricDto } from "./dto/create-historic.dto";
import { CreateHistoricService } from "./services";

@ApiTags('Historic')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('historic')
export class HistoricController {
  constructor(
    private createhistoricService: CreateHistoricService,
  ) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Create a historic for student - (FOR USERS).',
  })
  async createHistoric(@LoggedUser() user: User, @Body() data: CreateHistoricDto) {
    return this.createhistoricService.execute(data);
  }
}