export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-primary">
			<svg
				fill="currentColor"
				width="100"
				height="100"
				viewBox="0 0 50 50"
			>
				<g transform="translate(25,25)">
					<g transform="rotate(0)">
						<circle
							cx="12"
							cy="0"
							r="3"
						>
							<animate
								attributeName="r"
								values="3;4;3"
								dur="1s"
								repeatCount="indefinite"
								begin="0s"
							></animate>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0"
							to="360"
							dur="2s"
							repeatCount="indefinite"
						></animateTransform>
					</g>
					<g transform="rotate(120)">
						<circle
							cx="12"
							cy="0"
							r="3"
						>
							<animate
								attributeName="r"
								values="3;4;3"
								dur="1s"
								repeatCount="indefinite"
								begin="0.3s"
							></animate>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="120"
							to="480"
							dur="2s"
							repeatCount="indefinite"
						></animateTransform>
					</g>
					<g transform="rotate(240)">
						<circle
							cx="12"
							cy="0"
							r="3"
						>
							<animate
								attributeName="r"
								values="3;4;3"
								dur="1s"
								repeatCount="indefinite"
								begin="0.6s"
							></animate>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="240"
							to="600"
							dur="2s"
							repeatCount="indefinite"
						></animateTransform>
					</g>
				</g>
			</svg>
		</div>
	)
}
