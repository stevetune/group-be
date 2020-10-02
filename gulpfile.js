let gulp = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	sassGlob = require('gulp-sass-glob'),
	livereload = require('gulp-livereload'),
	cleanCss = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	streamQueue = require('streamqueue'),
	injectScss = require('gulp-inject-scss')


const BE_Type = 
{
	ADVANCED: 1,
	SMART: 2
}

const Menu_Style = 
{
	DEFAULT: 0,
	SLIDELEFT: 1, 
	SLIDERIGHT: 2, 
	EXPAND: 3,
	//SLIDEDOWN: 5
}

const config = 
{
	production: false,
	properties : 
	[
		{
			name: 'generic-place',
			beType: BE_Type.ADVANCED,
			files: 
			{
				style: 'style1',
				header: 'prop1/header1',
				footer: 'prop1/footer1',
				index: 'prop1/index1',
				vars: 'prop1/vars1',
			},
			menuConfig: 
			{
				//SlIDELEFT || SLIDERIGHT || EXPAND || DEFAULT
				mainStyle: Menu_Style.DEFAULT,
				subStyle: Menu_Style.DEFAULT
			}
		},
		{
			name: 'menu-test',
			beType: BE_Type.ADVANCED,
			files:
			{
				style: 'style1',
				header: 'prop2/header2',
				footer: 'prop2/footer2',
				index: 'prop2/index2',
				vars: 'prop2/vars2'
			},
			menuConfig: 
			{
				//SlIDELEFT || SLIDERIGHT || EXPAND || DEFAULT
				mainStyle: Menu_Style.SLIDELEFT,
				subStyle: Menu_Style.SLIDERIGHT
			}
		}
		//...
	]
}

const sassVars = 
{
	containerWidth: '1160px',
	containerPadding: '15px',
	mobileWidth: '990px',
	rgbRed: 15, 
	rgbGreen: 122, 
	rgbBlue: 190
}

const compileSass = function(done)
{
	//delete old config file and add new one
	// delete require.cache[require.resolve('./src/cover/config.js')]
	// const { config } = require('./src/cover/config.js')

	config.properties.forEach(function(property)
	{
		const srcFiles = _getStyleSrcFiles(property)

		const prodSass = gulp.src(srcFiles)
			.pipe( injectScss(sassVars) )
			.pipe( sassGlob() )
			.pipe( sass( {outputStyle: 'compressed'} ) )
			.pipe( cleanCss() )
			.pipe( concat('prod.css') )
			

			prodSass.pipe(gulp.dest(`src/properties/${property.name}/output`))

			//with src maps
			const devOnlySass = gulp.src('src/cover/dev-only.scss')
				.pipe( injectScss(sassVars) )
				.pipe( sourcemaps.init() )
				.pipe( sass({outputStyle: 'compressed'}) )
			 	.pipe( cleanCss() )
				.pipe( sourcemaps.write() )

			const devSass = gulp.src(srcFiles)
				.pipe(injectScss(sassVars))
				.pipe(sourcemaps.init())
				.pipe(sassGlob())
				.pipe( sass( { outputStyle: 'compressed' } ) )
			 	.pipe(cleanCss())
				.pipe(sourcemaps.write())

			streamQueue({ objectMode: true },devSass, devOnlySass)
				.pipe(concat('dev.css'))
				.pipe(gulp.dest(`src/properties/${property.name}/output`))
				.pipe(wait(400))
				.pipe(livereload())
	})

	done()
}

const compilePug = function(done) 
{
	config.properties.forEach(function(property)
	{
		const pugSrcFiles = _getPugSrcFiles(property)

		//delete old vars file and add new one
		let varsFilePath = `./src/cover/${property.files.vars}.js`
		delete require.cache[require.resolve( varsFilePath )]
		let varsFile = require(varsFilePath)

		const localsObj = Object.assign( property, varsFile )
		//console.log('localsObject', localsObj)

		gulp.src(pugSrcFiles)
			.pipe( pug( {locals: localsObj, pretty: true} ) )
			.pipe(rename(path => {
				path.basename = path.basename.includes('header') ? 'header' : path.basename
				path.basename = path.basename.includes('footer') ? 'footer' : path.basename
				path.basename = path.basename.includes('index') ? 'index' : path.basename				
			}))
			.pipe(gulp.dest(file => {
				return file.relative.includes('index') ? 
					`./src/properties/${property.name}` : 
					`./src/properties/${property.name}/output/`
			}))
			.pipe(wait(400))
			.pipe(livereload())
	})

	done()
}

function _getStyleSrcFiles(property)
{
		let extras = []

		/*
		 * HEADER MENU
		 */

		extras.push('src/base/styles/modules/header-menu/header-menu.scss')
		extras.push('src/base/styles/modules/header-menu/plus-button.scss')
		extras.push('src/base/styles/modules/header-menu/close-button.scss')

		switch(property.menuConfig.mainStyle)
		{
			case Menu_Style.DEFAULT:
				extras.push('src/base/styles/modules/header-menu/mobile/top-level/default.scss')
				break;

			case Menu_Style.SLIDELEFT:
				extras.push('src/base/styles/modules/header-menu/mobile/top-level/slide-default.scss')
				extras.push('src/base/styles/modules/header-menu/mobile/top-level/slide-left.scss')
				break

			case Menu_Style.SLIDERIGHT:
				extras.push('src/base/styles/modules/header-menu/mobile/top-level/slide-default.scss')
				extras.push('src/base/styles/modules/header-menu/mobile/top-level/slide-right.scss')
				break

			case Menu_Style.EXPAND:
				extras.push('src/base/styles/modules/header-menu/mobile/top-level/expand.scss')
				break		

			// case Menu_Style.SLIDEDOWN:
			// 	extras.push('src/base/styles/modules/header-menu/mobile/top-level/slide-down.scss')
			// 	break 
		}

		switch(property.menuConfig.subStyle)
		{
			case Menu_Style.DEFAULT:
				extras.push('src/base/styles/modules/header-menu/mobile/sub-level/default.scss')
				break;
			
			case Menu_Style.SLIDELEFT:
				extras.push('src/base/styles/modules/header-menu/mobile/sub-level/slide-default.scss')
				if (property.menuConfig.mainStyle === Menu_Style.SLIDERIGHT)
				{
					extras.push('src/base/styles/modules/header-menu/mobile/sub-level/slide-top-right-sub-left.scss')
				}
				else
				{
					extras.push('src/base/styles/modules/header-menu/mobile/sub-level/slide-left.scss')
				}
				break

			case Menu_Style.SLIDERIGHT:
				extras.push('src/base/styles/modules/header-menu/mobile/sub-level/slide-default.scss')
				if (property.menuConfig.mainStyle === Menu_Style.SLIDELEFT)
				{
					extras.push('src/base/styles/modules/header-menu/mobile/sub-level/slide-top-left-sub-right.scss')
				}
				else
				{
					extras.push('src/base/styles/modules/header-menu/mobile/sub-level/slide-right.scss')
				}
				break

			case Menu_Style.EXPAND:
				extras.push('src/base/styles/modules/header-menu/mobile/sub-level/expand.scss')
				break		

			// case Menu_Style.SLIDEDOWN:
			// 	extras.push('src/base/styles/modules/header-menu/mobile/sub-level/slide-down.scss')
			// 	break 
		}
		
		//BE Type
		switch(property.beType)
		{
			// case BE_Type.SMART:
			// 	break

			case BE_Type.ADVANCED:
				extras.push('src/base/styles/themes/advanced.scss')
				break
		}
		console.log([`src/cover/${property.files.style}.scss`], extras)

		return [].concat([`src/cover/${property.files.style}.scss`], extras)
}

function _getPugSrcFiles(property)
{
	return [
			`./src/cover/${property.files.header}.pug`,
			`./src/cover/${property.files.footer}.pug`,
			`./src/cover/${property.files.index}.pug`
		]
}

const watchFunc = function(done)
{
	livereload.listen()
	gulp.watch(['src/**/*.pug', 'src/**/*.js'], compilePug)
	gulp.watch(['src/**/*.scss', 'src/cover/config.js'], compileSass)

	done()
}

exports.watch = gulp.series(compileSass, compilePug, watchFunc)
exports.pug = compilePug
exports.sass = compileSass





