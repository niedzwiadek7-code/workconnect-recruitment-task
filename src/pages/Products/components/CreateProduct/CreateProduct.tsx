import { useCallback, useMemo, useState } from 'react'
import { useSelector } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cn } from 'cn'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'

import { productFormOpts } from './form-options'

import { mockProductsApi } from '@/api/mock/productsApi'
import { useAppForm } from '@/components/Form'
import Modal, { type ModalButtonProp } from '@/components/Modal/Modal'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/toast'
import BasicForm from '@/pages/Products/components/CreateProduct/BasicForm'
import PriceForm from '@/pages/Products/components/CreateProduct/PriceForm'
import StepButton from '@/pages/Products/components/CreateProduct/StepButton'
import StockForm from '@/pages/Products/components/CreateProduct/StockForm'
import { type Product, productSchema } from '@/schemas/product'

const stepFields: Record<number, (keyof Product)[]> = {
	1: ['name', 'sku', 'description', 'producer', 'category', 'features'],
	2: ['price', 'vat', 'currency'],
	3: ['available', 'limited', 'stock', 'minInCart', 'maxInCart'],
}

const CreateProduct = () => {
	const [step, setStep] = useState<number>(1)
	const [openModal, setOpenModal] = useState<boolean>(false)

	const queryClient = useQueryClient()

	const createProduct = useMutation({
		mutationFn: (product: Product) => mockProductsApi.createProduct(product),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['products'],
			})

			setOpenModal(false)

			toast.add({
				title: 'Produkt został dodany',
				type: 'success',
			})
		},
	})

	const form = useAppForm({
		...productFormOpts,
		validators: {
			onSubmit: productSchema,
			onChange: productSchema,
		},
		onSubmit: async ({ value }) => {
			createProduct.mutate(value as Product)
		},
	})

	const currentStepIsValid = useSelector(form.store, (state) =>
		stepFields[step].every((name) => {
			return (
				!state.errorMap.onChange?.[name] && !state.errorMap.onSubmit?.[name]
			)
		})
	)

	const validateStep = useCallback(
		async (currentStep: number) => {
			const fields = stepFields[currentStep as keyof typeof stepFields]
			await Promise.all(
				fields.map((name) => form.validateField(name, 'submit'))
			)
			return fields.every((name) => !form.getFieldMeta(name)?.errors?.length)
		},
		[form]
	)

	const handleStep = useCallback(
		async (nextStep: number) => {
			if (nextStep < step) {
				setStep(nextStep)
				return
			}

			if (await validateStep(step)) {
				setStep(nextStep)
			}
		},
		[step, validateStep]
	)

	const buttons = useMemo<ModalButtonProp[]>(() => {
		if (step === 1) {
			return [
				{
					label: 'Dalej',
					onClick: () => handleStep(2),
					side: 'right',
					variant: 'default',
					disabled: !currentStepIsValid,
					icon: ArrowRight,
				},
			]
		}

		if (step === 2) {
			return [
				{
					label: 'Dalej',
					onClick: () => handleStep(3),
					side: 'right',
					variant: 'default',
					disabled: !currentStepIsValid,
					icon: ArrowRight,
				},
				{
					label: 'Poprzedni',
					onClick: () => handleStep(1),
					side: 'left',
					variant: 'transparent',
					icon: ArrowLeft,
				},
			]
		}

		return [
			{
				label: 'Zapisz produkt',
				onClick: () => form.handleSubmit(),
				side: 'right',
				variant: 'default',
				disabled: !currentStepIsValid,
				loading: createProduct.isPending,
			},
			{
				label: 'Poprzedni',
				onClick: () => handleStep(2),
				side: 'left',
				variant: 'transparent',
				icon: ArrowLeft,
			},
		]
	}, [step, currentStepIsValid, form, handleStep, createProduct.isPending])

	const resetForm = () => {
		form.reset()
		setStep(1)
	}

	return (
		<Modal
			title='Dodaj nowy produkt'
			buttons={buttons}
			trigger={
				<Button variant='default' className='cursor-pointer border px-4 py-2'>
					<Plus />
					Dodaj produkt
				</Button>
			}
			className='h-full min-w-full lg:h-auto lg:min-w-180'
			onClose={resetForm}
			open={openModal}
			setOpen={setOpenModal}
		>
			<div className='flex min-h-0 grow flex-col'>
				<div className='mx-4 flex shrink-0 items-center gap-4 overflow-x-auto border-y py-3 lg:mx-0 lg:border-y-0 lg:border-b lg:px-4 lg:py-3'>
					<StepButton
						step={1}
						label='Informacje'
						description='Dane podstawowe'
						actualStep={step}
					/>
					<Separator
						className={cn('min-w-0 flex-1', step > 1 && 'bg-primary')}
					/>
					<StepButton
						step={2}
						label='Cena'
						description='Dane podstawowe'
						actualStep={step}
					/>
					<Separator
						className={cn('min-w-0 flex-1', step > 2 && 'bg-primary')}
					/>
					<StepButton
						step={3}
						label='Dostępność'
						description='Stany magazynowe'
						actualStep={step}
					/>
				</div>

				<div className='flex min-h-0 grow flex-col gap-4 overflow-y-auto px-4 py-4 lg:py-5'>
					{step === 1 && <BasicForm form={form} />}
					{step === 2 && <PriceForm form={form} />}
					{step === 3 && <StockForm form={form} />}
				</div>
			</div>
		</Modal>
	)
}

export default CreateProduct
