import type { Config } from 'tailwindcss'

const config: Config = {
	mode: 'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			fontFamily: {
				'pt-sans': ['var(--font-pt-sans)', 'sans-serif'],
				'source-sans': ['var(--font-source-sans)', 'sans-serif']
			},
			fontSize: {
				xs: '0.8rem',
				sm: '0.9rem'
			}
		}
	},
	plugins: [require('tailwind-scrollbar'), require('@tailwindcss/typography')]
}

export default config
