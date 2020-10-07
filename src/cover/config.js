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
	ANIMATED_PLUS: 4 
}

const config = 
{
	production: false,
	properties : 
	[
		{
			name: 'default-prop',
			beType: BE_Type.ADVANCED,
			files: 
			{
				style: 'default-prop/style',
				header: 'default-prop/header',
				footer: 'default-prop/footer',
				index: 'default-prop/index',
				vars: 'default-prop/vars',
			},
			menuConfig: 
			{
				//STATIC || SlIDELEFT || SLIDERIGHT || EXPAND
				mainStyle: Menu_Style.SLIDERIGHT,
				subStyle: Menu_Style.EXPAND,
				ddIconMainStyle: Dropdown_Icon_Style.ANIMATED_ARROW,
				ddIconSubStyle: Dropdown_Icon_Style.NONE
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



