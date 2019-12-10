import 'rbx/index.css';
import { Button } from "rbx";
import React from 'react';
import { hasConflict, timeParts} from './times'
import { db } from '../../App'

const Course = ({ course, state, user }) => (
  <Button color={ buttonColor(state.selected.includes(course)) }
    onClick={ () => state.toggle(course) }
    onDoubleClick={ user ? () => moveCourse(course) : null }
    disabled={ hasConflict(course, state.selected) }
    >
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </Button>
);

const buttonColor = selected => (
  selected ? 'success' : null
);

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets);
  else moveCourse(course);
};

const saveCourse = (course, meets) => {
  const id = course.id;
  const title = course.title;
  db.child('courses').child(course.id).update({meets, id, title})
    .catch(error => alert(error));
};

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

export { buttonColor, terms, getCourseTerm };
export default Course;
