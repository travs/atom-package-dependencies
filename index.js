//check if apm atom-dependencies is installed. If not, install it.
var sh = require('shelljs');
var os = require('os');
var fs = require('fs');
var JSON = require('JSON');


module.exports = {
  getDeps: function() {
    console.log(getPackageDependencies());
  }
}

function checkApmInstalled(){
  if(!sh.which('apm')) {
    sh.echo('Please make sure apm is installed and in your PATH.');
    sh.exit(1);
  }
}

function getInstalledList(){
  //gives path to list of installed atom packages
  var fn = getTempFilename();
  sh.exec('apm ls -b', {silent: true}).output.to(fn);
  return fn;
}

function isInstalled(pack){
  //make sure 'installList' is defined by calling getInstallList()
  return !!sh.grep('^' + pack + '@', installList);
}

function getTempFilename(){
  return os.tmpdir() + "apmInstalledPacks";
}

function getPackageJsonPath(){
  var parentRoot = require('parent-root');
  if(os.platform() === 'win32'){
    return parentRoot() + '\\package.json';
  }
  else return parentRoot() + '/package.json';
}

function getPackageDependencies(){
  var path = getPackageJsonPath();
  var packages = JSON.parse(fs.readFileSync(path, 'utf8'));
  return packages['package-dependencies'];
}


/* //deprecated
var installPd = function(){
  sh.echo('package-dependencies not installed. Attempting installation now.');
  var x = sh.exec('apm install package-dependencies');
  sh.exit(x);
}
*/
