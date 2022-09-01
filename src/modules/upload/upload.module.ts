import { Module } from '@nestjs/common';
import { FileUploadService } from './services/upload-image.service';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  providers: [FileUploadService],
})
export class UploadModule {}
