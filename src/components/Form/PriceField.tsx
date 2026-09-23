import React from 'react'

import { useFieldContext } from '.'

import PriceInput from '@/components/Inputs/PriceInput.tsx'
import { Field, FieldError, FieldLabel } from '@/components/ui/field.tsx'

type Props = {
	label: string
	placeholder?: string
} & Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'id' | 'type' | 'value' | 'onChange' | 'onBlur'
>

const PriceField = ({ label, placeholder, ...inputProps }: Props) => {
	const field = useFieldContext<number | null>()

	const errors = field.state.meta.errors
	const uniqueMessages = [
		...new Set(errors.map((error) => error?.message ?? error)),
	]
	const isTouched = field.state.meta.isTouched
	const showError = isTouched && errors.length > 0

	return (
		<Field className='flex flex-col justify-start gap-2'>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<PriceInput
				id={field.name}
				value={field.state.value}
				onChange={(value) => field.handleChange(value)}
				onBlur={field.handleBlur}
				placeholder={placeholder}
				className='rounded-3xl bg-transparent px-3 py-1'
				{...inputProps}
			/>

			{showError && (
				<FieldError className='text-xs'>{uniqueMessages.join(', ')}</FieldError>
			)}
		</Field>
	)
}

export default PriceField
