import { useQuery } from '@tanstack/react-query'

const homeSectionUrl = 'https://geoid-dev.taktikid.com/api/products/section'
const getHomeSection = async () => {
    const response = await fetch(homeSectionUrl, {
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