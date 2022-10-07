import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store';

const RegisterStudents = ({ studentsToEnroll, students, campus, updateStudent, match }) => {
    const id = match.params.id*1;
    const [studentId, setStudent] = useState('');
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(studentId){
            const itemCount = students.filter(student => student.campusId === id);
            if(itemCount.length !== 20){
                const registerStudent = students.find(student => student.id === studentId*1);
                registerStudent.campusId = campus.id;
                updateStudent(registerStudent, registerStudent.id);
            } else {
                alert("Campus has reached maximum amount of students to register. Registration is now closed.")
            }
        } else {
            alert('Must select a student to register.');
        }
    }
    return (
        <div className='side'>
            <h3>REGISTER STUDENTS</h3>
            <form onSubmit={ handleSubmit }>
                <label>Students:
                    <select value={ studentId } name="studentId" onChange={ (e)=> setStudent(e.target.value) }>
                        <option value=''>--select--</option>
                        {
                            studentsToEnroll.map(studentToEnroll => {
                                return (
                                    <option id={ studentToEnroll.id } key={ studentToEnroll.id } value={ studentToEnroll.id }>{ studentToEnroll.fullName }</option>
                                )
                            })
                        }
                    </select>
                </label>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

const mapState = (state, { match }) => {
    const campus = state.campuses.find(campus => campus.id === match.params.id*1);
    const studentsToEnroll = state.students.filter(student => student.campusId === null);
    return {
        studentsToEnroll,
        students: state.students,
        campus
    }
};
const mapDispatch = dispatch => {
    return {
        updateStudent: (registerStudent) => {
            dispatch(updateStudent(registerStudent, registerStudent.id))
        }
    }
};
export default connect(mapState, mapDispatch)(RegisterStudents);