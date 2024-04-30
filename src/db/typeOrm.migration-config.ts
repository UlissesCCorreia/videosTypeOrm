import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { VideoEntity } from './entities/video.entity';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@Ulisses040202',
  database: 'videosOrm',
  entities: [UserEntity, VideoEntity],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
};

export default new DataSource(dataSourceOptions);
