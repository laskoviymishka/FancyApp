/// <binding AfterBuild='build.dev' />
'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var inject = require('gulp-inject');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var Builder = require('systemjs-builder');
var del = require('del');
var fs = require('fs');
var join = require('path').join;
var runSequence = require('run-sequence');
var semver = require('semver');
var series = require('stream-series');

var http = require('http');
var express = require('express');
var serveStatic = require('serve-static');
var openResource = require('open');

var APP_BASE = "/dist/dev/"

var PATH = {
	root: 'wwwroot/',
	dest: {
		all: 'wwwroot/dist',
		dev: {
			all: 'wwwroot/dist/dev',
			lib: 'wwwroot/dist/dev/lib',
			ng2: 'wwwroot/dist/dev/lib/angular2.js',
			router: 'wwwroot/dist/dev/lib/router.js'
		},
		prod: {
			all: 'wwwroot/dist/prod',
			lib: 'wwwroot/dist/prod/lib'
		}
	},
	src: {
		// Order is quite important here for the HTML tag injection.
		lib: [
		  './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
		  './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
		  './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
		  './node_modules/reflect-metadata/Reflect.js',
		  './node_modules/reflect-metadata/Reflect.js.map',
		  './node_modules/systemjs/dist/system.src.js',
		  './node_modules/angular2/node_modules/zone.js/dist/zone.js'
		]
	}
};

var ng2Builder = new Builder({
	paths: {
		'angular2/*': 'node_modules/angular2/es6/dev/*.js',
		rx: 'node_modules/angular2/node_modules/rx/dist/rx.js'
	},
	meta: {
		rx: {
			format: 'cjs'
		}
	}
});

var appProdBuilder = new Builder({
	baseURL: 'file:./tmp',
	meta: {
		'angular2/angular2': { build: false },
		'angular2/router': { build: false }
	}
});

var HTMLMinifierOpts = { conditionals: true };

var tsProject = tsc.createProject('tsconfig.json', {
	typescript: require('typescript')
});


var semverReleases = ['major', 'premajor', 'minor', 'preminor', 'patch',
                      'prepatch', 'prerelease'];

var port = 5000;

// --------------
// Clean.

gulp.task('clean', function (done) {
	del(PATH.dest.all, done);
});

gulp.task('clean.dev', function (done) {
	del(PATH.dest.dev.all, done);
});

gulp.task('clean.app.dev', function (done) {
	// TODO: rework this part.
	del([join(PATH.dest.dev.all, '**/*'), '!' +
		 PATH.dest.dev.lib, '!' + join(PATH.dest.dev.lib, '*')], done);
});

gulp.task('clean.prod', function (done) {
	del(PATH.dest.prod.all, done);
});

gulp.task('clean.app.prod', function (done) {
	del([join(PATH.dest.prod.all, '**/*'), '!' +
		 PATH.dest.prod.lib, '!' + join(PATH.dest.prod.lib, '*')], done);
});

gulp.task('clean.tmp', function (done) {
	del('tmp', done);
});


// --------------
// Build dev.

gulp.task('build.ng2.dev', function () {
	ng2Builder.build('angular2/router', PATH.dest.dev.router, {});
	return ng2Builder.build('angular2/angular2', PATH.dest.dev.ng2, {});
});

gulp.task('build.lib.dev', ['build.ng2.dev'], function () {
	return gulp.src(PATH.src.lib)
	  .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('build.js.dev', function () {
	var result = gulp.src('./wwwroot/app/**/*ts')
	  .pipe(plumber())
	  .pipe(sourcemaps.init())
	  .pipe(tsc(tsProject));

	return result.js
	  .pipe(sourcemaps.write())
	  .pipe(template(templateLocals()))
	  .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.assets.dev', ['build.js.dev'], function () {
	return gulp.src(['./wwwroot/app/**/*.html', '!./wwwroot/app/index.html', './wwwroot/app/**/*.css'])
	  .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.index.dev', function () {
	var target = gulp.src(injectableDevAssetsRef(), { read: false });
	return gulp.src('./wwwroot/app/index.html')
		.pipe(inject(target, { transform: transformPath('dev') }))
		.pipe(template(templateLocals()))
		.pipe(gulp.dest(PATH.root));
});

gulp.task('build.app.dev', function (done) {
	runSequence('clean.app.dev', 'build.assets.dev', 'build.index.dev', done);
});

gulp.task('build.dev', function (done) {
	runSequence('clean.dev', 'build.lib.dev', 'build.app.dev', done);
});

// --------------
// Version.

registerBumpTasks();

gulp.task('bump.reset', function () {
	return gulp.src('package.json')
	  .pipe(bump({ version: '0.0.0' }))
	  .pipe(gulp.dest('./'));
});

// --------------
// Serve dev.

gulp.task('serve.dev', ['build.dev'], function () {
	var app;

	watch('./wwwroot/app/**', function () {
		gulp.start('build.app.dev');
	});

	serveSPA('dev');
});

// --------------
// Utils.

function transformPath(env) {
	var v = '?v=' + getVersion();
	return function (filepath) {
		var filename = filepath.replace('/' + PATH.dest[env].all, '');
		arguments[0] = join(APP_BASE, filename);
		return inject.transform.apply(inject.transform, arguments);
	};
}

function injectableDevAssetsRef() {
	var src = PATH.src.lib.map(function (path) {
		return join(PATH.dest.dev.lib, path.split('/').pop());
	});
	src.push(PATH.dest.dev.ng2, PATH.dest.dev.router,
			 join(PATH.dest.dev.all, '**/*.css'));
	return src;
}

function getVersion() {
	var pkg = JSON.parse(fs.readFileSync('package.json'));
	return pkg.version;
}

function templateLocals() {
	return {
		VERSION: getVersion(),
		APP_BASE: APP_BASE
	};
}

function registerBumpTasks() {
	semverReleases.forEach(function (release) {
		var semverTaskName = 'semver.' + release;
		var bumpTaskName = 'bump.' + release;
		gulp.task(semverTaskName, function () {
			var version = semver.inc(getVersion(), release);
			return gulp.src('package.json')
			  .pipe(bump({ version: version }))
			  .pipe(gulp.dest('./'));
		});
		gulp.task(bumpTaskName, function (done) {
			runSequence(semverTaskName, 'build.app.prod', done);
		});
	});
}

function serveSPA(env) {
	//var app;
	//app = express().use(APP_BASE, serveStatic(join(__dirname, PATH.dest[env].all)));
	//app.all(APP_BASE + '*', function (req, res, next) {
	//	res.sendFile(join(__dirname, PATH.dest[env].all, 'index.html'));
	//});
	//app.listen(port, function () {
	//	openResource('http://localhost:' + port + APP_BASE);
	//});
}
