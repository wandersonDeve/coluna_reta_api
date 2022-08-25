import { UseGuards, Controller, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { LoggedUser } from "src/modules/auth/decorator/logged-user.decorator";
import { CreateConsultationDto } from "./dto/create-consultation.dto";
import { CreateConsultationService } from "./services";

@ApiTags('Consultation')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('consultation')
export class ConsultationController {
  constructor(
    private createConsultationService: CreateConsultationService,
  ) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Create a new consultation for student - (FOR USERS).',
  })
  async createConsultation(@LoggedUser() user: User, @Body() data: CreateConsultationDto) {
    return this.createConsultationService.execute(data);
  }
}