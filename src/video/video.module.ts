import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoEntity } from 'src/db/entities/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [VideoController],
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  exports: [VideoService, TypeOrmModule.forFeature([VideoEntity])],
  providers: [VideoService]
})
export class VideoModule {}
