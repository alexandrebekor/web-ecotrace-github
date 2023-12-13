import { Header } from '@/components/Header'
import { Search } from 'lucide-react'
import Link from 'next/link'

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex flex-col min-h-screen bg-gray-200">
			<Header />
			{children}
			<Link href="/admin" className='fixed right-3 bottom-3 bg-primary text-white rounded-full p-4'>
				<Search className='w-8 h-8' />
			</Link>
		</main>
	)
}

export default LayoutAdmin