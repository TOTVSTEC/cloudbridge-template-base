var task = module.exports,
	path = require('path'),
	Q = null,
	shelljs = null,
	utils = null,
	data = null,
	cloudbridge = null;

task.run = function run(cli, projectData) {
	cloudbridge = cli;
	Q = cloudbridge.require('q');
	shelljs = cloudbridge.require('shelljs');
	utils = cloudbridge.utils;
	data = projectData;

	return Q()
		.then(copySources)
}

function copySources() {
	var src = path.join(__dirname, 'src'),
		target = path.join(cloudbridge.projectDir, 'src'),
		extensions = /\.(html|css|js|prw)/;

	utils.copyTemplate(src, target, data, extensions);

    src = path.join(target, 'advpl', 'program.prw')
    target = path.join(target, 'advpl', options.appName + '.prw');

	shelljs.mv(src, target);
};