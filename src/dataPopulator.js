'use strict'

const fs = require('fs')

// names = {someName: [{year: 1990, gender: 'F', score: 299}, {year: 1991, gender: 'F', score: 283}], otherName: []}
// years = {'1990': {someName: [{gender: 'F', score: 299}], otherName: [{gender: 'M', score:301}]}}

const names = {}
const years = {}

fs.readdir('./namesData', (err, files) => {
	files.forEach(file => {
		var year = file.substr(3, 4)
		var yearObj = {}
		fs.readFile(`./namesData/${file}`, 'utf8', (err, data) => {
			console.log('in readFile')
			if (err) throw new Error(err)
			var arr = data.split('\n')
			arr.forEach(record => {
				var recordArray = record.trim().split(',')
				var name = recordArray[0]
				var gender = recordArray[1]
				var score = recordArray[2]
				// populate 'names' object
				var nameObj = {year: year, gender: gender, score: score}
				if (names.hasOwnProperty(name)) {
					names[name].push(nameObj)
				} else {
					names[name] = [nameObj]
				}
				// populate 'years' object & add to yearObj and then years object
				var yearNameObj = {gender: gender, score: score}
				if (yearObj.hasOwnProperty(name)) {
					yearObj[name].push(yearNameObj)
				} else {
					yearObj[name] = [yearNameObj]
				}
			})
		})
		console.log('outside readFile')
		years[year] = yearObj
	})
	console.log(names)
	console.log(years)
})

