import React from 'react'
import ReactDOM from 'react-dom'
import names from './output/names'
import years from './output/years'

class NameForm extends React.Component {
	constructor() {
		super()
		this.state = {year: '', name: ''}
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
		var tableRows
		if (this.state.year && !this.state.name) {
			tableRows = []
			const obj = years[this.state.year]
			Object.keys(obj).forEach(name => {
				let nameArray = obj[name]
				let rows = nameArray.map(row => {
					return (
						<tr key={name+row.year+row.gender}><td>{this.state.year}</td><td>{name}</td><td>{row.gender}</td><td>{row.score}</td></tr>
					)
				})
				tableRows = tableRows.concat(rows)
			})
		} else if (!this.state.year && this.state.name) {
			let nameArray = names[this.state.name]
			tableRows = nameArray.map(row => {
				return (
					<tr key={name+row.year+row.gender}><td>{row.year}</td><td>{this.state.name}</td><td>{row.gender}</td><td>{row.score}</td></tr>
				)
			})
		} else if (this.state.year && this.state.name) {
			let nameArray = names[this.state.name]
			tableRows= nameArray.filter(obj => {
				return obj.year === this.state.year
			}).map(row => {
				return (
					<tr key={this.state.name+this.state.year+row.gender}><td>{this.state.year}</td><td>{this.state.name}</td><td>{row.gender}</td><td>{row.score}</td></tr>
				)
			})
		} else {
			tableRows = null
		}
		return (
			<div>
				<div className='dropdowns'>
					<form>
						<label>
							Pick a name and/or
							<select value={this.state.name} onChange={event => { this.handleChange(event, 'name')}}>
								<option key='blank' value=''>&nbsp;</option>
								{namesOptions}
							</select>
						</label>
						<label>
							year
							<select value={this.state.year} onChange={event => { this.handleChange(event, 'year')}}>
								<option key='blank' value=''>&nbsp;</option>
								{yearsOptions}
							</select>
						</label>
					</form>
				</div>
				<div className='table'>
					<table>
						<tbody>
							<tr>
								<th>Year</th>
								<th>Name</th>
								<th>Gender</th>
								<th>Score</th>
							</tr>
							{tableRows}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
)
