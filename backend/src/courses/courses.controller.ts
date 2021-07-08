import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './courses.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import Review from './reviews.entity';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}
  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Post()
  async create(@Body() CreateCourseDto: CreateCourseDto) {
    if (
      CreateCourseDto.number !== undefined &&
      CreateCourseDto.title !== undefined
    ) {
      const newCourse = this.coursesService.create(CreateCourseDto);
      return newCourse;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':courseId/Reviews')
  async findAllReviews(@Param('courseId') courseId: string): Promise<Review[]> {
    return this.coursesService.findAllReviews(courseId);
  }
}
