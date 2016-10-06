import React from 'react';
import { Link } from 'react-router';

class Dashboard extends React.Component{
	render() {
        let data = this.props.route.data.map(item => item);
        let overview = {
            totalItems: data.length,
            completedItems: (data.filter(function(item){
                return item.complete === true;
            })).length,
            activeItems: (data.filter(function(item){
                return item.complete === false;
            })).length
        };
		return (
			<div>
                <h1>Overview</h1>
                <ul className="list-group">
                    <li>Total list items: {overview.totalItems}</li>
                    <li>Completed items: {overview.completedItems}</li>
                    <li>Active items: {overview.activeItems}</li>
                </ul>
                <nav>
                    <Link to="/items">Open list</Link><br/>
                    <Link to="/items/completed">Completed list</Link><br/>
                    <Link to="/items/active">Active list</Link><br/>
                    <Link to="/additem">Add item</Link><br/>
                </nav>
			</div>
		);
	}
}

export default Dashboard
