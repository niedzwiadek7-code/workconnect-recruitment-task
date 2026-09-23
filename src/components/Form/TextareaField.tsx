import React from 'react'

import { useFieldContext, useFieldErrors } from '.'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

type Props = {
	label: string
	placeholder: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextareaField = ({ label, placeholder, ...inputProps }: Props) => {
	const field = useFieldContext<string>()
	const { showError, messages } = useFieldErrors()

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
				<FieldError className='text-xs'>{messages.join(', ')}</FieldError>
			)}
		</Field>
	)
}

export default TextareaField
