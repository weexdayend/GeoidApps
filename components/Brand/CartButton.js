import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable'
import * as Icons from 'react-native-heroicons/solid'
import Currency from 'react-currency-formatter'
import { styles } from '../../fontStyles'

import { selectLog } from '../../reducer/profileSlice'
import { selectCartItems, sumTotalDiscount, sumTotalItem, sumTotalPrice } from '../../reducer/cartSlice'

const CartButton = () => {

  const navigation = useNavigation()
  const logUser = useSelector(selectLog)

  const [showView, setShowView] = useState(false)

  const items = useSelector(selectCartItems)
  const basketItem = useSelector(sumTotalItem)
  const basketTotal = useSelector(sumTotalPrice)
  const basketDiscount = useSelector(sumTotalDiscount) 
  
  useEffect(() => {
    if(items.length > 0){
      setShowView(true)
    } else {
      setShowView(false)
    }
  }, [items.length])

  return (
    <Animatable.View
      className={`absolute bottom-0 bg-white w-screen border-t border-[#009245] justify-center`}
    >
      <View className='flex-row'>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`w-20 ${showView ? 'bg-[#31704f]' : 'bg-[#009245]'} ml-4 my-4 mb-8 p-4 pl-6 rounded-l-full flex-row items-center`}
        >
          <Icons.ArrowLeftIcon fill={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={showView ? false : true}
          className={showView === true ? 'flex-1 bg-[#009245] mr-4 my-4 mb-8 p-4 rounded-r-full flex-row items-center' : 'flex-1 bg-[#767676] mr-4 my-4 mb-8 p-4 rounded-r-full flex-row items-center'}
          onPress={() => {
            if(logUser === false){
              navigation.navigate('Login')
            } else {
              navigation.navigate('Cart')
            }
          }}
        >
          <View className='flex-1 ml-4'>
            <Text style={styles.Regu} className='text-white text-xs text-left'>({basketItem} items)</Text>
            <Text style={styles.Bold} className='text-white text-base text-left'>
              <Currency quantity={basketTotal-basketDiscount} currency="IDR" pattern="##,### " />
            </Text>
          </View>
          <View className='flex-row items-center mr-2'>
            <Icons.ChevronRightIcon fill={'#ffffff'} />
          </View>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )
}

export default CartButton