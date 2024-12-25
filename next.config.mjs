/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'
import withPlaiceholder from '@plaiceholder/next'

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.API_BASE_URL}/:path*`
			}
		]
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
