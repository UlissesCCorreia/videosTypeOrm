import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoDto } from './video.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videosService: VideoService) {}

  @Post()
  async create(@Body() video: VideoDto): Promise<VideoDto> {
    return await this.videosService.create(video);
  }

  @Get('/:videoName')
  async findByName(@Param('videoName') videoName: string): Promise<VideoDto> {
    return this.videosService.findByName(videoName);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<VideoDto[]> {
    return this.videosService.findAll();
  }

  @Put()
  async update(@Body() video: VideoDto): Promise<VideoDto> {
    return this.videosService.update(video);
  }
}
