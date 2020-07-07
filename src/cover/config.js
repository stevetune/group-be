const { BE_Type, Menu_Style } = require('../base/enum_types.js') 

const config = {
	production: false,
	properties : {
		"generic-place": {
			type: BE_Type.ADVANCED,
			style: "style1",
			header: "header1",
			footer: "footer1",
			index: "index1",
			vars: "vars1",
			menuType: {
				style: Menu_Style.ACCORDION,
				hasCloseBtn: false
			}
		},
		//...
	}
}

module.exports = { config }