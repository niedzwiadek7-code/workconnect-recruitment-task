import React from 'react'

import { useFieldContext, useFieldErrors } from '.'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type Props = {
	label: string
	placeholder?: string
	min?: number
	max?: number
	step?: number
} & React.InputHTMLAttributes<HTMLInputElement>

const InputNumberField = ({
	label,
	placeholder,
	min,
	max,
	step,
	...inputProps
}: Props) => {
	const field = useFieldContext<number | null>()
	const { showError, messages } = useFieldErrors()

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value

		if (raw === '') {
			field.handleChange(null)
			return
		}

		const parsed = Number(raw)

		if (Number.isNaN(parsed)) {
			return
		}

		if (min !== undefined && parsed < min) {
			field.handleChange(min)
			return
		}

		if (max !== undefined && parsed > max) {
			field.handleChange(max)
			return
		}

		field.handleChange(parsed)
	}

	return (
		<Field className='flex flex-col justify-start gap-2'>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				type='number'
				value={field.state.value ?? ''}
				placeholder={placeholder}
				min={min}
				max={max}
				step={step}
				onChange={onChange}
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

export default InputNumberField
