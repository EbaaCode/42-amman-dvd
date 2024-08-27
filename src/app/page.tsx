'use client'

import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'

const DvdScreen = () => {
	const [color, setColor] = useState('white')
	const [showConfetti, setShowConfetti] = useState(false)
	const [numberOfPieces, setNumberOfPieces] = useState(0)
	const hitEdgeRef = useRef(false)
	const hitCornerRef = useRef(false)
	const dvdRef = useRef<SVGSVGElement>(null)

	const colors = ['white', '#06f8aa', '#01bbbc', '#172db4', '#9836ad', '#f7af1f']
	let colorIndex = 0

	const getNextColor = () => {
		colorIndex = (colorIndex + 1) % colors.length
		return colors[colorIndex]
	}

	useEffect(() => {
		const moveLogo = () => {
			if (dvdRef.current) {
				const hRange = window.innerWidth - dvdRef.current.clientWidth
				const vRange = window.innerHeight - dvdRef.current.clientHeight
				const time = performance.now() * 0.15
				const x = Math.abs((time % (hRange * 2)) - hRange)
				const y = Math.abs((time % (vRange * 2)) - vRange)

				dvdRef.current.style.left = `${x}px`
				dvdRef.current.style.top = `${y}px`
				const padding = 20
				const cornerPadding = 10
				const isInCorner = (x <= cornerPadding || x >= hRange - cornerPadding) && (y <= cornerPadding || y >= vRange - cornerPadding)
				const isInEdge = x <= padding || x >= hRange - padding || y <= padding || y >= vRange - padding

				if (isInEdge) {
					if (!hitEdgeRef.current) {
						setColor(getNextColor())
						hitEdgeRef.current = true
					}
				} else {
					hitEdgeRef.current = false
				}

				if (isInCorner) {
					if (!hitCornerRef.current) {
						setColor(getNextColor())
						setShowConfetti(true)
						setNumberOfPieces(500)
						setTimeout(() => setNumberOfPieces(0), 2000)
						hitCornerRef.current = true
					}
				} else {
					hitCornerRef.current = false
				}
			}
			requestAnimationFrame(moveLogo)
		}
		requestAnimationFrame(moveLogo)
	}, [])

	return (
		<div className="relative w-screen h-screen overflow-hidden">
			{showConfetti && (
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
					numberOfPieces={numberOfPieces}
					recycle={false}
					onConfettiComplete={() => setShowConfetti(false)}
					style={{ pointerEvents: 'none' }}
				/>
			)}
			<svg ref={dvdRef} className="absolute" width="120" height="120" viewBox="0 -200 960 960" style={{ filter: `drop-shadow(0 0 40px ${color})` }}>
				<g fill={color}>
					<polygon points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1 32,279.1 " />
					<polygon points="597.9,114.2 762.7,-51.1 597.9,-51.1 " />
					<polygon points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 " />
					<polygon points="928,279.1 762.7,443.9 928,443.9 " />
				</g>
			</svg>
		</div>
	)
}

export default DvdScreen
