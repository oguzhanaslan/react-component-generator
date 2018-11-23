import defaultOptions from '../config.json';

const COMPONENT_TYPES = {
	pure: 'PureComponent',
	class: 'Component'
};

function generateReactImport(componentType) {
	return `import React${componentType !== 'stateless' ? `, { ${COMPONENT_TYPES[componentType]} }` : ''} from 'react'`;
}

function generateComponentMethods(componentMethods) {
	if (componentMethods.length === 0) {
		return '';
	}

	return componentMethods.reduce((acc, method) => {
		const methods = `${acc}\n\xa0\xa0\xa0\xa0${method}(){}\n`;

		return methods;
	}, '');
}

function generateImports(
	COMPONENT_NAME,
	componentType,
	{ cssExtension = defaultOptions.cssExtension, styleFolder = defaultOptions.styleFolder, styleFileName }
) {
	return `${generateReactImport(componentType)}
  import PropTypes from 'prop-types'
  ${cssExtension ? `import styles from './${styleFolder}/${styleFileName}.${cssExtension}'` : ''}`;
}

function generateClassComponent(
	COMPONENT_NAME,
	componentType,
	LIFECYCYLE,
	{
		cssExtension = defaultOptions.cssExtension,
		componentMethods = defaultOptions.componentMethods,
		styleFolder = defaultOptions.styleFolder,
		styleFileName
	}
) {
	return `${generateImports(COMPONENT_NAME, componentType, {
		cssExtension,
		styleFolder,
		styleFileName
	})}

  class ${COMPONENT_NAME} extends ${COMPONENT_TYPES[componentType]} {
      constructor(props) {
        super(props)
      }

      ${LIFECYCYLE.map((i) => `${i} () { console.log('I am about to say hello');}\n `).join('')}

      ${generateComponentMethods(componentMethods)}
      render() {
        return (
          <div className="${COMPONENT_NAME}"></div>
        );
      }
    }

    ${COMPONENT_NAME}.propTypes = {}

    ${COMPONENT_NAME}.defaultProps = {}

    export default ${COMPONENT_NAME}`;
}

export { generateClassComponent, generateImports };
