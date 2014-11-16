var sh = require('shelljs');
var os = require('os');
var fs = require('fs');

module.exports = {
  getDeps: function() {
    //getPackageDependencies(function(x){console.log(x);});
    //checkDependencies();
    isInstalled('package-dependencies');
    isInstalled('nope');
  }
}

function isApmInstalled(){
  //TODO: replace with native node 'child_process' code
  if(!sh.which('apm')) {
    console.log('Please make sure apm is installed and in your PATH.');
    sh.exit(1);
  }
  else{
    return true;
  }
}

function getApmPath(){
  return atom.packages.getApmPath();
}

function checkDependencies(callback){
  var installedList = getInstalledList(
    function(code, output){
      console.log(output);
    });
}

function isInstalled(pack){
  //make sure 'installedList' is defined by calling getInstallList()
  //return !!sh.grep('^' + pack + '@', file);
  var apm = getApmPath();
  var searchString = '^' + pack + '@';
  var cmdString = apm + ' ls -b | grep ' + searchString;
  doCommand(cmdString);
}

function installPack(pack){
  //given argument, install package from apm registry
  var apm = getApmPath();
  var cmdString = apm + ' install ' + pack;
  doCommand(cmdString, callback);
}

function doCommand(commandString, callback){
  var exec = require('child_process').exec,
    child;
  child = exec(commandString,
    callback(error, stdout, stderr) {
      //TODO: fix this callback
      console.log(!!stdout);
  });
}

function getPackageJsonPath(callback){
  //returns path to 'package.json' in the Atom package that this is required by
  var findPkg = require('witwip');
  findPkg(module.parent, function(err, pkgPath, pkgData) {
    var path = pkgPath;
    callback(path);
  });
}

function getPackageDependencies(callback){
  //finds package that is dependant on this package, then parses JSON and gets 'package-dependencies'
  getPackageJsonPath(function(path){
    packages = JSON.parse(fs.readFileSync(path, 'utf8'));
    callback(packages['package-dependencies']);
  });
}


/* //deprecated
var installPd = function(){
  sh.echo('package-dependencies not installed. Attempting installation now.');
  var x = sh.exec('apm install package-dependencies');
  sh.exit(x);
}

function getTempFilename(){
  return os.tmpdir() + 'apmInstalledPacks';
}

function getInstalledList(callback){
  //gives path to list of installed atom packages
  var fn = getTempFilename();
  var child = sh.exec(getApmPath() + ' ls -b', {silent: true, async: true}, function(code, output){console.log(output);});
}
*/
