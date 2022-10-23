import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

const CategoryRow = ({data}) => {
  return (
    <View>
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
          <CategoryCard
            id={item.categoryID}
            title={item.categoryName}
            image={item.categoryImage}
          />
        )}
        keyExtractor={(item, index) => item.categoryID + index}
      />
    </View>
  )
}

export default CategoryRow