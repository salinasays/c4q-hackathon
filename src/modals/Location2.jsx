import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addAddress, addCity, addZipcode, getSchooldata} from '../actions/userActions';
import {getSchools, getDistrict, getSchoolGrade, getAttendance, getMathScores, getEnglishScores} from '../actions/index'

const mapState = state => ({
    schools: state.schools,
    users: state.users
});

const Location = React.createClass({

	handleChange: function(input, event){
		if(input === 'address'){
			this.props.addAddress(event.target.value)
		} else if (input === 'city'){
			this.props.addCity(event.target.value)
		} else if (input === 'zipCode'){
			this.props.addZipcode(event.target.value)
		}
	},
	handleClick(e) {
		e.preventDefault()
		let schoolGradeArr = []
			let district = null;
			let grades = null;
			let attendance = null;
			let math = null;
			let english = null;
			console.log(this.props.users.zipcode)
		  Promise.resolve(getDistrict(this.props.users.zipcode))
		  .then((temp)=> {
		  	district = temp.data
		    //this.setState({district: temp.data });
		  })

		  .then(()=> getSchoolGrade())
		  .then((temp)=> {
		  	grades = temp.data
		    //this.setState({grades: temp.data });
		  })

		  .then(()=> getAttendance())
		  .then((temp)=> {
		  	attendance= temp.data
		    //this.setState({attendance: temp.data });
		  })

		  .then(()=> getMathScores())
		  .then((temp)=> {
		  	math=temp.data
		    //this.setState({math: temp.data });
		  })

		  .then(()=> getEnglishScores())
		  .then((temp)=> {
		  	english = temp.data
		    //this.setState({english: temp.data });
		  })
		  .then(()=> {
		  	// setTimeout(()=>{

		  	return {district , math, english, attendance, grades}
		  	// }, 2000)
		  })
		  .then((data)=>{
		  	console.log(data)
		  	this.props.getSchools(data, '05')
		  })

	},
	render(){
		console.log('SCHOOLS in render:', this.props.schools)
		return(
			<div>
				<h2>Where do you live?</h2>

				<form onSubmit={this.handleClick}>
					<input type="text"
					placeholder="Street Address"
					onChange={this.handleChange.bind(this, 'address')} />
					<br />

					<input type="text"
					placeholder="City"
					onChange={this.handleChange.bind(this, 'city')} />

					<input type="text"
					placeholder="Zip Code"
					value={this.props.users.zipcode}
					onChange={this.handleChange.bind(this, 'zipCode')} />

					<br /> 
					<br />
					<input type="submit"
					value="Search Address" />
				</form>
			</div>
			)
	}

});

function mapDispatchToProps(dispatch){
	return bindActionCreators({addAddress, addCity, addZipcode, getSchools}, dispatch)
}
// export default connect(mapState, {getSchools})(Location);
export default connect(mapState, mapDispatchToProps)(Location);

//second prop is automatically dispatch.

// if this.props.schools is undefined, initialstate for school reducer as false,,
// if false, null, do the action or promise 
