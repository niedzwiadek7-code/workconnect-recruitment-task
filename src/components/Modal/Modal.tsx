import type { ReactElement } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { type LucideIcon, XIcon } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button.tsx'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog.tsx'

export type ModalButtonProp = {
	label: string
	icon?: LucideIcon
	onClick: () => void
	side: 'left' | 'right'
	disabled?: boolean
	variant: VariantProps<typeof buttonVariants>['variant']
}

type Props = {
	title: string
	buttons: ModalButtonProp[]
	trigger: ReactElement
	children: ReactElement
	className?: string
	onClose?: () => void
}

const Modal = ({
	title,
	buttons,
	children,
	trigger,
	className,
	onClose,
}: Props) => {
	const leftButtons = buttons.filter((button) => button.side === 'left')
	const rightButtons = buttons.filter((button) => button.side === 'right')

	return (
		<Dialog
			onOpenChange={(open) => {
				if (!open) {
					onClose?.()
				}
			}}
		>
			<DialogTrigger render={trigger} />

			<DialogContent
				className={cn(
					'flex h-full min-h-0 flex-col justify-start gap-0 rounded-none p-0 lg:h-auto lg:rounded-lg lg:border lg:border-foreground/10 lg:bg-card',
					className
				)}
				showCloseButton={false}
			>
				<DialogHeader className='flex flex-row items-start gap-2 border-0 px-4 pt-6 pb-4 lg:border-b lg:py-6'>
					<DialogTitle className='grow text-base leading-none font-medium'>
						{title}
					</DialogTitle>
					<DialogClose
						render={
							<Button
								variant='ghost'
								size='icon-sm'
								className='size-4 cursor-pointer rounded-sm'
							/>
						}
					>
						<XIcon />
						<span className='sr-only'>Zamknij</span>
					</DialogClose>
				</DialogHeader>
				{children}
				<DialogFooter className='flex flex-row items-center justify-between gap-2 border-t p-4 lg:justify-between'>
					<div className='flex items-center justify-start gap-2'>
						{leftButtons.map((button, index) => (
							<Button
								key={index}
								onClick={button.onClick}
								variant={button.variant}
								disabled={button.disabled}
								className='cursor-pointer px-4 py-2 text-sm font-medium'
							>
								{button.icon && <button.icon />}
								{button.label}
							</Button>
						))}
					</div>

					<div className='flex items-center justify-end gap-2'>
						{rightButtons.map((button, index) => (
							<Button
								key={index}
								onClick={button.onClick}
								variant={button.variant}
								disabled={button.disabled}
								className='cursor-pointer px-4 py-2 text-sm font-medium'
							>
								{button.label}
								{button.icon && <button.icon size={16} />}
							</Button>
						))}
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default Modal
