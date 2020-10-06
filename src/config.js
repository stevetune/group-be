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
			name: 'default-prop',
			beType: BE_Type.ADVANCED,
			files: 
			{
				style: 'default-prop/style1',
				header: 'default-prop/header1',
				footer: 'default-prop/footer1',
				index: 'default-prop/index1',
				vars: 'default-prop/vars1',
			},
			menuConfig: 
			{
				//STATIC || SlIDELEFT || SLIDERIGHT || EXPAND
				mainStyle: Menu_Style.SLIDERIGHT,
				subStyle: Menu_Style.EXPAND
			}
		},
		// {
		// 	name: 'menu-test',
		// 	beType: BE_Type.ADVANCED,
		// 	files:
		// 	{
		// 		style: 'prop2/style2',
		// 		header: 'prop2/header2',
		// 		footer: 'prop2/footer2',
		// 		index: 'prop2/index2',
		// 		vars: 'university-inn-corvallis/vars1'
		// 	},
		// 	menuConfig: 
		// 	{
		// 		//STATIC || SlIDELEFT || SLIDERIGHT || EXPAND
		// 		mainStyle: Menu_Style.SLIDERIGHT,
		// 		subStyle: Menu_Style.EXPAND
		// 	}
		// }
		//...
	]
}

const sassVars = 
{
	containerWidth: '1160px',
	containerPadding: '15px',
	mobileWidth: '990px',
	rgbRed: 103, 
	rgbGreen: 177, 
	rgbBlue: 210
}

module.exports.BE_Type = BE_Type 
module.exports.Menu_Style = Menu_Style
module.exports.config = config
module.exports.sassVars = sassVars



