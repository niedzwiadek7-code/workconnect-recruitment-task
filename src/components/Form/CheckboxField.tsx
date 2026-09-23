import { useFieldContext } from '.'

import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'

type Props = {
	label: string
}

const CheckboxField = ({ label }: Props) => {
	const field = useFieldContext<boolean>()

	return (
		<Field orientation='horizontal'>
			<FieldLabel
				htmlFor={field.name}
				className='flex flex-row items-center gap-2'
			>
				<Checkbox
					id={field.name}
					checked={field.state.value}
					onCheckedChange={(checked: boolean) => field.handleChange(checked)}
					onBlur={field.handleBlur}
				/>
				{label}
			</FieldLabel>
		</Field>
	)
}

export default CheckboxField
