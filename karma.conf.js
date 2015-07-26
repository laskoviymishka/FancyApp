// Karma configuration
// Generated on Sun Jul 26 2015 13:11:52 GMT+0300 (Belarus Standard Time)

module.exports = function (config) {
	config.set({
		basePath: 'wwwroot/',
		frameworks: ['jasmine'],
		files: [
            'wwwroot/test/**/*.js',
            { pattern: '**/*.js.map', included: false },
            { pattern: '**/*.ts', included: false }
		],
		exclude: [
		],
		preprocessors: {
			'**/*.ts': ['typescript']
		},
		typescriptPreprocessor: {
			version: "1.5.0",
			options: {
				target: "es5",
				module: "commonjs",
				declaration: true,
				noImplicitAny: false,
				removeComments: true,
				noLib: false,
				emitDecoratorMetadata: true,
				sourceMap: true,
				listFiles: true,
				outDir: "wwwroot/test",
				experimentalDecorators: true
			},
			files: [
				"./app/app.ts",
				"./app/init.ts",
				"./app/services/NameList.ts",
				"./typings/angular2/angular2.d.ts",
				"./typings/angular2/router.d.ts",
				"./typings/custom.system.d.ts",
				"./typings/es6-promise/es6-promise.d.ts",
				"./typings/rx/rx-lite.d.ts",
				"./typings/rx/rx.d.ts",
				"./typings/tsd.d.ts"
			],
			filesGlob: [
				"./app/**/*.ts",
				"./typings/**/*.ts"
			],
			transformPath: function (path) {
				console.log(path)
				return path.replace(/\.ts$/, '.js');
			}
		},
		reporters: ['dots', 'progress'],
		junitReporter: {
			outputFile: 'js-test-results.xml'
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['PhantomJS'],
		captureTimeout: 20000,
		singleRun: true,
		reportSlowerThan: 1000,
		plugins: [
          'karma-jasmine',
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-typescript-preprocessor'
		]
	});
}
