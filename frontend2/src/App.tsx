import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { Course } from "./interfaces";
import CourseItem from "./components/CourseItem";
import NewCourseFrom from "./components/NewCourseForm";
import CoursesService from "./services/CourseService";

const App = () => {
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
    <div className="App">
      <ul>
        {courses.map((item) => (
          <CourseItem key={item.id} course={item} />
          // <li key={item.id}>{item.number} - {item.title}</li>
        ))}
        <button onClick={toggleFormVisible}>New Course</button>
        {formVisible && (
          <NewCourseFrom onNewCourseCreated={handleNewCourseCreated} />
        )}
      </ul>
    </div>
  );
};

export default App;
