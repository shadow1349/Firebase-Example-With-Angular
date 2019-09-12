// TODO: add child process arguments to run build and deploy commands

const fs = require('fs');
const spawn = require('await-spawn');
const packageJSON = require('./package.json');

/**
 * @function updateVersion
 * @param {string[]} args command line arguments
 * @description
 * This will update the package.json version number based
 * on arguments supplied in the command line
 */
function updateVersion(args) {
  // First we need to grab the version from the package.json
  let version = packageJSON['version'];

  // then we'll grab the version argument
  const versionArgIndex = args.findIndex(x => x === '--versionType');

  // We'll set arg to patch by default
  let arg = 'patch';

  // If there is no --version supplied we'll leave it as patch
  if (versionArgIndex !== -1) {
    // If for some reason there is no argument after --version we will also leave it as patch
    if (args.length >= versionArgIndex + 1) {
      arg = args[versionArgIndex + 1];

      // If we don't have a valid argument we'll throw an error
      if (arg !== 'major' && arg !== 'minor' && arg !== 'patch') {
        throw new Error('Invalid version supplied');
      }
    }
  }

  // we'll split the version into pargs
  const versionParts = version.split('.');

  // Then we'll want to use the version parts update the appropriate version
  switch (arg) {
    case 'major':
      version = `${parseInt(versionParts[0]) + 1}.0.0`;
      break;
    case 'minor':
      version = `${versionParts[0]}.${parseInt(versionParts[1]) + 1}.0`;
      break;
    case 'patch':
      version = `${versionParts[0]}.${versionParts[1]}.${parseInt(versionParts[2]) + 1}`;
      break;
    default:
      version = `${versionParts[0]}.${versionParts[1]}.${parseInt(versionParts[2]) + 1}`;
      break;
  }

  // Then we're going to set the package.json version back to the version we amended earlier
  packageJSON['version'] = version;

  // After setting the version we'll write it to the package.json
  fs.writeFileSync('package.json', JSON.stringify(packageJSON, null, 2));
}

/**
 * @function removeLib
 * This will delete the lib directory
 */
async function removeLib() {
  // We want to make sure to delete the lib folder before deploying
  const os = process.platform;

  if (os === 'darwin' || os === 'linux') {
    await spawn('rm', ['-rf', 'lib']);
  }

  if (os === 'win32') {
    await spawn('rd', ['/s', '/q', 'lib']);
  }
}

(async () => {
  await removeLib();
  console.log('Removing lib Directory, updating version...');
  // Update package.json with new version number
  updateVersion(process.argv);
  console.log('Updated version number, building types library');
  // Remove the lib directory before deploying
  await spawn('node_modules/.bin/tsc');
  console.log('Build successful! Publishing');
  await spawn('npm', ['publish']);
  console.log('Published library');
})();
