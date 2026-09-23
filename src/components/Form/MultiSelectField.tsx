import { useFieldContext } from '.'

import { Badge } from '@/components/ui/badge'
import { Field, FieldLabel } from '@/components/ui/field'

type Props = {
	label: string
	items: { value: string; label: string }[]
}

const MultiSelectField = ({ label, items }: Props) => {
	const field = useFieldContext<string[]>()

	const selectedValues = field.state.value ?? []

	const handleChange = (value: string, checked: boolean) => {
		const next = checked
			? [...selectedValues, value]
			: selectedValues.filter((v) => v !== value)

		field.handleChange(next)
	}

	return (
		<Field className='flex flex-col justify-start gap-2'>
			<FieldLabel>{label}</FieldLabel>

			<div className='flex flex-wrap gap-2'>
				{items.map((item) => {
					const isSelected = selectedValues.includes(item.value)

					return (
						<label key={item.value}>
							<input
								type='checkbox'
								name={field.name}
								value={item.value}
								checked={isSelected}
								onChange={(event) =>
									handleChange(item.value, event.target.checked)
								}
								onBlur={field.handleBlur}
								className='peer sr-only'
							/>

							<Badge
								variant={isSelected ? 'default' : 'transparent'}
								className='cursor-pointer px-2 py-0.5 select-none peer-focus-visible:shadow-md peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50'
							>
								{item.label}
							</Badge>
						</label>
					)
				})}
			</div>
		</Field>
	)
}

export default MultiSelectField
