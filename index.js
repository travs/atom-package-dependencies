var sh = require('shelljs');
var os = require('os');
var fs = require('fs');

module.exports = {
  install: function() {
    getPackageDependencies(function(packs){
      for (var p in packs){
        checkInstalled(p);
      }
    });
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

function checkInstalled(pack, callback){
  //checks if a package is installed. If not, it installs it
  var apm = getApmPath();
  var searchString = '^' + pack + '@';
  var cmdString = apm + ' ls -b | grep ' + searchString;
  doCommand(cmdString, function(err, so, se){
    if(!so){
      console.log(pack + ' not installed. Attempting installation now.');
      installPack(pack);
    }
    else{
      console.log(pack + ' is already installed.');
    }
    callback;
  });
}

function installPack(pack, callback){
  //install package from apm registry
  var apm = getApmPath();
  var cmdString = apm + ' --color false install ' + pack;
  doCommand(cmdString, function(err, so, se){
    if(!err){
      console.log(pack + ' installed successfully.');
    }
    else{
      console.log(pack + ' install failed with error: ' + se);
    }
  });
}



function getPackageJSONpath(callback){
  //returns path to 'package.json' in the Atom package that this is required by
  var findPkg = require('witwip');
  findPkg(module.parent, function(err, pkgPath, pkgData) {
    var path = pkgPath;
    callback(path);
  });
}

function getPackageDependencies(callback){
  //finds package that is dependant on this package, then parses JSON and gets 'package-dependencies'
  getPackageJSONpath(function(path){
    packages = JSON.parse(fs.readFileSync(path, 'utf8'));
    callback(packages['package-dependencies']);
  });
}

function getApmPath(){
  return atom.packages.getApmPath();
}

function consoleOut(error, stdout, stderr){
  //use as callback function to doCommand() to get output
  if(error){
    console.log('Error: \n\n' + error + '\nExit code: ' + error.code + '\nTermination signal: ' + error.signal);
    console.log('\nStdError: \n\n' + stderr);
  }
  console.log('Standard output: \n\n' + stdout);
}

function doCommand(commandString, callback){
  var exec = require('child_process').exec,
    child;
  if(!callback) callback = consoleOut;
  child = exec(commandString, callback);
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

function checkDependencies(callback){
  var installedList = getInstalledList(
    function(code, output){
      console.log(output);
    });
}
*/
