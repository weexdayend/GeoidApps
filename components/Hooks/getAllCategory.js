import { useQuery } from '@tanstack/react-query'

const allCategoryUrl = 'https://geoid-dev.taktikid.com/api/categories'
const getAllCategory = async () => {
    const response = await fetch(allCategoryUrl, {
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