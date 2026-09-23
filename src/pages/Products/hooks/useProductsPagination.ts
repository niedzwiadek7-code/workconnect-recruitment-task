import { parseAsInteger, useQueryStates } from 'nuqs'

export const useProductsPagination = () =>
	useQueryStates(
		{
			page: parseAsInteger.withDefault(1),
			perPage: parseAsInteger.withDefault(5),
		},
		{
			history: 'replace',
		}
	)
