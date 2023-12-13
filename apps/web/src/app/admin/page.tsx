import { FormGetSearch } from '@/components/Form/GetSearch'
import { Newspaper } from 'lucide-react'

const PageAdmin = () => {
	return (
		<div className='flex flex-col justify-between items-center py-16 px-6'>
			<FormGetSearch />
			<a href="/admin/searches" className='flex gap-2 items-center pt-8 text-primary'>
				<Newspaper className='w-4 h-4' />
				<span>Histórico de Buscas</span>
			</a>
		</div>
	)
}

export default PageAdmin