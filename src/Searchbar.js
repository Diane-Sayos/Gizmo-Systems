import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Searchbar = ({ campuses, students }) => {
    const [query, setQuery] = useState('');
    return (
        <div className='side'>
            <form>
            <input className='searchbar' placeholder='Search here...' onChange={ (e) => setQuery(e.target.value) } />
            {
                campuses.filter(campus => {
                    if(query === ''){
                        return campus;
                    } else if(campus.name.toLowerCase().includes(query.toLowerCase()) || campus.address.toLowerCase().includes(query.toLowerCase())){
                        return campus;
                    }
                }).map(campus => {
                    if(query !== ''){
                        return (
                            <p className='list-p' key={ campus.id }><Link to={`/campuses/${campus.id}`}>{ campus.name }</Link></p>
                        )
                    }
                })
            }
            {
                students.filter(student => {
                    if(query === ''){
                        return student;
                    } else if(student.firstName.toLowerCase().includes(query.toLowerCase()) || student.lastName.toLowerCase().includes(query.toLowerCase())){
                        return student;
                    }
                }).map(student => {
                    if(query !== ''){
                        return (
                            <p className='list-p' key={ student.id }><Link to={`/students/${student.id}`}>{ student.fullName }</Link></p>
                        )
                    }
                    
                })
            }
            {/* {filteredArr.map(data => {
                if(data.firstName){
                    if(query !== ''){
                        return (
                            <p className='list-p' key={ data.fullName }><Link to={`/students/${data.id}`}>{ data.fullName }</Link></p>
                        )
                    }
                } else {
                    if(query !== ''){
                        return (
                            <p className='list-p' key={ data.name }><Link to={`/campuses/${data.id}`}>{ data.name }</Link></p>
                        )
                    }
                }
            })} */}
            </form>
        </div>
    )
};
const mapstate = state => {
    return {
        students: state.students,
        campuses: state.campuses
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapstate, mapDispatch)(Searchbar);