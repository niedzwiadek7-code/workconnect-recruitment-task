import React from 'react'

import { useFieldContext } from '.'

import { Field, FieldError, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'

type Props = {
	label: string
	placeholder: string
} & React.InputHTMLAttributes<HTMLInputElement>

const TextField = ({ label, placeholder, ...inputProps }: Props) => {
	const field = useFieldContext<string>()

	const errors = field.state.meta.errors
	const uniqueMessages = [
		...new Set(errors.map((error) => error?.message ?? error)),
	]
	const isTouched = field.state.meta.isTouched
	const showError = isTouched && errors.length > 0

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
				<FieldError className='text-xs'>{uniqueMessages.join(', ')}</FieldError>
			)}
		</Field>
	)
}

export default TextField
