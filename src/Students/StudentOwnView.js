import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentOwnView = ({ campus, student, history, students }) => {
    const length = students.length;
    console.log(length)
    return (
        <div className='main'>
            <hr />
            <h2><button className='go-back' onClick={ () => history.push('/students')}>← Go Back</button>{ student.fullName }<button className='go-next'  disabled={student.id === length} onClick={ () => history.push(`/students/${student.id+1}`)}>Next →</button></h2>
            <hr />
            <div>
                <img src={ student.imageUrl } />
                <h3>First Name: { student.firstName }</h3>
                <h3>Last Name: { student.lastName }</h3>
                <h3>Email: { student.email }</h3>
                <h3>GPA: { student.gpa }</h3>
                <h3>Campus:  { campus.name ? <Link to={`/campuses/${campus.id}`}>{ campus.name }</Link> : 'Not Enrolled' }</h3>
            </div>
            <hr />
        </div>
    )
};
const mapState = (state, { match }) => {
    const student = state.students.find(student => student.id === match.params.id*1) || {};
    const campus = state.campuses.find(campus => campus.id === student.campusId*1) || {};
    return {
        campuses: state.campuses,
        students: state.students,
        student,
        campus
    }
};
export default connect(mapState)(StudentOwnView);