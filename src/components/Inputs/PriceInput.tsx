import React, { useState } from 'react'

import { Input } from '@/components/ui/input'

type Props = {
	value: number | null | undefined
	onChange: (value: number | null) => void
	onBlur?: () => void
} & Omit<
	React.ComponentProps<'input'>,
	'type' | 'value' | 'onChange' | 'onBlur'
>

const PRICE_INPUT_PATTERN = /^\d*(\.\d{0,2})?$/

const PriceInput = ({ value, onChange, onBlur, ...props }: Props) => {
	const [draft, setDraft] = useState<string | null>(null)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const raw = event.target.value

		if (raw === '') {
			setDraft('')
			onChange(null)
			return
		}

		if (!PRICE_INPUT_PATTERN.test(raw)) {
			return
		}

		setDraft(raw)

		const parsed = Number(raw)

		if (!Number.isNaN(parsed)) {
			onChange(parsed)
		}
	}

	const handleBlur = () => {
		onBlur?.()
		setDraft(null)
	}

	const displayValue =
		draft ?? (value === null || value === undefined ? '' : value.toFixed(2))

	return (
		<Input
			type='text'
			inputMode='decimal'
			value={displayValue}
			onChange={handleChange}
			onBlur={handleBlur}
			{...props}
		/>
	)
}

export default PriceInput
