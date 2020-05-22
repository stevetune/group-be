let gulp = require("gulp"),
	sass = require("gulp-sass"),
	pug = require("gulp-pug"),
	sassGlob = require("gulp-sass-glob"),
	livereload = require("gulp-livereload"),
	cleanCss = require("gulp-clean-css"),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	rename = require("gulp-rename"),
	gulpIf = require("gulp-if") 

const BE_Type = {
	ADVANCED: 1,
	SMART: 2
}

const config = {
	production: false,
	props : {
		"prop-1": {
			type: BE_Type.ADVANCED,
			style: "s1_1",
			markup: "m1",
			vars: "v1"
		},
		"prop-2": {
			type: BE_Type.ADVANCED,
			style: "s1_2",
			markup: "m1",
			vars: "v2"
		}
	}
}

const compileSass = (done) => {
	Object.keys(config.props).forEach(prop => {
		let parentDir = config.props[prop].style.split("_")[0]
		gulp.src(`src/cover/styles/${parentDir}/themes/${config.props[prop].style}.scss`)
			.pipe(sourcemaps.init())
			.pipe(sassGlob())
			.pipe(sass({outputStyle: "compressed"}))
			.pipe(cleanCss())
			.pipe(gulpIf(!config.production, sourcemaps.write()))
			.pipe(rename(p => p.basename = "main"))
			.pipe(gulp.dest(`src/properties/${prop}/output`))
			.pipe(wait(400))
			.pipe(livereload())
	})

	done()

}

const compilePug = function(done)
{

	Object.keys(config.props).forEach(prop => {
		let varsFilePath = `./src/cover/vars/${config.props[prop].vars}.js`
		delete require.cache[require.resolve(varsFilePath)]
		let varsFile = require(varsFilePath)
		gulp.src(`./src/cover/markup/${config.props[prop].markup}/*.pug`)
			.pipe(pug({locals: varsFile, pretty: true}))
			.pipe(gulp.dest(file => {
				if(file.relative.includes("index")){
					return `./src/properties/${prop}`
				}else{
					return `./src/properties/${prop}/output/`
				}
			}))
			.pipe(wait(400))
			.pipe(livereload())
	})

	done()
}

// const _getVarObj = function(propName)
// {
// 	let fileName = null 
// 	fileName = Object.entries(config.vars).find(([ver, propArr]) => {
// 		if(propArr.includes(propName)){
// 			return true
// 		}
// 	})

// 	delete require.cache[require.resolve(`./entities/config/vars/${fileName[0]}`)]
// 	return require(`./entities/config/vars/${fileName[0]}`)
// }

const watchFunc = function(done)
{
	livereload.listen()
	gulp.watch(["src/**/*.pug", "src/**/*.js"], compilePug)
	gulp.watch(["src/**/*.scss"], compileSass)

	done()
}

exports.watch = gulp.series(compileSass, compilePug, watchFunc)
exports.compilePug = compilePug
exports.compileSass = compileSass







