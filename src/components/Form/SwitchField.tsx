import { useFieldContext, useFieldErrors } from '.'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'

type Props = {
	label: string
}

const SwitchField = ({ label }: Props) => {
	const field = useFieldContext<boolean>()
	const { showError, messages } = useFieldErrors()

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

			{showError && (
				<FieldError className='text-xs'>{messages.join(', ')}</FieldError>
			)}
		</Field>
	)
}

export default SwitchField
