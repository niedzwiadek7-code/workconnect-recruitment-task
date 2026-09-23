import { withForm } from '@/components/Form'
import { Separator } from '@/components/ui/separator.tsx'
import { productFormOpts } from '@/pages/Products/components/CreateProduct/form-options.ts'

const StockForm = withForm({
	...productFormOpts,
	render: ({ form }) => {
		return (
			<div className='flex flex-col gap-4'>
				<form.AppField
					name='available'
					children={(field) => (
						<field.SwitchField label='Produkt jest dostępny' />
					)}
				/>

				<Separator />

				<div className='flex flex-col gap-4 lg:flex-row'>
					<form.AppField
						name='limited'
						listeners={{
							onChange: (checked) => {
								if (!checked.value) {
									form.setFieldValue('stock', undefined)
								}
							},
						}}
						children={(field) => (
							<field.CheckboxField label='Produkt limitowany' />
						)}
					/>

					<form.Subscribe selector={(state) => state.values.limited}>
						{(limited) =>
							limited ? (
								<form.AppField
									name='stock'
									children={(field) => (
										<field.InputNumberField
											label='Ilość w magazynie'
											placeholder='10'
											step={1}
										/>
									)}
								/>
							) : (
								<></>
							)
						}
					</form.Subscribe>
				</div>

				<Separator />

				<div className='text-base font-medium'>Limity koszyka</div>

				<div className='flex flex-col gap-4 lg:flex-row'>
					<form.AppField
						name='minInCart'
						children={(field) => (
							<field.InputNumberField
								label='Minimalna ilość w koszyku'
								placeholder='1'
								step={1}
							/>
						)}
					/>

					<form.AppField
						name='maxInCart'
						children={(field) => (
							<field.InputNumberField
								label='Maksymalna ilość'
								placeholder='10'
								step={1}
							/>
						)}
					/>
				</div>
			</div>
		)
	},
})

export default StockForm
