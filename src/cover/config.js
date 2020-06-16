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
				style: Menu_Style.ACCORDION,
				hasCloseBtn: false
			}
		},
		//...
	}
}

module.exports = { config }