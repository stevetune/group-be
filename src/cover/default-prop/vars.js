module.exports = {


	website_url: 'https://fakehotelwebsite.com/',
	
	logo_url: 'https://www.placecage.com/150/100',

	menuData: [
		{
		  href: '#',
		  title: 'About Us'
		},
		{
			href: '#',
			title: 'Rooms', 
		  submenu: [
		    {
		      href: '#',
		      title: 'Guest Rooms & Suites'  
		    },
		    {
		      href: '#',
		      title: 'Group Bookings'
		    }
		  ]
		},
		{
		  href: '#',
		  title: 'Special Offers'
		},
		{
		  href: '#',
		  title: 'Amenities'
		},
		{
		  href: '#',
		  title: 'In The Area',
		  submenu: [
		  	{
		  		title: 'Things To Do',
		  		href: '#'
		  	},
		  	{
		  		title: 'Attractions',
		  		href: '#'
		  	},
		  	{
		  		title: 'Restaurants',
		  		href: '#'
		  	}
		  ]
		},
		{
		  href: '#',
		  title: 'Dining'
		},
		{
		  href: '#',
		  title: 'Pics'
		}
	],

	footer_section_1: {
		section_class: 'is-upper',
		sub_sections: [
			{		
				sub_section_class: 'is-upper-top',
				sub_section_objects: [
					{
						type: 'text',
						value: '<span class=\'footer-section--sub-section-header\'>Nick Cage Inn</span>'
					},
					{
						type: 'icon_with_anchor',
						value: {
								icon_class: 'fa fa-phone',
								outer_class: 'is-contact-info',
								text: '<span class=\'footer-section--sub-section-label\'>Phone: </span>1-555-753-4496'
						}
					},
					{
						type: 'icon_with_anchor',
						value: {
							icon_class: 'fa fa-envelope',
							outer_class: 'is-contact-info',
							text: '<span class=\'footer-section--sub-section-label\'>Email: </span>contact@nickcageinn.com',
							href: 'mailto:contact@nickcageinn.com'
						}
					},
					{
						type: 'icon_with_anchor',
						value: {
							icon_class: 'fa fa-map-marker',
							outer_class: 'is-contact-info',
							text: '<span class=\'footer-section--sub-section-label\'>Address: </span>12345 Hollywood Blvd, Hollywood, CA, 12345, USA'
						}
					}
				]
			},
			{
				sub_section_class: 'is-upper-bottom',
				sub_section_objects: [
					{
						type: 'icon_with_anchor',
						value: {
							href: 'https://www.facebook.com/',
							icon_class: 'fa fa-facebook-f'
						}
					},
					{
						type: 'icon_with_anchor',
						value: {
							href: 'https://www.tripadvisor.ca',
							icon_class: 'fa fa-tripadvisor'
						}
					}
				]
			}
		]
	},
	footer_section_2: {
		section_class: 'is-lower',
		sub_sections: [
			{
				sub_section_class: 'is-lower-top',
				sub_section_objects: [
					{
						type: 'list',
						value: [
							{
								href: '#',
								title: 'Reviews'
							},
							{
								href: '#',
								title: 'Location'
							},
							{
								href: '#',
								title: 'Policies'
							}
						]
					},
					{
						type: 'text',
						value: 'Powered By Vizlly'
					}
				]
			}
		]
	}
}



	
		

