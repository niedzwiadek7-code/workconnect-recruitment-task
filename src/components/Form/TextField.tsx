import React from 'react'

import { useFieldContext, useFieldErrors } from '.'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type Props = {
	label: string
	placeholder: string
} & React.InputHTMLAttributes<HTMLInputElement>

const TextField = ({ label, placeholder, ...inputProps }: Props) => {
	const field = useFieldContext<string>()
	const { showError, messages } = useFieldErrors()

	return (
		<Field className='flex flex-col justify-start gap-2'>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				value={field.state.value}
				placeholder={placeholder}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				className='rounded-3xl bg-transparent py-1 pr-2.5 pl-3'
				{...inputProps}
			/>

			{showError && (
				<FieldError className='text-xs'>{messages.join(', ')}</FieldError>
			)}
		</Field>
	)
}

export default TextField
