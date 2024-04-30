import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VideoDto } from './video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from 'src/db/entities/video.entity';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
//import { hashSync } from 'bcrypt';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  async create(video: VideoDto) {
    const videoToSave: VideoEntity = {
      name: video.name,
      url: video.url,
      recommendedage: video.recommendedage,
    };

    const createdVideo = await this.videoRepository.save(videoToSave);

    return this.mapEntityToDto(createdVideo);
  }

  async findByName(videoName: string): Promise<VideoDto> {
    const foundVideo = await this.videoRepository.findOne({
      where: { name: videoName },
    });

    if (!foundVideo) {
      throw new HttpException(
        `O video com o nome ${videoName} não foi encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundVideo);
  }

  async findAll(): Promise<VideoDto[]> {
    const videosFounded = await this.videoRepository.find();

    return videosFounded.map((video) => {
      return this.mapEntityToDto(video);
    });
  }

  async update(video: VideoDto): Promise<VideoDto> {
    const foundVideo = await this.videoRepository.findOne({
      where: { name: video.name },
    });

    console.log(foundVideo);

    if (!foundVideo) {
      throw new HttpException(
        `O video com o nome ${video.name} não foi encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    foundVideo.name = video.name;
    foundVideo.url = video.url;
    foundVideo.recommendedage = video.recommendedage;

    console.log(foundVideo);

    return await this.videoRepository.save(this.mapEntityToDto(foundVideo));
  }

  private mapEntityToDto(videoEntity: VideoEntity): VideoDto {
    return {
      id: videoEntity.id,
      name: videoEntity.name,
      url: videoEntity.url,
      recommendedage: videoEntity.recommendedage,
    };
  }

  private mapDtoToEntity(videoDto: VideoDto): Partial<VideoEntity> {
    return {
      name: videoDto.name,
      url: videoDto.url,
      recommendedage: videoDto.recommendedage,
    };
  }
}
