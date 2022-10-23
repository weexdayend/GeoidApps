import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import * as Animatable from 'react-native-animatable'

const CategoryCard = ({id, title, image}) => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const RenderSkeletons = () => {
    return (
      <View className='relative mr-2'>
        <SkeletonPlaceholder>
          <View style={{ height: 96, width: 128, borderRadius: 12 }}></View>
        </SkeletonPlaceholder>
      </View>
    )
  }

  const RenderCategory = () => {
    return (
      <TouchableOpacity
        className='bg-white relative mr-2 rounded-xl'
      >
        <Image
          source={{
            uri: image,
          }}
          className='h-24 w-32 rounded-xl'
        />
        <View className='absolute bg-black/10 w-full h-full rounded-xl'>
          <Text className='left-1 p-2 pr-4 text-white font-bold text-sm'>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      {loading && <RenderSkeletons />} 
      {!loading && <RenderCategory />}
    </View>
  )
}

export default CategoryCard