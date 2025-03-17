export type CloudResouceType = {
	_embedded: {
		sort: string
		items: CloudResouceItemType[]
	}
	name: string
	resource_id: string
	created: string
	modified: string
	path: string
	type: string
	revision: number
}

export type CloudResouceItemType = {
	antivirus_status: string
	size: number
	name: string
	created: string
	resource_id: string
	modified: string
	mime_type: string
	file: string
	media_type: string
	preview: string
	path: string
	type: string
	revision: number
}
