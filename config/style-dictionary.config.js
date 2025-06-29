const StyleDictionary = require('style-dictionary').default || require('style-dictionary');

// Define a custom format for TypeScript export
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations',
  format: function({ dictionary }) {
    return `/**
 * Do not edit directly
 * Generated on ${new Date().toLocaleString()}
 */

declare const Tokens: {
${dictionary.allTokens.map(token => {
      // Clean token name for TypeScript variable
      const varName = token.name.replace(/-/g, '_');
      return `  ${varName}: ${JSON.stringify(token.value)};`;
    }).join('\n')}
};

export default Tokens;
`;
  }
});

// Configure Style Dictionary
module.exports = {
  source: ['tokens/**/*.json'], // Where to find your token JSON files
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'src/styles/',
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables'
      }]
    },
    js: { // For TypeScript, you typically generate a JS object which TS can then interpret
      transformGroup: 'js',
      buildPath: 'src/ts/',
      files: [{
        destination: 'tokens.ts', // Will output .ts file
        format: 'javascript/es6', // Use a standard JS format
        filter: (token) => token.type !== 'fontFamily' // Example filter
      },
      {
        destination: 'font-tokens.ts', // Separate file for font family if needed
        format: 'typescript/es6-declarations', // Using a custom format
        filter: (token) => token.type === 'fontFamily' // Example filter
      }]
    }
    // Add other platforms like 'android', 'ios', 'compose', etc. as needed
  }
};