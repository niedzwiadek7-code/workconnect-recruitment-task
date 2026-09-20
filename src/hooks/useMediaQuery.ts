import { useEffect, useMemo, useState } from 'react'

type MediaQuery = {
	width: number
	height: number
	isMobile: boolean
}

const useMediaQuery = (): MediaQuery => {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	const isMobile = useMemo(() => window.innerWidth < 768, [])

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return {
		width,
		height,
		isMobile,
	}
}

export default useMediaQuery
