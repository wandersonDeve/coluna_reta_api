import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FileUploadService } from './services/upload-image.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UploadController],
  providers: [FileUploadService],
})
export class UploadModule {}
