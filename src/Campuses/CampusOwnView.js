import React from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store';
import { Link } from 'react-router-dom';

const CampusOwnView = ({ campus, studentsEnrolled, history, updateStudent, campuses }) => {
    const length = campuses.length;
    return (
        <div className='main'>
            <div>
                <hr />
                <h2><button className='go-back' onClick={ () => history.push('/campuses')}>← Go Back</button>{ campus.name }<button className='go-next' disabled={campus.id===length} onClick={ () => history.push(`/campuses/${campus.id+1}`)}>Next →</button></h2>
                <hr />
                <img src={ campus.imageUrl } />
                <div className='details'>
                    <p>Name: { campus.name }</p>
                    <p>Address: { campus.address }</p>
                    <p>Description: { campus.description }</p>
                </div>
                <hr />
            </div>
            <table className='table'>
                <tbody>
                    <tr>
                        <th>STUDENTS CURRENTLY REGISTERED: {studentsEnrolled.length}</th>
                        <th>UNREGISTER</th>
                    </tr>
                    {studentsEnrolled.length ? studentsEnrolled.map(studentEnrolled => {
                        return (
                            <tr key={ studentEnrolled.id }>
                                <td><Link to={`/students/${studentEnrolled.id}`}>{ studentEnrolled.fullName }</Link></td>
                                <td><button className='remove' onClick={ () => updateStudent(studentEnrolled,studentEnrolled.id) }>Remove</button></td>
                            </tr>
                        )
                    }):'There are no students currently enrolled at this campus.'}
                </tbody>
            </table>
        </div>
    )
};
const mapState = (state, { match }) => {
    const campus = state.campuses.find(campus => campus.id === match.params.id*1) || {};
    const studentsEnrolled = state.students.filter(student => student.campusId*1 === match.params.id*1);
    return {
        campus,
        studentsEnrolled,
        campuses: state.campuses
    }
};
const mapDispatch = dispatch => {
    return {
        updateStudent: (studentEnrolled, id) => {
            studentEnrolled.campusId = '';
            dispatch(updateStudent(studentEnrolled, id))
        }
    }
};
export default connect(mapState, mapDispatch)(CampusOwnView);