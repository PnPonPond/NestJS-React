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
import { CreateReviewDto } from './dto/create-review.dto';
import { ObjectID } from "mongodb"; 
import { ParseObjectIdPipe } from '../common/pipes';

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
  async findAllReviews(@Param('courseId',ParseObjectIdPipe) courseId: ObjectID): Promise<Review[]> {
    return this.coursesService.findAllReviews(courseId);
  }

  @Post(':courseId/Reviews')
  async createReivew(
    @Param('courseId',ParseObjectIdPipe) courseId: ObjectID,
    @Body() CreateReviewDto: CreateReviewDto,
  ) {
    if (
      CreateReviewDto.comment !== undefined &&
      CreateReviewDto.score !== undefined
    ) {
      CreateReviewDto.courseid = courseId;
      const newReview = this.coursesService.createReview(CreateReviewDto);
      return newReview;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
