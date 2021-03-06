import React from "react";
import { Course } from "../interfaces";
import CoursesService from "../services/CourseService";
import { Formik, Form, Field, ErrorMessage } from "formik";

type NewCourseFromProps = {
  onNewCourseCreated?: (newCourse: Course) => void;
};

const NewCourseFrom = (props: NewCourseFromProps) => {
  return (
    <div>
      <Formik
        initialValues={{ newCourseNumber: "", newCourseTitle: "" }}
        validate={(values)=>{
          const errors:any = {};

          if (values.newCourseTitle === ''){
            errors.newCourseTitle = 'Course title is required';
          }
          if (values.newCourseNumber === ''){
            errors.newCourseNumber = 'Course number is required';
          }else if (!/^[0-9]+$/.test(values.newCourseNumber)){
            errors.newCourseNumber = 'Course number format error';
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          const newCourse = {
            number: values.newCourseNumber,
            title: values.newCourseTitle,
          };
      
          CoursesService.createCourse(newCourse).then((savedNewCourse) => {
            if (savedNewCourse !== null) {
              if (props.onNewCourseCreated !== undefined) {
                props.onNewCourseCreated(savedNewCourse);
              }
            } else {
              alert("Saved error");
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            Number : <Field type="input" name="newCourseNumber" />
            <ErrorMessage name="newCourseNumber" component={"div"} />
            <br />
            Title : <Field type="input" name="newCourseTitle" />
            <ErrorMessage name="newCourseTitle" component={"div"} />
            <br />
            <button disabled={isSubmitting}>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewCourseFrom;
