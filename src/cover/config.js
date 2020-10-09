const BE_Type = 
{
	ADVANCED: 1,
	SMART: 2
}

const Menu_Style = 
{
	STATIC: 0,
	SLIDELEFT: 1, 
	SLIDERIGHT: 2, 
	EXPAND: 3
}

const Dropdown_Icon_Style = 
{
	NONE: 0,
	STATIC_ARROW: 1,
	ANIMATED_ARROW: 2,
	STATIC_PLUS: 3,
	ANIMATED_PLUS: 4,
	CHEVRON: 5
}

const config = 
{
	production: false,
	properties : 
	[
		{
			name: 'abram-inn',
			beType: BE_Type.ADVANCED,
			files: 
			{
				style: 'abram-inn/style',
				header: 'abram-inn/header',
				footer: 'abram-inn/footer',
				index: 'abram-inn/index',
				vars: 'abram-inn/vars',
			},
			menuConfig: 
			{
				//STATIC || SlIDELEFT || SLIDERIGHT || EXPAND
				mainStyle: Menu_Style.SLIDELEFT,
				subStyle: Menu_Style.EXPAND,
				//NONE || STATIC_ARROW || ANIMATED_ARROW || STATIC_PLUS || ANIMATED_PLUS || CHEVRON
				ddIconStyle: Dropdown_Icon_Style.CHEVRON,
			}
		}
		//...
	]
}

const sassVars = 
{
	containerWidth: '1260px',
	containerPadding: '24px',
	mobileWidth: '990px',
	rgbRed: 103, 
	rgbGreen: 177, 
	rgbBlue: 210
}

module.exports.BE_Type = BE_Type 
module.exports.Menu_Style = Menu_Style
module.exports.config = config
module.exports.sassVars = sassVars



