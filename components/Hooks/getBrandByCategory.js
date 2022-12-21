import { useQuery } from '@tanstack/react-query'

const brandCategoryUrl = 'https://geoid-dev.taktikid.com/api/categories/'
const getBrandCategory = async (id) => {
    const response = await fetch(brandCategoryUrl+id+'/brands', {
        method: 'GET',
    }).then((response) => response.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetBrandCategory = (id) => {
    const { isLoading, data, isRefetching } = useQuery(['category-brand'], () => getBrandCategory(id))
    return { loadAsh: isLoading, data, isRefetching }
}