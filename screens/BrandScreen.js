import { View, Text, ScrollView, Image, Button, SafeAreaView, Animated } from 'react-native'
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../reducer/basketSlice'

import * as Icons from 'react-native-heroicons/solid'
import * as Animatable from 'react-native-animatable'

import ProductCard from '../components/Brand/ProductCard'
import DynamicHeader from '../components/Brand/DynamicHeader'
import CartButton from '../components/Brand/CartButton'

const BrandScreen = () => {  

  let scrollOffsetY = useRef(new Animated.Value(0)).current;
    

  const navigation = useNavigation()
  const {
    params: {
      id,
      image,
      description,
      category,
      title,
      products,
    }
  } = useRoute()

  const items = useSelector(selectBasketItems)

  const [productsData, setProductsData] = useState([])
  const [searchProduct, setSearchProduct] = useState([])
  const [search, changeSearch] = useState()
  const [discount, setDiscount] = useState(false)

  const setProductData = () => {
    setProductsData(products)
    setSearchProduct(products)
  }

  const discountAvail = () => {
    const disc = products.reduce((total, item) => total += Number(item.productDiscount), 0)
    if(disc>0){
      setDiscount(!discount)
    }
  }

  useEffect(() => {
    try {
      setProductData()
      discountAvail()
    } catch(e) {
      console.log(e + ' error')
    }
  }, [])

  return (
    <SafeAreaView className='w-screen h-screen'>
      <DynamicHeader animHeaderValue={scrollOffsetY} className='relative' />

      <ScrollView
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
          <Image
            source={{
              uri: image,
            }}
            resizeMethod='scale'
            resizeMode='cover'
            className='top-0 w-full h-72 bg-gray-300'
          />
        </View>

        <View className='bg-white p-4 mb-4'>
          <View className='py-8'>
            <Text className='text-gray-400 text-sm font-medium'>{category}</Text>
            <Text className='text-xl font-bold text-[#009245]'>{title}</Text>
            <View className='mb-2'>
              {
                discount?
                <View className='flex-row p-2'>
                  <Icons.ReceiptPercentIcon fill={'#fb923c'} />
                  <Text className='ml-2 text-orange-400 font-bold text-base'>
                    Discount untuk produk pilihan!
                  </Text>
                </View>
                :
                null
              }
            </View>
            <Text className='text-gray-400 text-base'>{description}</Text>
          </View>
        </View>

        <View>
          {
            searchProduct.map((item, index) => (
              <ProductCard
                key={index}
                id={item.productID}
                name={item.productName}
                image={item.pathImage}
                description={item.description}
                variant={item.productVariant}
                price={Number(item.productPrice)}
                discount={Number(item.productDiscount)}
              />
            ))
          }
        </View>
      </ScrollView>

      <CartButton />
    </SafeAreaView>
  )
}

export default BrandScreen