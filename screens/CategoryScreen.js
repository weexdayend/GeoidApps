import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React from 'react'

import { UseGetAllCategory } from '../components/Hooks/getAllCategory'

const CategoryScreen = () => {

  const { loadAsh, data } = UseGetAllCategory()

  return (
    <SafeAreaView>
      <View className="p-2">
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item}) => {
            return(
            <View className="flex-grow">
              <TouchableOpacity className="bg-white relative mx-2 my-2 rounded-lg">
                <Image
                  source={{
                    uri: item.categoryImage,
                  }}
                  className="h-20 w-fit rounded-lg"
                />
                <View className="absolute bg-black/10 w-full h-full rounded-lg">
                  <Text className="left-1 p-2 text-white font-bold text-xs">{item.categoryName}</Text>
                </View>
              </TouchableOpacity>
            </View>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default CategoryScreen