import { Injectable } from '@nestjs/common';
import { Course } from './interfaces/courses.interface';

@Injectable()
export class CoursesService {
  async findAll(): Promise<Course[]> {
    return [
      { id: '100', number: '110231', title: 'ComPro' },
      { id: '200', number: '110121', title: 'Math3' },
      { id: '300', number: '120771', title: 'Eng' },
    ];
  }
}
