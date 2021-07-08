import React from "react";
import { Course, Review } from "../interfaces";
import { useState } from "react";
import CoursesService from "../services/CourseService";

type CourseItemProps = {
  course: Course;
};

const CourseItem = (props: CourseItemProps) => {
  const course: Course = props.course;

  const [reviewsVisible, setreviewsVisible] = useState<Boolean>(false);
  const [reviews, setreviews] = useState<Review[]>([]);
  const handleReviewsVisibleToggle = () => {
    if (!reviewsVisible) {
      if (course.id) {
        CoursesService.fetchReviews(course.id).then((reviews) => {
          setreviews(reviews);
          setreviewsVisible(true);
        });
      } else {
        setreviewsVisible(true);
      }
    } else {
      setreviewsVisible(false);
    }
  };

  return (
    <li className="course-item">
      {course.number} - {course.title}
      <button onClick={handleReviewsVisibleToggle}>
        {reviewsVisible ? "hide reviews" : "show reviews"}
      </button>
      {reviewsVisible && (
        <ul>
          {reviews.map((review) => (
            <li>
              {review.comment} ({review.score})
            </li>
          ))}
          {reviews.length === 0 && <li>No reviews</li>}
        </ul>
      )}
    </li>
  );
};

export default CourseItem;
