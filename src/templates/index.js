import generateClassComponent from './js/class.template';

const types = {
	class: generateClassComponent
};

function generateComponentTemplate(type, name, lifecycle, options = {}) {
	return types[type](name, type, lifecycle, options);
}

export { generateComponentTemplate, generateClassComponent };
