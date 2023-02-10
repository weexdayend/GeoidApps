import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

const getAllCategory = async () => {
    const response = await fetch(`${BASE_URL}/categories`, {
        method: 'GET',
    }).then((response) => response.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetAllCategory = () => {
    const { isLoading, data } = useQuery(['list-category'], getAllCategory)
    return { loadAsh: isLoading, data }
}