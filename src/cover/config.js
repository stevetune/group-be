const { BE_Type, Menu_Style } = require('../base/enum_types.js') 

const config = {
	production: false,
	props : {
		"generic-place": {
			type: BE_Type.ADVANCED,
			style: "s1_1",
			markup: "m1",
			vars: "v1",
			menuType: {
				style: Menu_Style.SLIDEDOWN,
				hasCloseBtn: true
			}
		},
		//...
	}
}

module.exports = { BE_Type, Menu_Style, config }