import { useFieldContext } from '.'

import { Field, FieldLabel } from '@/components/ui/field.tsx'
import { Switch } from '@/components/ui/switch.tsx'

type Props = {
	label: string
}

const SwitchField = ({ label }: Props) => {
	const field = useFieldContext<boolean>()

	return (
		<Field
			orientation='horizontal'
			className='flex flex-row items-center justify-start gap-2'
		>
			<Switch
				id={field.name}
				checked={field.state.value}
				onCheckedChange={field.handleChange}
				onBlur={field.handleBlur}
			/>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
		</Field>
	)
}

export default SwitchField
