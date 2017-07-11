
const _ = require('lodash');
const glob = require('glob');
const path = require('path');

function getGlobbedFiles (globPatterns, removeRoot) {
  // For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};

module.exports = () => {
  // Globbing model files
  const PATH = process.env.MODEL_PATH || `${process.cwd()}/api/models/**/*.js`;
  getGlobbedFiles(PATH).forEach((modelPath) => {
    const excludeFile = 'index.js';
    if (path.basename(modelPath) !== excludeFile) {
      require(path.resolve(modelPath));
    }
  });
};
