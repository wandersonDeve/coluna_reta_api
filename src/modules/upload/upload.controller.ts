import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './services/upload-image.service';

@Controller('upload')
export class UploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    const response = await this.fileUploadService.upload(file);

    if (response.Location) {
      return response.Location;
    }

    return response;
  }
}
