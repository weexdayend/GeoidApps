import { View, Text, ScrollView, Image, Animated, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../reducer/basketSlice'

import { UseGetProducts } from '../components/Hooks/getProducts'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'

import ProductCard from '../components/Brand/ProductCard'
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
      name,
    }
  } = useRoute()

  const items = useSelector(selectBasketItems)

  const [active, setActive] = useState('All')

  const [search, changeSearch] = useState('')
  const [filterItems, setFilterItems] = useState([])
  const [products, setProducts] = useState([])

  const [searchParam] = useState(["productName", "productUnit"])

  const { loadAsh, data, isRefecthing, isFetching } = UseGetProducts(id)

  const handleSearch = (data, search, selectedFilter) => {
    const filter = data.filter((value) => {
      if(value.productUnit == selectedFilter){
        return searchParam.some((newItem) => {
          return (
            value[newItem]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) > -1
          )
        })
      } else if (selectedFilter == 'All') {
        return searchParam.some((newItem) => {
          return (
            value[newItem]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) > -1
          )
        })
      }
    })
    setProducts(filter)
  }

  useEffect(() => {
    if(data){
      const menuItems = [...new Set(data.map((val) => val.productUnit))]
      setFilterItems(menuItems)
    }
    setProducts(data)
  }, [data])

  const RenderHeader = ({animHeaderValue}) => {
    const animateHeaderBackgroundColor = animHeaderValue.interpolate({
      inputRange: [25, 50, 100],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.95)'],
      extrapolate: 'clamp'
    })

    return (
      <Animated.View 
        style={{
          zIndex: 10,
          backgroundColor: animateHeaderBackgroundColor,
        }}
        className={Platform.OS === 'ios' ? 'absolute w-screen p-4 pt-14' : 'absolute w-screen p-4 pt-4'}
      >
        <View className='flex-row items-center space-x-4'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='p-3 bg-[#009245] rounded-full mr-1'
          >
            <Icons.ArrowLeftIcon fill={'#ffffff'} />
          </TouchableOpacity>

          <View className='flex-row flex-1 bg-white items-center rounded-full border border-[#009245]'>
            <View className='left-4 mr-2'>
              <Icons.MagnifyingGlassIcon fill={'#009245'} />
            </View>
            <TextInput
              placeholder='Cari produk...'
              onChangeText={text => changeSearch(text)}
              style={styles.Regu}
              value={search}
              clearButtonMode={true}
              className={Platform.OS === 'ios' ? 'flex-1 mx-3 p-2 py-4 leading-4' : 'flex-1 mx-3 p-2 py-3 leading-4'}
            />
          </View>
        </View>       
      </Animated.View>
    )
  }

  return (
    <View className='w-screen h-screen'>
      <RenderHeader animHeaderValue={scrollOffsetY} className='relative' />

      <ScrollView
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
              className='top-0 w-full h-72 bg-gray-300'
            /> :
            <Image
              source={{
                uri: image,
              }}
              resizeMethod='scale'
              resizeMode='cover'
              className='top-0 w-full h-72 bg-gray-300'
            />
          }
        </View>

        <View className='bg-white p-4 mb-4'>
          <View className='py-8'>
            <Text style={styles.Semi} className='text-gray-400 text-base'>{category}</Text>
            <Text style={styles.Bold} className='text-3xl text-[#009245]'>{name}</Text>
            <View className='mb-2'>
              <View className='flex-row p-2'>
                <Icons.ReceiptPercentIcon fill={'#fb923c'} />
                <Text style={styles.Bold} className='ml-2 text-orange-400 text-base'>
                  Discount untuk produk pilihan!
                </Text>
              </View>
            </View>
            <Text style={styles.Regu} className='text-gray-400 text-base'>{description}</Text>
          </View>
          <View className='flex flex-row flex-wrap'>
            <TouchableOpacity
              onPress={() => {
                setActive('All')
                handleSearch(data, search, 'All')
              }}
              className={`${active === 'All' ? 'bg-[#009245]' : 'border border-[#009245] bg-white'} px-4 py-1 rounded-full mr-2 mt-2`}
            >
              <Text style={styles.Semi} className={`${active === 'All' ? 'text-white' : 'text-[#009245]'}`}>ALL</Text>
            </TouchableOpacity>
            {
              isFetching ? (null) : (
                filterItems.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setActive(item)
                      handleSearch(data, search, item)
                    }}
                    key={index} className={`${active === item ? 'bg-[#009245]' : 'border border-[#009245] bg-white'} px-4 py-1 rounded-full mr-2 mt-2`}
                  >
                    <Text style={styles.Semi} className={`${active === item ? 'text-white' : 'text-[#009245]'}`}>{item}</Text>
                  </TouchableOpacity>
                ))
              )
            }
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