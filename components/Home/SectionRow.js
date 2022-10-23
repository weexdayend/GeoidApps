import { View, Text, FlatList } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/solid'
import * as Animatable from 'react-native-animatable'
import SectionCard from './SectionCard'

const SectionRow = ({data}) => {
  return (
    <View>
      {
        data.map((item, index) => (
          <View key={index}>
            <View className='flex-row mt-4 items-center justify-between px-4'>
              <View>
                <Text className='text-gray-800 font-bold text-lg'>{item.section}</Text>
              </View>

              <Icons.ArrowRightIcon fill={'#009245'} />
            </View>
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 20,
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
      }
    </View>
  )
}

export default SectionRow