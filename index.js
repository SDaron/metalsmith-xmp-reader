/* eslint-env node */

const xmpReader = require('xmp-reader');
const minimatch = require('minimatch');
const DEFAULT_PATTERN = '**/*.+(jpeg|jpg)';

module.exports = function plugin(options) {
  return function(files, metalsmith, done){

    const matcher = minimatch.Minimatch(options.pattern || DEFAULT_PATTERN );
    const property = options.property || 'xmp' ;

    setImmediate(done);
    Object.keys(files).forEach(function(file){

      if (!matcher.match(file)) {
        return;
      }
      var data = files[file];
      if (data.draft) delete files[file];

      try {
        xmpReader.fromBuffer(data.contents, (err, data) => {
          if (err) console.log(err);
          else files[file][property] = data;
        });
      } catch(err) {
	      // got invalid data, handle error
      }
    });
  };
}
