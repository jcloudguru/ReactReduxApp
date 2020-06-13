import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  // This is called a Class Field. No need of Constructors
  // Again commented this, but NOT deleteing: to use REDUX-ASYNC feature
  // state = {
  //   course: {
  //     title: "",
  //   },
  // };

  // commenting to try REDUX-ASYNC
  // handleChange = (event) => {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course });
  // };

  // This is called the CLASS Filed.
  // This will work, because the ARROW Functions inherit the binding context of their enclosing scope
  // commenting to try REDUX-ASYNC
  // handleSubmit = (event) => {
  //   // This tells the Browser to prevent the default behaviour - it will not post back.
  //   event.preventDefault();
  //   this.props.actions.createCourse(this.state.course);
  // };

  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    // state = {
    //   redirectToAddCoursePage: false,
    // };

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });

      if (authors.length === 0) {
        actions.loadAuthors().catch((error) => {
          alert("Loading authors failed" + error);
        });
      }
    }
  }

  // Without using ASYNC keyword - concept of ASYCN/AWAIT - like PROMISE
  //handleDeleteCourse = (course) => { - PROMISE BAsed example
  handleDeleteCourse = async (course) => {
    // ASYNC based.
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

// This function determines what state is passed to our components via props

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course)),
    //createCourse: bindActionCreators(courseActions, dispatch),
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

// "mapDispatchToProps" - This lets us declare what actions to pass to our components on  props.

// "connect" function connects our components to REDUX - these are called Container components
//const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
//export default connectedStateAndProps(CoursePage);
//export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
//NOTE:  omitting "mapDispatchToProps" for now: When we omit "mapDispatchToProps" our components gets a dispatch Props automatically.
// >> ONE WAYS IS THIS: Commented this line, and using below
//export default connect(mapStateToProps)(CoursesPage);

// ANOTHER WAY IS THIS - also using the 2nd argument.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
