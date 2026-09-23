import { withForm } from '@/components/Form'
import PriceInput from '@/components/Inputs/PriceInput.tsx'
import { Field, FieldLabel } from '@/components/ui/field.tsx'
import { productFormOpts } from '@/pages/Products/components/CreateProduct/form-options.ts'
import { vatEnum } from '@/schemas/product.ts'
import { calculateGrossPrice, calculateNetPrice } from '@/utils/price.ts'

const PriceForm = withForm({
	...productFormOpts,
	render: ({ form }) => {
		return (
			<>
				<form.Subscribe
					selector={(state) => ({
						price: state.values.price ?? null,
						vat: Number(state.values.vat ?? 0),
					})}
				>
					{({ price, vat }) => {
						const grossPrice =
							price === null ? null : calculateGrossPrice(price, vat)

						const handleGrossPriceChange = (gross: number | null) => {
							if (gross === null) {
								form.setFieldValue('price', undefined)
								return
							}

							form.setFieldValue('price', calculateNetPrice(gross, vat))
						}

						return (
							<div className='flex flex-col gap-4 lg:flex-row'>
								<form.AppField
									name='price'
									children={(field) => (
										<field.PriceField label='Cena netto' placeholder='0.00' />
									)}
								/>

								<Field className='flex flex-col justify-start gap-2'>
									<FieldLabel htmlFor='grossPrice'>Cena brutto</FieldLabel>

									<PriceInput
										id='grossPrice'
										value={grossPrice}
										onChange={handleGrossPriceChange}
										placeholder='0.00'
										className='rounded-3xl bg-transparent px-3 py-1'
									/>
								</Field>
							</div>
						)
					}}
				</form.Subscribe>

				<div className='flex flex-col gap-4 lg:flex-row'>
					<form.AppField
						name='vat'
						children={(field) => (
							<field.SelectField
								label='Stawka VAT'
								placeholder='23%'
								items={vatEnum.options.map((value) => ({
									value,
									label: `${value}%`,
								}))}
							/>
						)}
					/>

					<form.AppField
						name='currency'
						children={(field) => (
							<field.SelectField
								label='Waluta'
								placeholder='Wybierz walutę'
								items={[
									{ value: 'PLN', label: 'PLN' },
									{ value: 'USD', label: 'USD' },
									{ value: 'EUR', label: 'EUR' },
								]}
							/>
						)}
					/>
				</div>
			</>
		)
	},
})

export default PriceForm
