import React from 'react'

import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import { UseGetHomeSection } from '../Hooks/getHomeSection'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../../fontStyles'
import { useNavigation } from '@react-navigation/native'

const SectionRow = () => {

  const { loadAsh, data } = UseGetHomeSection()
  const navigation = useNavigation()

  // Generating Dummy Data
  const dummyData = Array.from({ length: 4 }, (v, i) => i)

  const RenderSkeletons = () => {
    return (
      <View className='relative mr-3'>
        <SkeletonPlaceholder>
          <View style={{ width: 224, height: 240, borderRadius: 12 }}></View>
        </SkeletonPlaceholder>
      </View>
    )
  }

  const RenderSection = ({id, name, image, description, category, products}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Brand', {
          id: id,
          name: name,
          image: image,
          description: description,
          category: category
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
          <Text style={styles.Semi} className='text-white text-sm leading-4'>Promo</Text>
        </View>
        <View className='w-56 h-20 px-3 pb-4'>
          <Text style={styles.Bold} className='text-base pt-2'>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      {
        loadAsh ? (
          <View>
            <View className='flex-row items-center justify-between px-4'>
              <SkeletonPlaceholder>
                <View style={{ width: 175, height: 25, borderRadius: 12 }}></View>
              </SkeletonPlaceholder>

              <SkeletonPlaceholder>
                <View style={{ width: 50, height: 25, borderRadius: 12 }}></View>
              </SkeletonPlaceholder>
            </View>
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 15,
                paddingBottom: 20,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={dummyData}
              renderItem={({key}) => (
                <RenderSkeletons key={key}/>
              )}
            />
          </View>
        ) : (
          <>
            { data.map((item, key) => (
              <View key={key}>
                <View className='flex-row items-center justify-between px-4'>
                  <View>
                    <Text style={styles.Bold} className='text-gray-800 text-lg'>{item.section}</Text>
                  </View>

                  <Icons.ArrowRightIcon fill={'#009245'} />
                </View>
                <FlatList
                  contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingTop: 15,
                    paddingBottom: 20,
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={item.bodySection}
                  renderItem={({item, index}) => (
                    <RenderSection
                      key={index}
                      id={item.brandID}
                      name={item.brandName}
                      image={item.brandImage}
                      description={item.brandDescription}
                      category={item.brandCategory}
                    />
                  )}
                />
              </View>
            )) }
          </>
        )
      }



      {/* {
        data.map((item, index) => (
          <View key={index}>
            <View className='flex-row items-center justify-between px-4'>
              <View>
                <Text style={styles.Bold} className='text-gray-800 text-lg'>{item.section}</Text>
              </View>

              <Icons.ArrowRightIcon fill={'#009245'} />
            </View>
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 15,
                paddingBottom: 20,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={item.bodySection}
              renderItem={({item, index}) => (
                <SectionCard
                  key={index}
                  id={item.id}
                  title={item.brandName}
                  image={item.pathImage}
                  description={item.brandDescription}
                  category={item.brandCategory}
                  products={item.product}
                />
              )}
            />
          </View>
        ))
      } */}
    </View>
  )
}

export default SectionRow