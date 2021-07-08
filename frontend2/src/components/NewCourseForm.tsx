import React from "react";
import { useState } from "react";
import { Course } from "../interfaces";
import CoursesService from "../services/CourseService";

type NewCourseFromProps = {
  onNewCourseCreated?: (newCourse: Course) => void;
};

const NewCourseFrom = (props: NewCourseFromProps) => {
  const [newCourseNumber, setNewCourseNumber] = useState<string>("");
  const [newCourseTitle, setNewCourseTitle] = useState<string>("");
  const handleCourseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCourseNumber(e.target.value);
  };
  const handleCourseTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCourseTitle(e.target.value);
  };
  const handleSave = () => {
    const newCourse = {
      number: newCourseNumber,
      title: newCourseTitle,
    };

    CoursesService.createCourse(newCourse).then((savedNewCourse) => {
      if (savedNewCourse !== null) {
        if (props.onNewCourseCreated !== undefined) {
          props.onNewCourseCreated(savedNewCourse);
        }
      } else {
        alert('Saved error');
      }
    });
  };
  return (
    <div>
      <br />
      Number :
      <input value={newCourseNumber} onChange={handleCourseNumberChange} />
      <br />
      Title :
      <input value={newCourseTitle} onChange={handleCourseTitleChange} />
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NewCourseFrom;
