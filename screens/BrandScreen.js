import { View, Text, ScrollView, Image, Animated, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useRef } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'

import { UseGetProducts } from '../components/Hooks/getProducts'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'

import ProductCard from '../components/Brand/ProductCard'
import CartButton from '../components/Brand/CartButton'
import Header from '../components/Brand/Header'

import { useSelector } from 'react-redux'
import { selectProduct } from '../reducer/geoSlice'

const BrandScreen = () => {  

  let scrollOffsetY = useRef(new Animated.Value(0)).current;
    
  const {
    params: {
      id,
      image,
      description,
      category,
      name,
    }
  } = useRoute()

  const products = useSelector(selectProduct)
  const { data, isFetching } = UseGetProducts(id)

  return (
    <View className='w-screen h-screen'>
      <Header animHeaderValue={scrollOffsetY} id={id} data={data} name={name} category={category} className='relative' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY}}}],
          {useNativeDriver: false}
        )}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        <View className='relative'>
          {
            image === 'none' ?
            <Image
              source={{
                uri: 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg?ver=6',
              }}
              resizeMethod='scale'
              resizeMode='cover'
              className='top-0 w-full h-96 bg-gray-300'
            /> :
            <Image
              source={{
                uri: image,
              }}
              resizeMethod='scale'
              resizeMode='cover'
              className='top-0 w-full h-96 bg-gray-300'
            />
          }
        </View>

        <View className='bg-white p-4 mb-1'>
          <View className='py-8'>
            <View className='mb-2'>
            <Text style={styles.Bold} className='text-3xl text-[#009245]'>{name}</Text>
            <Text style={styles.Semi} className='text-gray-400 text-base'>{category}</Text>
            <Text style={styles.Regu} className='text-gray-400 text-base'>{description}</Text>
              <View className='flex-row p-2'>
                <Icons.ReceiptPercentIcon fill={'#fb923c'} />
                <Text style={styles.Bold} className='ml-2 text-orange-400 text-base'>
                  Discount untuk produk pilihan!
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <View>
          {
            isFetching ? (
              <View className='w-full h-20 mt-20'>
                <ActivityIndicator size="large" color="#009245" />
              </View>
            ) : (
              <>
                {
                  products?.map((item, index) => (
                    <ProductCard
                      key={index}
                      id={item.productID}
                      type={item.typeProduct}
                      name={item.productName}
                      image={item.productImage}
                      description={item.productDescription}
                      unit={item.productUnit}
                      price={Number(item.productPrice)}
                      discount={Number(item.productDiscount)}
                    />
                  ))
                } 
              </>
            )
          }
            
          </View>
      </ScrollView>

      {
        isFetching ? (null) : (<CartButton />)
      }
    </View>
  )
}

export default BrandScreen