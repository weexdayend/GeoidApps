import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const SectionCard = ({
  id,title,image,description,category,products
}) => {

  const navigation = useNavigation()
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
      <View className='relative mr-3'>
        <SkeletonPlaceholder>
          <View style={{ width: 224, height: 240, borderRadius: 12 }}></View>
        </SkeletonPlaceholder>
      </View>
    )
  }

  const RenderSection = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Brand', {
          id,title,image,description,category,products
        })}
        className='bg-white mr-3 rounded-xl'
      >
        <Image
          source={{
            uri: image,
          }}
          className='w-56 h-40 rounded-t-xl'
        />
        <View className='absolute top-2 left-2 p-2 px-4 bg-red-500 rounded-full'>
          <Text className='text-white text-sm'>Promo</Text>
        </View>
        <View className='w-56 h-20 px-3 pb-4'>
          <Text className='font-bold text-base pt-2'>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      {loading && <RenderSkeletons />}
      {!loading && <RenderSection />}
    </View>
  )
}

export default SectionCard