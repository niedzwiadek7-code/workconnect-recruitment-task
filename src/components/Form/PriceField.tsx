import React from 'react'

import { useFieldContext, useFieldErrors } from '.'

import PriceInput from '@/components/Inputs/PriceInput'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

type Props = {
	label: string
	placeholder?: string
} & Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'id' | 'type' | 'value' | 'onChange' | 'onBlur'
>

const PriceField = ({ label, placeholder, ...inputProps }: Props) => {
	const field = useFieldContext<number | null>()
	const { showError, messages } = useFieldErrors()

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
				<FieldError className='text-xs'>{messages.join(', ')}</FieldError>
			)}
		</Field>
	)
}

export default PriceField
