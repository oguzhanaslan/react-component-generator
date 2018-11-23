import inquirer from 'inquirer';
import path from 'path';
import { logToUser, titleText } from './utils/logger';

const initCreateComponent = require('./create');

const questions = [
	{
		type: 'list',
		name: 'type',
		message: 'Ne tür bir Component yaratmak istiyorsunuz ?',
		choices: [ 'class' ]
	},
	{
		type: 'list',
		name: 'props',
		message: 'Props Giriniz',
		choices: [ 'scss', 'css', 'sass', 'less', 'NO' ],
		filter: (input) => {
			if (input === 'NO') {
				return false;
			}
			return input;
		}
	},
	{
		type: 'checkbox',
		name: 'lifecycle',
		message: 'Eklenmesini istediginiz lifecycle metodları ?',
		choices: [
			'componentDidMount',
			'componentDidUpdate',
			'componentWillUnmount',
			'shouldComponentUpdate',
			'componentDidCatch'
		]
	},
	{
		type: 'input',
		name: 'name',
		message: 'Component ismi ne olsun ?',
		default: 'ComponentName'
	},
	{
		type: 'list',
		name: 'jsExtension',
		message: 'Dosyanız hangi formatta olmalı ?',
		choices: [ 'js', 'jsx' ],
		default: 'js'
	},
	{
		type: 'confirm',
		name: 'includeTests',
		message: 'Test dosyası ister misin ?',
		default: true
	}
];

module.exports = exports = function() {
	// show generating message
	titleText('Component Yaratma');
	logToUser('Tercihlerinize gore otomatik olarak component olusturacaktir');
	console.log('------------------------');

	// prompt questions
	inquirer
		.prompt(questions)
		.then(function(answer) {
			initCreateComponent(answer);
		})
		.catch(function(err) {
			console.log(err);
		});
};
