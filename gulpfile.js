let gulp = require('gulp'),
	//utils
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	streamQueue = require('streamqueue')
	//sass
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	cleanCss = require('gulp-clean-css'),
	injectScss = require('gulp-inject-scss'),
	//pug
	pug = require('gulp-pug'),
	//enums
	{ BE_Type, Menu_Style } = require('./base/enum_types.js')


const compileSass = (done) => {

	//delete old config file and add new one
	delete require.cache[require.resolve('./cover/config.js')]
	const { config } = require('./cover/config.js')

	Object.keys(config.properties).forEach(propertyName => {

		const srcFiles = _getStyleSrcFiles(propertyName, config)

		console.log('here', config.properties[propertyName].be)
		const beOptions = config.properties[propertyName].be

		const prodSass = gulp.src(srcFiles)
			.pipe( injectScss(beOptions) )
			.pipe( sassGlob() )
			.pipe( sass({outputStyle: 'compressed'}) )
			.pipe( cleanCss() )
			.pipe( concat('prod.css') )
			
			prodSass.pipe(gulp.dest(`properties/${propertyName}/output`))

			console.log('be options', beOptions)

			//with src maps
			const devOnlySass = gulp.src('cover/dev-only.scss')
				.pipe( injectScss(beOptions) )
				.pipe( sourcemaps.init() )
				.pipe( sass({outputStyle: 'compressed'}) )
			 	.pipe( cleanCss() )
				.pipe( sourcemaps.write() )

			const devSass = gulp.src(srcFiles)
				.pipe( injectScss(beOptions) )
				.pipe( sourcemaps.init() )
				.pipe( sassGlob() )
				.pipe( sass({outputStyle: 'compressed'}) )
			 	.pipe( cleanCss() )
				.pipe( sourcemaps.write() )

			streamQueue({ objectMode: true },devSass, devOnlySass)
			.pipe(concat('dev.css'))
			.pipe(gulp.dest(`properties/${propertyName}/output`))

			.pipe(wait(400))
			.pipe(livereload())
	})

	done()
}

const compilePug = (done) => {

	//delete old config file and add new one
	delete require.cache[require.resolve('./cover/config.js')]
	const { config } = require('./cover/config.js')

	Object.keys(config.properties).forEach(propertyName => {

		const pugSrcFiles = _getPugSrcFiles(propertyName, config)
		
		let varsFile = _refreshVarsFile(propertyName, config)
		console.log(varsFile)


		gulp.src(pugSrcFiles)
			.pipe( pug({
					locals: Object.assign(varsFile, config.properties[propertyName]), 
					pretty: true
			}))
			.pipe(rename(path => {
				path.basename = path.basename.includes('header') ? 'header' : path.basename
				path.basename = path.basename.includes('footer') ? 'footer' : path.basename
				path.basename = path.basename.includes('index') ? 'index' : path.basename				
			}))
			.pipe(gulp.dest(file => {
				return file.relative.includes('index') ? 
					`./properties/${propertyName}` : 
					`./properties/${propertyName}/output/`
			}))
			.pipe(wait(400))
			.pipe(livereload())
	})

	done()
}

function _refreshVarsFile(propertyName, config){
	let varsFilePath =`./cover/${config.properties[propertyName].files.data}`
	delete require.cache[require.resolve(varsFilePath)]
	return require(varsFilePath)
}


function _getStyleSrcFiles(propertyName, config) {

		let extras = []

		//menu types
		if(config.properties[propertyName].menuType)
		{
			switch(config.properties[propertyName].menu.type){
				case Menu_Style.SLIDELEFT:
					extras.push('./base/styles/modules/mobile-menus/slide-left.scss')
					break

				case Menu_Style.SLIDERIGHT:
					extras.push('./base/styles/modules/mobile-menus/slide-right.scss')
					break

				case Menu_Style.PAGES:

					break 

				case Menu_Style.SLIDEDOWN:
					extras.push('./base/styles/modules/mobile-menus/slide-down.scss')
					break 

				case Menu_Style.ACCORDION:
					extras.push('./base/styles/modules/mobile-menus/accordion.scss')
					extras.push('./base/styles/modules/plus-minus.scss')
					break		

				case Menu_Style.CLASSIC_SMART:

					break
			}
		}

		//BE Type
		switch(config.properties[propertyName].be.type){
			case BE_Type.SMART:
				extras.push('./base/styles/themes/smart.scss')
				break

			case BE_Type.ADVANCED:
				extras.push('./base/styles/themes/advanced.scss')
				break
		}

		extras.push(`./cover/${config.properties[propertyName].files.stylesheet}`)

		return extras
}

function _getPugSrcFiles(propertyName, config) {
	return [
			`./cover/${config.properties[propertyName].files.header}`,
			`./cover/${config.properties[propertyName].files.footer}`,
			'./cover/cover_index.pug',
		]
}

const watchFunc = function(done)
{
	livereload.listen()
	gulp.watch(['./**/*.pug', './**/*.js'], compilePug)
	gulp.watch(['./**/*.scss', './cover/config.js'], compileSass)

	done()
}

exports.watch = gulp.series(compileSass, compilePug, watchFunc)
exports.pug = compilePug
exports.sass = compileSass
exports.build = gulp.series(compileSass, compilePug)





