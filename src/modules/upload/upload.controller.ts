import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { FileUploadService } from './services/upload-image.service';

@ApiTags('Upload')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload images',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@LoggedUser() user: User, @UploadedFile() file) {
    console.log(file);
    const response = await this.fileUploadService.upload(file);

    if (response.Location) {
      return response.Location;
    }

    return response;
  }
}
