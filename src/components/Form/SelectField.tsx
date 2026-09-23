import { useFieldContext } from '.'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type Props = {
	label: string
	placeholder: string
	items: { value: string; label: string }[]
}

const SelectField = ({ label, placeholder, items }: Props) => {
	const field = useFieldContext<string | null>()

	const selectedValue = items.find(
		(item) => item.value === field.state.value
	)?.label

	const errors = field.state.meta.errors
	const uniqueMessages = [
		...new Set(errors.map((error) => error?.message ?? error)),
	]
	const isTouched = field.state.meta.isTouched
	const showError = isTouched && errors.length > 0

	return (
		<Field className='flex flex-col justify-start gap-2'>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Select
				value={field.state.value ?? ''}
				onValueChange={field.handleChange}
			>
				<SelectTrigger
					id={field.name}
					className='bg-trans'
					onBlur={field.handleBlur}
				>
					<SelectValue placeholder={placeholder}>{selectedValue}</SelectValue>
				</SelectTrigger>
				<SelectContent className='flex flex-col justify-start gap-2'>
					<SelectGroup>
						<SelectLabel>{placeholder}</SelectLabel>
						{items.map((item) => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

			{showError && (
				<FieldError className='text-xs'>{uniqueMessages.join(', ')}</FieldError>
			)}
		</Field>
	)
}

export default SelectField
