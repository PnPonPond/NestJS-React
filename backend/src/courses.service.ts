import { Injectable } from '@nestjs/common';
import Course from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}
  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
    // return [
    //   { id: '100', number: '110231', title: 'ComPro' },
    //   { id: '200', number: '110121', title: 'Math3' },
    //   { id: '300', number: '120771', title: 'Eng' },
    // ];
  }
}
