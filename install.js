var task = module.exports,
	path = require('path'),
	Q = null,
	shelljs = null,
	utils = null,
	data = null,
	cloudbridge = null,
	projectDir = null;

task.run = function run(cli, targetPath) {
	cloudbridge = cli;
	projectDir = targetPath;
	Q = cloudbridge.require('q');
	shelljs = cloudbridge.require('shelljs');
	utils = cloudbridge.utils;
	data = {
		project: require(path.join(targetPath, 'cloudbridge.json'))
	};

	return Q()
		.then(copySources);
};

function copySources() {
	var src = path.join(__dirname, 'src'),
		target = path.join(projectDir, 'src'),
		extensions = /\.(html|css|js|prw)/;

	utils.copyTemplate(src, target, data, extensions);

	src = path.join(target, 'advpl', 'program.prw');
	target = path.join(target, 'advpl', data.project.name + '.prw');

	shelljs.mv(src, target);
};
