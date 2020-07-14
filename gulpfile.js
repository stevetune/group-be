let gulp = require("gulp"),
	sass = require("gulp-sass"),
	pug = require("gulp-pug"),
	sassGlob = require("gulp-sass-glob"),
	livereload = require("gulp-livereload"),
	cleanCss = require("gulp-clean-css"),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	rename = require("gulp-rename"),
	concat = require('gulp-concat'),
	{ BE_Type, Menu_Style } = require('./src/base/enum_types.js') 


const compileSass = (done) => {

	console.log('compiling sass')

	//delete old config file and add new one
	delete require.cache[require.resolve('./src/cover/config.js')]
	const { config } = require('./src/cover/config.js')

	Object.keys(config.properties).forEach(propertyName => {

		let parentDir = config.properties[propertyName].style.split("_")[0]
		const srcFiles = _getStyleSrcFiles(propertyName, config)

		gulp.src(srcFiles)
			.pipe(sourcemaps.init())
			.pipe(sassGlob())
			.pipe(sass({outputStyle: "compressed"}))
			.pipe(cleanCss())
			
			//without src maps
			.pipe(concat('main-prod.css'))
			.pipe(gulp.dest(`src/properties/${propertyName}/output`))

			//with src maps
			.pipe(concat('main.css'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(`src/properties/${propertyName}/output`))

			.pipe(wait(400))
			.pipe(livereload())
	})

	done()
}

const compilePug = (done) => {

	//delete old config file and add new one
	delete require.cache[require.resolve('./src/cover/config.js')]
	const { config } = require('./src/cover/config.js')

	Object.keys(config.properties).forEach(propertyName => {

		const pugSrcFiles = _getPugSrcFiles(propertyName, config)
		console.log(pugSrcFiles)


		//delete old vars file and add new one
		let varsFilePath = `./src/cover/${config.properties[propertyName].vars}.js`
		delete require.cache[require.resolve(varsFilePath)]
		let varsFile = require(varsFilePath)

		gulp.src(pugSrcFiles)
			.pipe(pug({locals: Object.assign(varsFile,config.properties[propertyName]), pretty: true}))
			.pipe(rename(path => {
				path.basename = path.basename.includes('header') ? 'header' : path.basename
				path.basename = path.basename.includes('footer') ? 'footer' : path.basename
				path.basename = path.basename.includes('index') ? 'index' : path.basename				
			}))
			.pipe(gulp.dest(file => {
				return file.relative.includes("index") ? 
					`./src/properties/${propertyName}` : 
					`./src/properties/${propertyName}/output/`
			}))
			.pipe(wait(400))
			.pipe(livereload())
	})

	done()
}

const compileHandlebars = (done) => {
	console.log('compiling handlebars')
	done()
}

const _getStyleSrcFiles = (propertyName, config) => {

		let extras = []

		//menu types
		switch(config.properties[propertyName].menuType.style){
			case Menu_Style.SLIDELEFT:
				extras.push('src/base/styles/modules/mobile-menus/slide-left.scss')
				break

			case Menu_Style.SLIDERIGHT:
				extras.push('src/base/styles/modules/mobile-menus/slide-right.scss')
				break

			case Menu_Style.PAGES:

				break 

			case Menu_Style.SLIDEDOWN:
				extras.push('src/base/styles/modules/mobile-menus/slide-down.scss')
				break 

			case Menu_Style.ACCORDION:
				extras.push('src/base/styles/modules/mobile-menus/accordion.scss')
				extras.push('src/base/styles/modules/plus-minus.scss')
				break		
		}

		//BE Type
		switch(config.properties[propertyName].type){
			case BE_Type.SMART:

				break

			case BE_Type.ADVANCED:
				extras.push('src/base/styles/themes/advanced.scss')
				break
		}


		return [].concat([`src/cover/${config.properties[propertyName].style}.scss`], extras)
}

const _getPugSrcFiles = (propertyName, config) => {
	return [
			`./src/cover/${config.properties[propertyName].header}.pug`,
			`./src/cover/${config.properties[propertyName].footer}.pug`,
			`./src/cover/${config.properties[propertyName].index}.pug`
		]
}

const watchFunc = function(done)
{
	livereload.listen()
	gulp.watch(["src/**/*.pug", "src/**/*.js"], compilePug)
	gulp.watch(["src/**/*.hbs", "src/**/*.js"], compileHandlebars)
	gulp.watch(["src/**/*.scss", "src/cover/config.js"], compileSass)

	done()
}

exports.watch = gulp.series(compileSass, compilePug, compileHandlebars, watchFunc)
exports.pug = compilePug
exports.sass = compileSass
exports.handlebars = compileHandlebars





