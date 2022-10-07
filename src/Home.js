import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = ({ topCampuses, topRankStudents }) => {
    topCampuses = topCampuses.slice(0,5);
    return (
        <div className='main'>
            <div className='topStudentList'>
                <hr />
                <h2>TOP STUDENT BOARD</h2>
                <hr />
                {
                    topRankStudents.map(student => {
                        return (
                            <Link to={ `/students/${ student.id }` }  key={ student.id }><p className='list-p'>{ student.fullName }</p></Link>
                        )
                    })
                }
            </div>
            <table className='table'>
                <tbody>
                    <tr>
                        <th>TOP 5 CAMPUSES</th>
                        <th>AVERAGE GPA</th>
                    </tr>
                    {
                        topCampuses.map(campus => {
                            return (
                                <tr key={campus.id}>
                                    <td><Link to={`/campuses/${campus.id}`}>{ campus.name }</Link></td>
                                    <td>{ campus.average }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
                
    )
};
const mapState = state => {
    const topGpa = Math.max(...state.students.map(student =>student.gpa));
    const topRankStudents = state.students.filter(student => student.gpa*1 === topGpa);
    const topCampuses = state.campuses.map(campus => {
        const studentArr = state.students.filter(student => student.campusId === campus.id)
        if(studentArr.length){
            const average = (studentArr.reduce((prev, current) => {
                return (prev + (current.gpa*1))
            }, 0))/studentArr.length;
            campus.average = (Math.round(average * 100) / 100);
            return campus;
        } else {
            campus.average = 0;
            return campus;
        }
    })
    topCampuses.sort((a,b) => b.average - a.average);
    return {
        topCampuses,
        students: state.students,
        topRankStudents
    }
};
export default connect(mapState)(Home);