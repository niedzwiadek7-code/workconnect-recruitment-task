import React from 'react'

import { useFieldContext } from '.'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

type Props = {
	label: string
	placeholder: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextareaComponent = ({ label, placeholder, ...inputProps }: Props) => {
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
			<Textarea
				{...inputProps}
				id={field.name}
				value={field.state.value}
				placeholder={placeholder}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				className='field-sizing-fixed rounded-lg bg-transparent px-2.5 py-2'
				rows={3}
			/>
			{showError && (
				<FieldError className='text-xs'>{uniqueMessages.join(', ')}</FieldError>
			)}
		</Field>
	)
}

export default TextareaComponent
