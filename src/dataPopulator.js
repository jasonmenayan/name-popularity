'use strict'

const fs = require('fs')

const names = {}
const years = {}

console.time('populate data')
var files = fs.readdirSync('./namesData')
files.forEach(file => {
	var year = file.substr(3, 4)
	var yearObj = {}
	var fileData = fs.readFileSync(`./namesData/${file}`, 'utf8')
	var fileArr = fileData.split('\n')
	fileArr.forEach(record => {
		var recordArray = record.trim().split(',')
		var score = recordArray[2]
		if (Number(score) > 100) {
			var name = recordArray[0]
			var gender = recordArray[1]
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
		}
	})
	years[year] = yearObj
})
fs.writeFile('./output/names.json', JSON.stringify(names), err => {
	if (err) throw err
	fs.writeFile('./output/years.json', JSON.stringify(years), err => {
		if (err) throw err
		else console.timeEnd('populate data')
	})
})

