import { Searches } from '@/@types/searches'
import { getAllSearchesAction } from '@/actions/searches/get-all-searches-action'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FormDeleteSearch } from '@/components/Form/DeleteSearch'
dayjs.extend(relativeTime)

const PageSearches = async () => {
	const { searches }: { searches: Searches } = await getAllSearchesAction()

	return (
		<div className='px-4 pb-16'>
			<header className='pb-4 pt-8 text-center'>
				<h3 className='text-2xl font-semibold'>Histórico de Pesquisas</h3>
				<p className='text-gray-600'>Você realizou {searches.length} pesquisas.</p>
			</header>
			<section className='grid gap-1'>
				{searches.map(search => (
					<div className='flex flex-col bg-white p-4 rounded-md' key={search.id}>
						<div className='flex justify-between items-start'>
							<div>
								{search.repositories !== null ? <Link href={`/admin/${search.username}/details`} className='font-bold text-lg text-primary'>{search.username}</Link> : <h3 className='font-semibold text-lg'>{search.username}</h3>}
								<p className='text-sm text-gray-600'>Searched for {dayjs().to(dayjs(search.created_at))}</p>
							</div>
							<div className='flex items-center gap-3'>
								{search.repositories !== null ? <span className='px-2 py-1 rounded-full bg-green-300 text-green-800 text-xs'>Success</span> : <span className='px-2 py-1 rounded-full bg-red-300 text-red-800 text-xs'>Fail</span>}
								<FormDeleteSearch id={search.id} />
							</div>
						</div>
						{search.repositories !== null ? <p className='flex gap-2 items-center pt-2'>Repositories: {search.repositories} <Link href={`/admin/${search.username}`}><LinkIcon className='w-4 h-4' /></Link></p> : null}
					</div>
				))}
			</section>
		</div>
	)
	
}

export default PageSearches