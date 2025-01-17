import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Ecotrace Github',
	description: 'Search Profiles Github',
}

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={cn('min-h-screen font-sans antialiased', inter.className)}>
				{children}
				<Toaster />
			</body>
		</html>
	)
}
