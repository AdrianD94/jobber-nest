import { Module } from '@nestjs/common';
import { UploadsController } from './upload.controller';

@Module({
  controllers: [UploadsController],
})
export class UploadModule {}
