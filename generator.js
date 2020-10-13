const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const typescriptTemplate = (model, underscore, charset) => {
	return `/**
 * Generate with sequelize-generate-model
 * https://github.com/cheolubak/sequelize-generate-model
**/

import {Model, DataTypes, Association, Optional} from 'sequelize';

interface ${model}Attributes {
	id: number;
}

interface ${model}CreationAttributes extends Optional<${model}Attributes, "id"> {}

class ${model} extends Model<${model}Attributes, ${model}Attributes> implements ${model}Attributes {
	public id!: number;
	
	public readonly ${underscore.toUpperCase() === 'Y' ? 'created_at' : 'createdAt'}!: Date;
	public readonly ${underscore.toUpperCase() === 'Y' ? 'updated_at' : 'updatedAt'}!: Date;
	
	public static associations: {
		
	};
}

${model}.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			comment: ''
		}
	}
);

export ${model};
`;
};
const javascriptTemplate = (model, underscore, charset) => {
	return `/**
 * Generate with sequelize-generate-model
 * https://github.com/cheolubak/sequelize-generate-model
**/

const {Model, DataTypes} = require('sequelize');

class ${model} extends Model {
	static init(sequelize) {
		return super.init({
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				comment: ''
			}
		}, {
			sequelize,
			underscored: ${underscore.toUpperCase() === 'Y' ? 'true' : 'false'},
			paranoid: true,
			charset: '${charset}',
			collate: '${charset}_general_ci',
			modelName: '${model}',
			comment: ''
		});
	}
	
	static associate(db) {
		
	}
}
`
};

const exist = (p) => {
	try {
		fs.accessSync(p, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
		return true;
	} catch (e) {
		return false;
	}
};

const mkdirp = (p) => {
	const pathName = path
		.relative('.', path.normalize(p))
		.split(path.sep)
		.filter(p => !!p);
	pathName.forEach((t, i) => {
		const pathBuilder = pathName.slice(0, i + 1).join(path.sep);
		if (!exist(pathBuilder)) {
			fs.mkdirSync(pathBuilder);
		}
	})
};

const generateTemplate = (mod, model, underscore, charset, filename, p) => {
	model = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();
	mkdirp(p);
	const pathToFile = path.join(p, `${filename}.${mod}`);
	if (mod === 'ts') {
		if (exist(pathToFile)) {
			console.error(chalk.bold.red('Already exists file'));
		} else {
			fs.writeFileSync(pathToFile, typescriptTemplate(model, underscore, charset));
			console.log(chalk.bold.green(`Success generated ${pathToFile}`));
		}
	} else if (mod === 'js') {
		if (exist(pathToFile)) {
			console.error(chalk.bold.red('Already exists file'));
		} else {
			fs.writeFileSync(pathToFile, javascriptTemplate(model, underscore, charset));
			console.log(chalk.bold.green(`Success generated ${pathToFile}`));
		}
	} else {
		console.error(chalk.bold.red(`For module, enter ts or js.`));
	}
};

module.exports = generateTemplate;