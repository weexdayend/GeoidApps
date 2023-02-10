import { View, Text, Animated, TouchableOpacity, Platform, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../../fontStyles'
import { UseGetProducts } from '../Hooks/getProducts'
import { useDispatch, useSelector } from 'react-redux'
import { selectActiveFilter, selectFilter, selectProduct, selectSearch, selectSearchParam, setActiveFilter, setFilter, setProduct } from '../../reducer/geoSlice'

const Header = ({animHeaderValue, id, data, name, category}) => {

  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [25, 50, 100],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 1)'],
    extrapolate: 'clamp'
  })

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const active = useSelector(selectActiveFilter)
  const filterItems = useSelector(selectFilter)
  const products = useSelector(selectProduct)
  const searchParam = useSelector(selectSearchParam)

  const [search, changeSearch] = useState('')
  const { isFetching } = UseGetProducts(id)

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
    dispatch(setProduct(filter))
  }

  const searchText = () => {
    if (search) {
      const filterData = products.filter((item) => {
        const itemData = item.productName.toLowerCase();
        const searchData = search.toLowerCase();
        return itemData.match(searchData);
      })
      console.log(filterData.length)
      if (filterData) {
        dispatch(setProduct(filterData))
      } else {
        dispatch(setProduct(data))
      }
    } else {
        dispatch(setProduct(data))
    }
  }

  const setSearch = search => {
    changeSearch(search)
    searchText()
  }

  useEffect(() => {
    if(data){
      const menuItems = [...new Set(data.map((val) => val.productUnit))]
      dispatch(setFilter(menuItems))
    }
    dispatch(setProduct(data))
  }, [data])

  useEffect(() => {
    if(!search){
      dispatch(setProduct(data))
    }
  }, [search])

  return (
    <Animated.View 
      style={{
        zIndex: 10,
        backgroundColor: animateHeaderBackgroundColor,
      }}
      className={`${Platform.OS === 'ios' ? 'absolute w-screen p-4 pt-14' : 'absolute w-screen p-4 pt-4'}`}
    >
      <View className='w-fit'>
          <View className='flex-row mt-2 flex-1 bg-white items-center rounded-full border border-[#009245]'>
            <View className='left-4 mr-2'>
              <Icons.MagnifyingGlassIcon fill={'#009245'} />
            </View>
            <TextInput
              placeholder='Cari produk...'
              onChangeText={(e) => setSearch(e)}
              style={styles.Regu}
              value={search}
              clearButtonMode={true}
              className={Platform.OS === 'ios' ? 'flex-1 mx-3 p-2 py-4 leading-4' : 'flex-1 mx-3 p-2 py-3 leading-4'}
            />
          </View>
          <View className='flex flex-row flex-wrap'>
            <TouchableOpacity
              onPress={() => {
                dispatch(setActiveFilter('All'))
                // setActive('All')
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
                      dispatch(setActiveFilter(item))
                      // setActive(item)
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
    </Animated.View>
  )
}

export default Header