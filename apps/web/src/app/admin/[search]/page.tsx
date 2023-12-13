import { Repositories } from '@/@types/accounts'
import { createSearchAction } from '@/actions/searches/create-search-action'
import { Link } from 'lucide-react'
import { redirect } from 'next/navigation'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const PageSearch = async ({ params }: { params: { search: string }}) => {
	const createSearch : { username: string, repositories: Repositories, error: string } = await createSearchAction({
		username: params.search
	})

	if(createSearch?.error) {
		redirect('/admin')
	}

	return (
		<div className='px-4 pb-8'>
			<header className='pb-4 pt-8 text-center'>
				<h3 className='flex items-center gap-2 justify-center text-2xl font-semibold'>Account: <span className='font-bold'>{createSearch.username}</span><a href={`/admin/${createSearch.username}/details`}><Link className='hover:text-primary' /></a></h3>
				<p className='text-gray-600'>Repositories: {createSearch.repositories.length}</p>
			</header>
			<section className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
				{createSearch.repositories.map(repository => (
					<div className='flex flex-col bg-white p-4 rounded-md hover:zoom-out-75' key={repository.id}>
						<div className='flex justify-between items-start'>
							<div className='flex flex-col'>
								<a href={repository.html_url} target='_blank' className='font-bold text-lg text-primary'>{repository.name}</a>
								<p className='text-sm text-gray-600 pb-2'>Last Updated {dayjs().to(dayjs(repository.updated_at))}</p>
								{repository.description ? <p>{repository.description}</p> : <p className='text-bold text-red-900'>No content available.</p>}
							</div>
							<div className='flex items-center gap-3'>
								{repository.language ? <span className='px-4 rounded-full bg-gray-200 text-xs py-1'>{repository.language}</span> : null}
							</div>
						</div>
					</div>
				))}
			</section>
		</div>
	)
}

export default PageSearch