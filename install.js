var task = module.exports,
	path = require('path'),
	Q = null,
	shelljs = null,
	utils = null,
	data = null,
	projectDir = null;

task.run = function run(cli, targetPath) {
	projectDir = targetPath;
	Q = cli.require('q');
	shelljs = cli.require('shelljs');
	utils = cli.utils;
	data = {
		project: require(path.join(targetPath, 'cloudbridge.json'))
	};

	return Q()
		.then(copySources)
		.then(copyDependencies);
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

function copyDependencies() {
	var src = path.join(__dirname, 'build', '*'),
		target = path.join(projectDir, 'build');

	shelljs.mkdir('-p', target);
	shelljs.cp('-Rf', src, target);
};
