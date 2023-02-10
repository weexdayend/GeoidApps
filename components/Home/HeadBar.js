import { View, TextInput, TouchableOpacity, Animated, Platform, StatusBar } from 'react-native'
import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../../fontStyles'

import { useDispatch, useSelector } from 'react-redux'
import { selectLog, selectToken } from '../../reducer/profileSlice'
import { UseGetCart } from '../Hooks/cartSystem'
import { retrieveFromDB } from '../../reducer/cartSlice'

const HEADER_HEIGHT = Platform.OS === 'ios' ? 125 : 70 + StatusBar.currentHeight;

const HeadBar = ({offset}) => {

  const navigation = useNavigation()
  const logUser = useSelector(selectLog)

  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const { data, isSuccess } = UseGetCart(token)

  const diffClamp = Animated.diffClamp(offset, 0, HEADER_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    let tmpData = null
    if(isSuccess){
      tmpData = data
      if(tmpData){
        tmpData.map((item) => 
          delete item.productImage
        )
        dispatch(retrieveFromDB(tmpData))
      } else {
        dispatch(retrieveFromDB([]))
      }
    }
  }, [data])

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        backgroundColor: 'white',
        zIndex: 10,
        transform: [{translateY}],
        paddingTop: 65,
        borderBottomColor: '#009245',
        borderBottomWidth: 2,
      }}
    >
      <View className='flex'>
        <View className='flex-row justify-between pb-4 px-4 space-x-2'>
          <View className='flex-1 bg-gray-200 justify-center rounded-full px-4'>
            <TextInput
              placeholder='Ketik disini produk yang kamu cari...'
              onFocus={() => navigation.navigate('Search')}
              placeholderTextColor={'#383838'}
              style={styles.Regu}
              className='left-2 text-gray-800'
            />
          </View>
          <TouchableOpacity
            className='p-2 items-center'
            onPress={() => {
              if(logUser === false){
                navigation.navigate('Login')
              } else {
                navigation.navigate('Cart')
              }
            }}
          >
            <Icons.ShoppingCartIcon fill={'#009245'} size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

export default HeadBar