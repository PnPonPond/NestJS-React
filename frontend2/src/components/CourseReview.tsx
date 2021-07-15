import React from "react";
import { useState, useEffect } from "react";
import { Course } from "../interfaces";
import CourseItem from "./CourseItem";
import NewCourseFrom from "./NewCourseForm";
import CoursesService from "../services/CourseService";

const CourseReview = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formVisible, setFromVisible] = useState<boolean>(false);

  const toggleFormVisible = () => {
    setFromVisible(!formVisible);
  };
  const fetchCourse = () => {
    CoursesService.fetchCourses().then((courses) => {
      setCourses(courses);
    });
  };
  const handleNewCourseCreated = (newCourse: Course) => {
    fetchCourse();
    setFromVisible(false);
  };

  useEffect(() => {
    fetchCourse();
  }, []);
  return (
    <div className="CourseReview">
      <ul>
        {courses.map((item) => (
          <CourseItem key={item.id} course={item} />
        ))}
        <button onClick={toggleFormVisible}>New Course</button>
        {formVisible && (
          <NewCourseFrom onNewCourseCreated={handleNewCourseCreated} />
        )}
      </ul>
    </div>
  );
};

export default CourseReview;
