import { Profile } from 'src/profile/entities/profile.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 20,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    // length: 5,
  })
  email: string;

  // one to one relationship
  @OneToOne(() => Profile, (profile) => profile.user, {
    // Cascading: khi insert in parent => child will auto insert too
    cascade: ['insert'],
    // return child along with parent when call get (similar to populate)
    // eager: true
  })
  profile?: Profile;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[]

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
