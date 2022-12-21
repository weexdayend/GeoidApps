import React from 'react'

import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import { UseGetAllCategory } from '../Hooks/getAllCategory'

import { styles } from '../../fontStyles'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useNavigation } from '@react-navigation/native'

const CategoryRow = () => {

  const { loadAsh, data } = UseGetAllCategory()

  const navigation = useNavigation()

  // Generating Dummy Data
  const dummyData = Array.from({ length: 6 }, (v, i) => i)

  const RenderSkeletons = () => {
    return (
      <View className='relative mr-2'>
        <SkeletonPlaceholder>
          <View style={{ height: 96, width: 128, borderRadius: 12 }}></View>
        </SkeletonPlaceholder>
      </View>
    )
  }

  const RenderCategory = ({ id, image, title }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SelectedBrand', {id,title})}
        className='bg-white relative mr-2 rounded-xl'
      >
        <Image
          source={{
            uri: image,
          }}
          className='h-24 w-32 rounded-xl'
        />
        <View className='absolute bg-black/10 w-full h-full rounded-xl'>
          <Text style={styles.Bold} className='left-1 p-2 pr-4 text-white text-sm'>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  
  return (
    <View>
      {
        loadAsh ? (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={dummyData}
          renderItem={(key) => (
            <RenderSkeletons key={key} /> 
          )}
          keyExtractor={(index) => index}
        /> ) : (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          renderItem={({item}) => (
            <RenderCategory
              id={item.categoryID}
              title={item.categoryName}
              image={item.categoryImage} 
            />
          )}
          keyExtractor={(item, index) => item.categoryID + index}
        /> )
      }
    </View>
  )
}

export default CategoryRow