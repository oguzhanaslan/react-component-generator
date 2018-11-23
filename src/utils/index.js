import fs from 'fs-extra';
import path from 'path';
import defaultOptions from '../templates/config.json';

export const prettierConfig = {
	parser: 'babylon',
	singleQuote: true,
	trailingComma: 'none'
};
export const requireLetterAndNumber = (value) => {
	if (/\w/.test(value) && /\d/.test(value)) {
		return true;
	}
	return 'Password need to have at least a letter and a number';
};

export const requireNumber = (value) => {
	let pass = value.match(/([0-9][0-9]*)/);
	if (pass) {
		return true;
	}
	return 'Lütfen ID girdiğinize emin olun!';
};

export const requireInput = (value) => {
	let pass = value.match(/\S+/);
	if (pass) {
		return true;
	}
	return 'Lütfen doğru data girişi yaptığınızdan emin olun!.';
};

export function getCurrentDirectoryBase() {
	return path.basename(process.cwd());
}

export function directoryExists(filePath) {
	try {
		return fs.statSync(filePath).isDirectory();
	} catch (err) {
		return false;
	}
}

function replaceKeys(searchString, replacement) {
	const replacementKeys = {
		COMPONENT_NAME: replacement,
		component_name: replacement.toLowerCase(),
		COMPONENT_CAP_NAME: replacement.toUpperCase(),
		cOMPONENT_NAME: replacement[0].toLowerCase() + replacement.substr(1)
	};

	return Object.keys(replacementKeys).reduce((acc, curr) => {
		if (acc.includes(curr)) {
			const regEx = new RegExp(curr, 'g');
			return acc.replace(regEx, replacementKeys[curr]);
		}
		return acc;
	}, searchString);
}

export function getFileNames(fileNames = [], componentName) {
	const defaultFileNames = {
		testFileName: `${defaultOptions.testFileName}.${componentName}`,
		componentFileName: componentName,
		styleFileName: componentName
	};

	const formattedFileNames = Object.keys(fileNames).reduce(
		(acc, curr) => {
			acc[curr] = replaceKeys(fileNames[curr], componentName);
			return acc;
		},
		{ ...defaultFileNames }
	);

	return formattedFileNames;
}

export function writeFile(file, template, overwriteFile, createDir = null) {
	fs.pathExists(file, (err, exists) => {
		if (err) {
			console.error(err.message);
			return;
		}
		if (exists && !overwriteFile) {
			console.error(
				'A file with that name already exists.  Rerun the command with -o or --overwrite to overwrite the file'
			);
			return;
		}
		if (createDir) {
			fs.outputFile(file, template, (err) => {
				if (err) console.error(err.message);
			});
		} else {
			fs.writeFile(file, template, (err) => {
				if (err) {
					if (err.code === 'ENOENT') {
						console.error(
							'That path does not exist.  Rerun the command with -c or --create to create the path'
						);
					} else {
						console.error(err.message);
					}
				}
			});
		}
	});
}
