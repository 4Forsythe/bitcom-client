/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'
import withPlaiceholder from '@plaiceholder/next'

const nextConfig = {
	async rewrites() {
		const isDevMode = process.env.NODE_ENV !== 'production'
		const API_BASE_URL = process.env.API_BASE_URL
		const API_GLOBAL_PREFIX = process.env.NEXT_PUBLIC_API_GLOBAL_PREFIX

		if (isDevMode) {
			return [
				{
					source: `${API_GLOBAL_PREFIX}/:path*`,
					destination: `${API_BASE_URL}/:path*`
				}
			]
		}
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '*'
			},
			{
				protocol: 'https',
				hostname: '*'
			}
		]
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
}

const withMDX = createMDX({
	// Add markdown plugins here, as desired
})

export default withPlaiceholder(withMDX(nextConfig))
