import { productFormOpts } from './form-options'

import { withForm } from '@/components/Form'

const BasicForm = withForm({
	...productFormOpts,
	render: ({ form }) => {
		return (
			<>
				<div className='flex flex-col gap-4 lg:flex-row'>
					<form.AppField
						name='name'
						children={(field) => (
							<field.TextField
								label='Nazwa produktu'
								placeholder='np. MacBook Pro 14'
							/>
						)}
					/>

					<form.AppField
						name='sku'
						children={(field) => (
							<field.TextField
								label='SKU produktu'
								placeholder='np. MBP14M3PRO'
							/>
						)}
					/>
				</div>

				<div>
					<form.AppField
						name='description'
						children={(field) => (
							<field.Textarea
								label='Opis produktu'
								placeholder='Krótki opis produktu'
								rows={3}
							/>
						)}
					/>
				</div>

				<div className='flex flex-col gap-4 lg:flex-row'>
					<form.AppField
						name='producer'
						children={(field) => (
							<field.SelectField
								label='Producent'
								placeholder='Wybierz producenta'
								items={[
									{ value: 'apple', label: 'Apple' },
									{ value: 'samsung', label: 'Samsung' },
									{ value: 'sony', label: 'Sony' },
									{ value: 'bosch', label: 'Bosch' },
									{ value: 'xiaomi', label: 'Xiaomi' },
								]}
							/>
						)}
					/>

					<form.AppField
						name='category'
						children={(field) => (
							<field.SelectField
								label='Kategoria'
								placeholder='Wybierz kategorię'
								items={[
									{ value: 'computers', label: 'Computers' },
									{ value: 'phones', label: 'Phones' },
									{ value: 'rtv', label: 'RTV' },
									{ value: 'agd', label: 'AGD' },
									{ value: 'accessories', label: 'Accessories' },
								]}
							/>
						)}
					/>
				</div>

				<div>
					<form.AppField
						name='features'
						children={(field) => (
							<field.MultiSelectField
								label='Cechy produktu'
								items={[
									{ value: 'bluetooth', label: 'Bluetooth' },
									{ value: 'wifi', label: 'WiFi' },
									{ value: 'usbc', label: 'USB-C' },
									{ value: 'waterproof', label: 'Wodoodporny' },
									{ value: 'ecological', label: 'Eko' },
									{ value: 'premium', label: 'Premium' },
								]}
							/>
						)}
					/>
				</div>
			</>
		)
	},
})

export default BasicForm
