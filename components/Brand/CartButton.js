import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable'
import * as Icons from 'react-native-heroicons/solid'
import Currency from 'react-currency-formatter'
import { styles } from '../../fontStyles'

import { selectBasketDiscount, selectBasketItems, selectBasketTotal } from '../../reducer/basketSlice'
import { selectLog } from '../../reducer/profileSlice'

const CartButton = () => {

  const navigation = useNavigation()
  const logUser = useSelector(selectLog)

  const [showView, setShowView] = useState(false)
  const viewAnimate = useRef(null)

  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
  const basketDiscount = useSelector(selectBasketDiscount) 

  useEffect(() => {
    const animation = async () => {
      if(showView){
        if(viewAnimate.current)
          await viewAnimate.current.slideInUp(1000);
      } else {
        if(viewAnimate.current)
          await viewAnimate.current.slideOutDown(1000);
      }
    }

    animation()
  }, [showView, viewAnimate])
  
  useEffect(() => {
    if(items.length > 0){
      setShowView(true)
    } else {
      setShowView(false)
    }
  }, [items.length])

  return (
    <Animatable.View 
      ref={viewAnimate} 
      className={showView === true ? 'absolute bottom-0 bg-white w-screen border-t border-[#009245] justify-center' : 'absolute bottom-0 bg-white w-screen'}
    >
      <View>
        <TouchableOpacity
          className={showView === true ? 'bg-[#009245] mx-4 my-4 mb-8 p-4 rounded-full flex-row items-center' : 'bg-[#009245] mx-4 my-4 p-4 rounded-full flex-row items-center'}
          onPress={() => {
            if(logUser === false){
              navigation.navigate('Login')
            } else {
              navigation.navigate('Cart')
            }
          }}
        >
          <View className='flex-1 ml-4'>
            <Text style={styles.Regu} className='text-white text-xs text-left'>Subtotal ({items.length})</Text>
            <Text style={styles.Bold} className='text-white text-base text-left'>
              <Currency quantity={basketTotal-basketDiscount} currency="IDR" pattern="##,### " />
            </Text>
          </View>
          <View className='flex-row items-center mr-2'>
            <Text style={styles.Regu} className='text-white text-base mr-2 leading-4'>Keranjang</Text>
            <Icons.ChevronRightIcon fill={'#ffffff'} />
          </View>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )
}

export default CartButton