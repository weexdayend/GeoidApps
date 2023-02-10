import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

const getHomeSection = async () => {
    const response = await fetch(`${BASE_URL}/products/section`, {
        method: 'GET',
    }).then((response) => response.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetHomeSection = () => {
    const { isLoading, data } = useQuery(['home-section'], getHomeSection)
    return { loadAsh: isLoading, data }
}