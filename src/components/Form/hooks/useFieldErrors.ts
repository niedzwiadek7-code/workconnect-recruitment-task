import { useFieldContext } from '../index'

export const useFieldErrors = () => {
	const field = useFieldContext()

	const errors = field.state.meta.errors
	const uniqueMessages = [
		...new Set(errors.map((error) => error?.message ?? error)),
	]
	const isTouched = field.state.meta.isTouched

	return {
		showError: isTouched && errors.length > 0,
		messages: uniqueMessages,
	}
}
