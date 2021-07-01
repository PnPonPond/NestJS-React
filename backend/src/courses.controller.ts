import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(): any {
    return { message: 'goodnight' };
  }
}
