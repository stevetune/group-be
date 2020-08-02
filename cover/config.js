const { BE_Type, Menu_Style } = require('../base/enum_types.js') 

const config = {
	properties: {
		'generic-place': {
			files: {
				stylesheet: 'cover_stylesheet.scss',
				header: 'cover_header.pug',
				footer: 'cover_footer.pug',
				data: 'content.js',
			},
			be: {
				/* ADVANCED, SMART */
				type: BE_Type.SMART,
				container_width: '1137px',
				// type: BE_Type.ADVANCED,
				// options: {
				// 	mobile_width: '1000px'
				// }
			},
			menu: {
				/* SLIDELEFT, PAGES, SLIDEDOWN, ACCORDION, SLIDERIGHT,CLASSIC_SMART */
				type: Menu_Style.CLASSIC_SMART,
				options: {
					has_close_btn: false,
					has_plus_minus: false
				}
			}
		}
	}
}

module.exports = { config }