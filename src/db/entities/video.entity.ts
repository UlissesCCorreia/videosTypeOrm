import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'video' })
export class VideoEntity {
  @PrimaryGeneratedColumn('identity')
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'int' })
  recommendedage: number;
}
