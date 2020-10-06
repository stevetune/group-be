module.exports = {


	website_url: "https://www.universityinncorvallis.com/",
	
	logo_url: 'https://reservations.verticalbooking.com/img_templ/img_stili_17522/logo.jpg',

	menuData: [
		{
			href: 'https://www.universityinncorvallis.com/covid-19.html',
			title: 'COVID-19'	
		},
		{
		  href: '#',
		  title: 'Accommodations',
		  submenu: [
		    {
		      href: 'https://www.universityinncorvallis.com/accommodations/guest-rooms-and-suites.html',
		      title: 'Guest Rooms & Suites'  
		    },
		    {
		      href: 'https://www.universityinncorvallis.com/accommodations/group-bookings.html',
		      title: 'Group Bookings'
		    }
		  ]
		},
		{
		  href: 'https://www.universityinncorvallis.com/extended-stay.html',
		  title: 'Extended Stay'
		},
		{
		  href: 'https://www.universityinncorvallis.com/special-offers.html',
		  title: 'Special Offers'
		},
		{
		  href: 'https://www.universityinncorvallis.com/amenities.html',
		  title: 'Amenities'
		},
		{
		  href: '#',
		  title: 'In The Area',
		  submenu: [
		  	{
		  		title: 'Things To Do',
		  		href: 'https://www.universityinncorvallis.com/in-the-area/things-to-do.html'
		  	},
		  	{
		  		title: 'Oregon State University',
		  		href: 'https://www.universityinncorvallis.com/in-the-area/oregon-state-university.html'
		  	},
		  	{
		  		title: 'Reser Stadium',
		  		href: 'https://www.universityinncorvallis.com/in-the-area/reser-stadium.html'
		  	}
		  ]
		},
		{
		  href: 'https://www.universityinncorvallis.com/dining.html',
		  title: 'Dining'
		},
		{
		  href: 'https://www.universityinncorvallis.com/gallery.html',
		  title: 'Gallery'
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
						value: '<span class=\'footer-section--sub-section-header\'>University Inn Corvallis</span>'
					},
					{
						type: 'icon_with_anchor',
						value: {
								icon_class: 'fa fa-phone',
								outer_class: 'is-contact-info',
								text: '<span class="icon--text-header">Phone: </span>1-541-753-4496'
						}
					},
					{
						type: 'icon_with_anchor',
						value: {
							icon_class: 'fa fa-envelope',
							outer_class: 'is-contact-info',
							text: '<span class="icon--text-header">Email: </span>corvallisuniversityinn@gmail.com',
							href: 'mailto:corvallisuniversityinn@gmail.com'
						}
					},
					{
						type: 'icon_with_anchor',
						value: {
							icon_class: 'fa fa-map-marker',
							outer_class: 'is-contact-info',
							text: '<span class="icon--text-header">Address: </span>350 SW FOURTH STREET, CORVALLIS, Oregon, 97333, USA'
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
							href: 'https://www.facebook.com/University-Inn-Corvallis-732506300230565/',
							icon_class: 'fa fa-facebook-f'
						}
					},
					{
						type: 'icon_with_anchor',
						value: {
							href: 'https://www.tripadvisor.ca/Hotel_Review-g51817-d8474814-Reviews-University_Inn_Corvallis-Corvallis_Oregon.html',
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
								href: 'https://www.universityinncorvallis.com/reviews.html',
								title: 'Reviews'
							},
							{
								href: 'https://www.universityinncorvallis.com/location.html',
								title: 'Location'
							},
							{
								href: 'https://www.universityinncorvallis.com/policies.html',
								title: 'Policies'
							}
						]
					},
					{
						type: 'image_with_anchor',
						value: {
							src: 'https://reservations.verticalbooking.com/img_templ/img_stili_17522/vizlly-icon.png',
							href: 'https://www.vizlly.com/',
							text: 'Powered By Vizlly'
						}
					}
				]
			}
		]
	}
}



	
		

