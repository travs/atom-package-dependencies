//check if apm atom-dependencies is installed. If not, install it.
module.exports = {
  function() installAtomPackage{
    var sh = require('shelljs');
    if(!sh.which('apm')){
      sh.echo("Please make sure apm is installed and in your PATH.");
      sh.exit(1);
    }
    sh.exec('apm install package-dependencies');
  }
}

//future: run atom-dependencies:update when this package is required in 'dependencies'
