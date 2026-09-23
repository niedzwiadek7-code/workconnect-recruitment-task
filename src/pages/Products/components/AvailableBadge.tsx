import { Badge } from '@/components/ui/badge'

type Props = {
	available: boolean
}

const AvailableBadge = ({ available }: Props) => {
	if (available) {
		return <Badge variant='success'>Dostępny</Badge>
	}

	return <Badge variant='destructive'>Niedostępny</Badge>
}

export default AvailableBadge
