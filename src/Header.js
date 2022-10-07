import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ students, campuses, match }) => {
    const view = match.params.view;
    return (
        <section>
            <header>
                <h1>Gizmo Systems</h1>
                <p>Making enrollment easier.</p>
            </header>
            <nav>
                <Link to="/" className={ !view ? 'selected' : ''}>Home</Link>
                <Link to="/students" className={ view === 'students'? 'selected' : ''}>Students ({students.length })</Link>
                <Link to="/campuses" className={ view === 'campuses'? 'selected' : ''}>Campuses ({ campuses.length })</Link>
            </nav>
        </section>
    )
}

const mapState = state => {
    return state;
}

export default connect(mapState)(Header);