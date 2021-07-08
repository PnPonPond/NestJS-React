import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Review {
  @ObjectIdColumn()
  id?: ObjectId;

  @Column()
  comment: string;

  @Column()
  score: number;

  @Column()
  courseid: ObjectId;
}

export default Review;
