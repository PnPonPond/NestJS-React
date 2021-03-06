import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateReviewDto } from './dto/create-review.dto';

import Review from './reviews.entity';
import Course from './courses.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}
  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }
  async create(CreateCourseDto: CreateCourseDto) {
    return this.coursesRepository.save(CreateCourseDto);
  }

  async findAllReviews(courseId: ObjectID): Promise<Review[]> {
    return this.reviewsRepository.find({ where: { courseid: courseId}});
  }

  async createReview(CreateReviewDto: CreateReviewDto) {
    return this.reviewsRepository.save(CreateReviewDto);
  }
}
