//check if apm atom-dependencies is installed. If not, install it.
var sh = require('shelljs');

module.exports = {
  install: function() {
    checkApmInstalled();
    if(!pdInstalled()){
      installPd();
    }
  }
}

var checkApmInstalled = function(){
  if(!sh.which('apm')){
    sh.echo('Please make sure apm is installed and in your PATH.');
    sh.exit(1);
  }
}

var pdInstalled = function(){
  var fn = getTempFilename();
  sh.exec('apm ls -b', {silent: true}).output.to(fn);
  return !!sh.grep('^package-dependencies@', fn);
}

var installPd = function(){
  sh.echo('package-dependencies not installed. Attempting installation now.');
  var x = sh.exec('apm install package-dependencies');
  exit(x);
}

var getTempFilename = function(){
  return os.tmpdir() + "apmInstalledPacks";
}
