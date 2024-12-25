'use client'

import { NextPage } from 'next'
import { Exception } from '@/components/Exception'

interface ErrorProps {
	error: Error
	reset: () => void
}

const Error: NextPage<ErrorProps> = ({ error, reset }) => {
	return <Exception reset={reset}>{error.message}</Exception>
}

export default Error
