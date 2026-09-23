import React from 'react'

import { useFieldContext } from '.'

import { Field, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'

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

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value

		if (val === '') {
			field.handleChange(null)
		}

		if (max && Number(val) > max) {
			val = max.toString()
		}

		if (min && Number(val) < min) {
			val = min.toString()
		}

		field.handleChange(Number(val))
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
		</Field>
	)
}

export default InputNumberField
