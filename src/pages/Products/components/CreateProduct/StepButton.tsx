import { cn } from 'cn'
import { Check } from 'lucide-react'

type Props = {
	step: number
	label: string
	description: string
	actualStep: number
}

const StepButton = ({ step, label, description, actualStep }: Props) => {
	const isActive = actualStep >= step

	return (
		<div className='flex items-center gap-3'>
			<div
				className={cn(
					'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
					isActive
						? 'bg-primary text-primary-foreground'
						: 'border bg-accent text-muted-foreground'
				)}
			>
				{actualStep > step ? <Check /> : step}
			</div>
			<div className='flex flex-col gap-0.5'>
				<div className={isActive ? 'text-foreground' : 'text-muted-foreground'}>
					{label}
				</div>
				<div className='text-muted-xs'>{description}</div>
			</div>
		</div>
	)
}

export default StepButton
