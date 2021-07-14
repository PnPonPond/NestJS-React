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

  const [newReviewComment, setnewReviewComment] = useState<string>("");
  const [newReviewScore, setnewReviewScore] = useState<number>(1);
  const fetchReviews = () => {
    if (course.id) {
      CoursesService.fetchReviews(course.id).then((reviews) => {
        setreviews(reviews);
        setreviewsVisible(true);
      });
    }
  };

  const handleReviewsVisibleToggle = () => {
    if (!reviewsVisible) {
      fetchReviews();
      setreviewsVisible(true);
    } else {
      setreviewsVisible(false);
    }
  };

  const clearNewReviewForm = () => {
    setnewReviewComment("");
    setnewReviewScore(1);
  };

  const handleNewReviewSave = () => {
    const newReview: Review = {
      comment: newReviewComment,
      score: newReviewScore,
    };
    if (course.id) {
      CoursesService.createReview(newReview, course.id).then(
        (savedNewReview) => {
          if (savedNewReview) {
            fetchReviews();
            clearNewReviewForm();
          }
        }
      );
    }
  };

  const newReviewScoreOption = [1, 2, 3, 4, 5];
  return (
    <li className="course-item">
      {course.number} - {course.title}
      <button onClick={handleReviewsVisibleToggle}>
        {reviewsVisible ? "hide reviews" : "show reviews"}
      </button>
      {reviewsVisible && (
        <div>
          <ul>
            {reviews.map((review) => (
              <li>
                {review.comment} ({review.score})
              </li>
            ))}
            {reviews.length === 0 && <li>No reviews</li>}
          </ul>
          <b>New Form : </b>
          <br />
          Comments: &nbsp;
          <input
            value={newReviewComment}
            onChange={(e) => {
              setnewReviewComment(e.target.value);
            }}
          />
          &nbsp; Score : &nbsp;
          <select
            value={newReviewScore}
            onChange={(e) => {
              setnewReviewScore(parseInt(e.target.value, 10));
            }}>
            {newReviewScoreOption.map((item)=>(
              <option value={item}>{item}</option>
            ))}  
            </select>{" "}
          &nbsp;
          <button onClick={handleNewReviewSave}>Save</button>
        </div>
      )}
    </li>
  );
};

export default CourseItem;
