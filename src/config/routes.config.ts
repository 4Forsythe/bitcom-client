class ROUTES {
	private BASE_URL = '/'

	HOME = this.BASE_URL

	SEARCH = `${this.BASE_URL}search`
	CATALOG = `${this.BASE_URL}catalog`
	PRICES = `${this.BASE_URL}prices`
	TABLES = `${this.BASE_URL}tables`

	CART = `${this.BASE_URL}cart`
	WISHLIST = `${this.BASE_URL}wish-list`
	PRODUCT = `${this.BASE_URL}product`
	ADD_PRODUCT = `${this.BASE_URL}product/add-item`
	THANKS = `${this.CART}/thanks`

	PROFILE = `${this.BASE_URL}my`
	ARCHIVE = `${this.BASE_URL}my/archive`
	ORDERLIST = `${this.BASE_URL}my/order-list`
	UPLOAD_DOCX = `${this.BASE_URL}my/upload-docx`

	BLOG = `${this.BASE_URL}blog`
	ARTICLES = `${this.BASE_URL}articles`

	SERVICE = `${this.BASE_URL}service-center`
	ASSEMBLY = `${this.BASE_URL}build-pc`
	BUYING = `${this.BASE_URL}buying`
	UPGRADING = `${this.BASE_URL}upgrading`
	ABOUT = `${this.BASE_URL}about-us`
	POLICIES = `${this.BASE_URL}our-policies`

	SITEMAP = `${this.BASE_URL}sitemap.xml`
}

export const ROUTE = new ROUTES()
