import { View, Text, FlatList, TouchableOpacity, Image, Platform, StatusBar } from 'react-native'
import React from 'react'

import { UseGetBrandCategory } from '../components/Hooks/getBrandByCategory'
import { useNavigation, useRoute } from '@react-navigation/native'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles' 
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const HEADER_HEIGHT = Platform.OS === 'ios' ? 125 : 70 + StatusBar.currentHeight;

const CategoryBrandScreen = () => {

  const {
    params: {
      id,
      title,
    }
  } = useRoute()

  const navigation = useNavigation()
  
  const { loadAsh, data, isRefetching } = UseGetBrandCategory(id)

  // Generating Dummy Data
  const dummyData = Array.from({ length: 6 }, (v, i) => i)

  const RenderSkeletons = () => {
    return (
      <View className="flex-grow">
        <TouchableOpacity className="relative mx-2 my-2 rounded-lg">
          <SkeletonPlaceholder>
            <View style={{ height: 80, width: '100%', borderRadius: 8 }}></View>
          </SkeletonPlaceholder>
        </TouchableOpacity>
      </View>
    )
  }

  const RenderEmpty = () => {
    return (
      <View className="flex top-1/2 items-center p-6">
        <Image
            source={require('../assets/img/sammy-43.png')}
            className="h-72"
          />
          <Text className="text-base font-medium">Waduh sepertinya belum ada produk nih.</Text>
      </View>
    )
  }

  const RenderData = ({item}) => {
    return (
      <View className="flex-grow">
        <TouchableOpacity 
          onPress={() => navigation.navigate('Brand', {
            id: item.brandID,
            name: item.brandName,
            image: item.brandImage,
            description: item.brandDescription,
            category: item.brandCategory,
          })}
          className="bg-white relative mx-2 my-2 rounded-lg">
          {
            item.brandImage === 'none' ?
            <Image
              source={{
                uri: 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg?ver=6',
              }}
              className="h-20 w-fit rounded-lg"
            /> :
            <Image
              source={{
                uri: item.brandImage,
              }}
              className="h-20 w-fit rounded-lg"
            />
          }
          <View className="absolute bg-black/10 w-full h-full rounded-lg">
            <Text className="left-0 -top-2 p-3 text-white font-bold text-base">{item.brandName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className="w-screen h-screen">
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        backgroundColor: 'white',
        zIndex: 10,
        paddingTop: 65,
        borderBottomColor: '#009245',
        borderBottomWidth: 2,
        paddingHorizontal: 16,
      }}>
        <View className="flex">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <View className='items-center p-2'>
              <Text style={styles.Bold} className='text-base text-[#009245]'>{title}</Text>
            </View>
            
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='absolute p-2'
            >
              <Icons.ArrowLeftIcon className="w-10 text-[#009245]" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-2">
        {
          loadAsh || isRefetching ?
          (
            <FlatList
              contentContainerStyle={
                Platform.OS === 'ios' ? 
                {
                  marginTop: 125,
                  paddingBottom: 150,
                } :
                {
                  marginTop: 120,
                  paddingBottom: 150,
              }}
              showsVerticalScrollIndicator={false}
              data={dummyData}
              numColumns={2}
              renderItem={() => {
                return(
                  <RenderSkeletons />
                )
              }}
            />
          ) : data === null ?
          (<RenderEmpty />) :
          (
            <FlatList
              contentContainerStyle={
                Platform.OS === 'ios' ? 
                {
                  marginTop: 125,
                  paddingBottom: 150,
                } :
                {
                  marginTop: 120,
                  paddingBottom: 150,
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              numColumns={2}
              renderItem={({item}) => {
                return(
                  <RenderData item={item} />
                )
              }}
            />
          )
        }
      </View>
    </View>
  )
}

export default CategoryBrandScreen