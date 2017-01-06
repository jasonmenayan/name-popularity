import React from 'react'
import ReactDOM from 'react-dom'
import names from './output/names'
import years from './output/years'

class NameForm extends React.Component {
	constructor() {
		super()
		this.state = {year: '2015', name: 'Sophia'}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e, type) {
		e.preventDefault()
		this.setState({[type]: e.target.value})
	}

	render() {
		var namesOptions = Object.keys(names).map(name => {
			return (
				<option key={name} value={name}>{name}</option>
			)
		})
		var yearsOptions = Object.keys(years).map(year => {
			return (
				<option key={year} value={year}>{year}</option>
			)
		})

		return (
			<div>
				<div className='dropdowns'>
					<form>
						<label>
							Pick a name and/or
							<select value={this.state.name} onChange={event => { this.handleChange(event, 'name')}}>
								{namesOptions}
							</select>
						</label>
						<label>
							year
							<select value={this.state.year} onChange={event => { this.handleChange(event, 'year')}}>
								{yearsOptions}
							</select>
						</label>
					</form>
				</div>
				<div className='table'>



					
				</div>
			</div>
		)
	}
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
)
