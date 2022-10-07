import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import store, { fetchStudents, fetchCampuses } from './store';
import Home from './Home';
import Header from './Header';
import StudentsView from './Students/StudentsView';
import StudentOwnView from './Students/StudentOwnView';
import CampusesView from './Campuses/CampusesView';
import CampusOwnView from './Campuses/CampusOwnView';
import StudentForm from './Students/StudentForm';
import CampusForm from './Campuses/CampusForm';
import RegisterStudents from './Campuses/RegisterStudents';
import Searchbar from './Searchbar';

class _App extends Component {
    async componentDidMount(){
        try{
            console.log('will mount')
            this.props.loadData();
            console.log('did mount')
        }
        catch(ex){
            console.log('did not mount')
        }
    }
    render(){
        return (
            <div>
                <Route path='/:view?' component={ Header } />
                <div className='row'>
                    <Route exact path='/' component={ Home } />
                    <Route exact path='/' component={Searchbar} />
                    <Route exact path='/students' component={ StudentsView } />
                    <Route exact path='/students' component={ StudentForm } />
                    <Route path='/students/:id' component={ StudentOwnView } />
                    <Route path='/students/:id' component={ StudentForm } />
                    <Route exact path='/campuses' component={ CampusesView } />
                    <Route exact path='/campuses' component={ CampusForm } />
                    <Route path='/campuses/:id' component={ CampusOwnView } />
                    <div className='side'>
                        <Route path='/campuses/:id' component={ CampusForm } />
                        <Route path='/campuses/:id' component={ RegisterStudents } />
                    </div>
                </div>
            </div>
        )
    }
};

const mapState = state => {
    return state;
};
const mapDispatch = dispatch => {
    return {
        loadData: () => {
            dispatch(fetchCampuses());
            dispatch(fetchStudents());
        }
    }
};

const root = createRoot(document.querySelector('#root'));
const App = connect(mapState, mapDispatch)(_App);
root.render(
<Provider store={ store }>
    <Router>
        <App />
    </Router>
</Provider>);
