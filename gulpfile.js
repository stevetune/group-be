let gulp = require("gulp"),
	sass = require("gulp-sass"),
	pug = require("gulp-pug"),
	sassGlob = require("gulp-sass-glob"),
	livereload = require("gulp-livereload"),
	cleanCss = require("gulp-clean-css"),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	rename = require("gulp-rename"),
	concat = require('gulp-concat')


const compileSass = (done) => {

	console.log('compiling sass')

	//delete old config file and add new one
	delete require.cache[require.resolve('./src/cover/config.js')]
	const configAll = require('./src/cover/config.js')
	const config = configAll.config

	Object.keys(config.props).forEach(prop => {

		let parentDir = config.props[prop].style.split("_")[0]
		const srcFiles = _getStyleSrcFiles(prop, parentDir, configAll)

		gulp.src(srcFiles)
			.pipe(sourcemaps.init())
			.pipe(sassGlob())
			.pipe(sass({outputStyle: "compressed"}))
			.pipe(cleanCss())
			
			//without src maps
			.pipe(concat('main-prod.css'))
			.pipe(gulp.dest(`src/properties/${prop}/output`))

			//with src maps
			.pipe(concat('main.css'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(`src/properties/${prop}/output`))

			.pipe(wait(400))
			.pipe(livereload())
	})

	done()
}

const compilePug = (done) => {

	//delete old config file and add new one
	delete require.cache[require.resolve('./src/cover/config.js')]
	const configAll = require('./src/cover/config.js')
	const config = configAll.config

	Object.keys(config.props).forEach(prop => {

		const pugSrcFiles = _getPugSrcFiles(prop, config)
		
		//delete old vars file and add new one
		let varsFilePath = `./src/cover/vars/${config.props[prop].vars}.js`
		delete require.cache[require.resolve(varsFilePath)]
		let varsFile = require(varsFilePath)

		gulp.src(pugSrcFiles)
			.pipe(pug({locals: Object.assign(varsFile,config.props[prop]), pretty: true}))
			.pipe(rename(path => {
				path.basename = path.basename.includes('header') ? 'header' : path.basename
				path.basename = path.basename.includes('footer') ? 'footer' : path.basename				
			}))
			.pipe(gulp.dest(file => {
				return file.relative.includes("index") ? 
					`./src/properties/${prop}` : 
					`./src/properties/${prop}/output/`
			}))
			.pipe(wait(400))
			.pipe(livereload())
	})

	done()
}

const _getStyleSrcFiles = (prop, parentDir, configAll) => {

		let extras = []

		//menu types
		switch(configAll.config.props[prop].menuType.style){
			case configAll.Menu_Style.SLIDELEFT:
				extras.push('src/base/styles/themes/slideleft-mobile-menu.scss')
				break

			case configAll.Menu_Style.PAGES:

				break 

			case configAll.Menu_Style.SLIDEDOWN:
				extras.push('src/base/styles/themes/slidedown-mobile-menu.scss')
				break 

			case configAll.Menu_Style.ACCORDION:
				break		
		}

		//BE Type
		switch(configAll.config.props[prop].type){
			case configAll.BE_Type.SMART:

				break

			case configAll.BE_Type.ADVANCED:
				extras.push('src/base/styles/themes/advanced.scss')
				break
		}


		return [].concat([`src/cover/styles/${parentDir}/${configAll.config.props[prop].style}.scss`], extras)
}

const _getPugSrcFiles = (prop, config) => {
	return [
			`./src/cover/markup/${config.props[prop].markup}/*.pug`,
			`./src/cover/markup/${config.props[prop].markup}/lib/*.pug`
		]
}

const watchFunc = function(done)
{
	livereload.listen()
	gulp.watch(["src/**/*.pug", "src/**/*.js"], compilePug)
	gulp.watch(["src/**/*.scss", "src/cover/config.js"], compileSass)

	done()
}

exports.watch = gulp.series(compileSass, compilePug, watchFunc)
exports.compilePug = compilePug
exports.compileSass = compileSass







