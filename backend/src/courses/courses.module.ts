import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import Review from './reviews.entity';
import Course from './courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Review])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
