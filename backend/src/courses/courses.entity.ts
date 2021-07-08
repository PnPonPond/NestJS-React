import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { count } from 'console';

@Entity()
export class Course {
  @ObjectIdColumn()
  id?: ObjectId;

  @Column()
  number: string;

  @Column()
  title: string;
}

export default Course;
