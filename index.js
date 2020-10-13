#!/usr/bin/env node
const {program} = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const generator = require('./generator');

program.version('0.0.1', '-v, --version')
	.name('sequelize-generate-model');

program.command('generate')
	.usage('--module <module> --model <model> --underscore [underscore] --charset [charset] --filename [filename] --path [path]')
	.description('Generate sequelize model')
	.alias('g')
	.requiredOption('-m, --model <model>')
	.requiredOption('-M, --module <module>')
	.option('-u, --underscore [underscore]', 'Please enter underscore or not.(Y/N)', 'Y')
	.option('-c, --charset [charset]', 'Please enter charset.(utf8/utf8mb4)', 'utf8')
	.option('-f, --filename [filename]', 'Write wanna filename', 'test')
	.option('-p, --path [path]', 'Write wanna generate path', '.')
	.action((options) => {
		generator(options.module, options.model, options.underscore, options.charset, options.filename, options.path);
	});

program.action((cmd, args) => {
	if (args) {
		console.log(chalk.bold.red('Can not found command.'));
		program.help();
	} else {
		inquirer.prompt([
			{
				type: 'list',
				name: 'module',
				message: 'Select your module',
				choices: ['ts', 'js']
			},
			{
				type: 'input',
				name: 'model',
				message: 'Input your model name',
				default: 'Test'
			},
			{
				type: 'list',
				name: 'underscore',
				message: 'Select whether to underscore.',
				choices: ['Y', 'N']
			},
			{
				type: 'list',
				name: 'charset',
				message: 'Select whether to charset.',
				choices: ['utf8', 'utf8mb4']
			},
			{
				type: 'input',
				name: 'filename',
				message: 'Input your filename',
				default: 'test'
			},
			{
				type: 'input',
				name: 'path',
				message: 'Input your path',
				default: '.'
			},
			{
				type: 'confirm',
				name: 'confirm',
				message: 'Would you generate?'
			}
		]).then((answer) => {
			if (answer.confirm) {
				generator(answer.module, answer.model, answer.underscore, answer.charset, answer.filename, answer.path);
			}
		});
	}
}).parse(process.argv);