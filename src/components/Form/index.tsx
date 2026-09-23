import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import CheckboxField from './CheckboxField'
import InputNumberField from './InputNumberField'
import MultiSelectField from './MultiSelectField'
import PriceField from './PriceField'
import SelectField from './SelectField'
import SwitchField from './SwitchField'
import Textarea from './Textarea'
import TextField from './TextField'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		TextField,
		Textarea,
		SelectField,
		MultiSelectField,
		PriceField,
		InputNumberField,
		SwitchField,
		CheckboxField,
	},
	formComponents: {
		// SubmitButton,
	},
	fieldContext,
	formContext,
})

export type AppForm = ReturnType<typeof useAppForm>
