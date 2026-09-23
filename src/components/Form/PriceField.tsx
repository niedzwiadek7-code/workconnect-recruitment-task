import React from 'react'

import { useFieldContext } from '.'

import { Field, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'

type Props = {
	label: string
	placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const PriceField = ({ label, placeholder, ...inputProps }: Props) => {
	// TODO: should show 2 decimal places

	const field = useFieldContext<number | null>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value

		if (val === '') {
			field.handleChange(null)
			return
		}

		if (!/^\d*(\.\d{0,2})?$/.test(val)) {
			return
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
				onChange={handleChange}
				onBlur={field.handleBlur}
				className='rounded-3xl bg-transparent px-3 py-1'
				step='0.01'
				{...inputProps}
			/>
		</Field>
	)
}

export default PriceField
