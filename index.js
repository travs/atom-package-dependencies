//check if apm atom-dependencies is installed. If not, install it.

module.exports = {
  install: install
}

var install = function() {
  var sh = require('shelljs');
  if(sh.exec('apm ls -b | grep "^package-dependencies@"') === 0) {
    //abort if atom package-dependencies is already installed
    sh.echo('apm package "package-dependencies" is already installed.')
    return;
  }
  if(!sh.which('apm')){
    sh.echo('Please make sure apm is installed and in your PATH.');
    sh.exit(1);
  }
  sh.exec('apm install package-dependencies');
}



install();

//future: run atom-dependencies:update when this package is
//included in 'dependencies' of package.json in any developer's atom package
