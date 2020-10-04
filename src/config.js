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
				//STATIC || SlIDELEFT || SLIDERIGHT || EXPAND
				mainStyle: Menu_Style.STATIC,
				subStyle: Menu_Style.STATIC
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
				//STATIC || SlIDELEFT || SLIDERIGHT || EXPAND
				mainStyle: Menu_Style.SLIDERIGHT,
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

module.exports.BE_Type = BE_Type 
module.exports.Menu_Style = Menu_Style
module.exports.config = config
module.exports.sassVars = sassVars



