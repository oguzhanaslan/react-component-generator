import fs from 'fs-extra'
import prettier from 'prettier'
import { generateComponentTemplate } from './templates'
import { getFileNames, prettierConfig } from './utils'

module.exports = exports = function(answer) {
  if (answer) {
    const { type, lifecycle, name, fileNames, path, jsExtension } = answer

    const targetFolder = `${path}/${name}`

    const { componentFileName } = getFileNames(fileNames, name)

    const formattedCode = prettier.format(
      generateComponentTemplate(type, componentFileName, lifecycle),
      {
        ...prettierConfig,
      },
    )

    // Create js file
    fs.outputFile(
      `${targetFolder}/${componentFileName}.${jsExtension}`,
      formattedCode,
    )
  }
}
