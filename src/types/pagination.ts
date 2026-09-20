export type Pagination = {
	page: number
	perPage: number
}

export type PaginationResponse<T> = {
	data: T[]
	total: number
}
