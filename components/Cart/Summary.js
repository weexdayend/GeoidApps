import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import Currency from 'react-currency-formatter'
import { styles } from '../../fontStyles'
import { useDispatch } from 'react-redux'
import { setGrossAmount } from '../../reducer/cartSlice'

const Summary = ({totalPrice, totalDiscount, voucher}) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if(voucher.productId != null){
      dispatch(setGrossAmount(12000+6000+((totalPrice-totalDiscount)+Number(voucher.productPrice))))
    } else {
      dispatch(setGrossAmount(12000+6000+((totalPrice-totalDiscount))))
    }
  
    return () => {
      console.log('clear')
    }
  }, [])
  

  return (
    <View className='w-fit bg-white py-4 px-4 rounded-xl'>
      <View className='pb-2'>
        <Text style={styles.Semi} className='text-base'>Payment Summary</Text>
      </View>
      <View className='w-fit flex-row items-center justify-between p-2'>
        <Text style={styles.Regu}  className='text-gray-600'>Subtotal</Text>
        <View className='flex-row'>
          <Text style={styles.Regu} className='text-gray-400'>
            {
              totalDiscount == 0 ?
              <>
                (0)
              </>:
              <>
                (-<Currency quantity={totalDiscount} currency="IDR" pattern=" ##,### " />)
              </>
            }
          </Text>
          <Text style={styles.Regu} className='text-gray-600'>
            <Currency quantity={totalPrice-totalDiscount} currency="IDR" pattern=" ##,### " />
          </Text>
        </View>
      </View>
      <View className='w-fit flex-row items-center justify-between p-2'>
        <Text style={styles.Regu} className='text-gray-600'>Delivery fee</Text>
        <Text style={styles.Regu} className='text-gray-600'>
            <Currency quantity={12000} currency="IDR" pattern=" ##,### " />
        </Text>
      </View>
      <View className='w-fit flex-row items-center justify-between p-2'>
        <Text style={styles.Regu} className='text-gray-600'>Platform fee</Text>
        <Text style={styles.Regu} className='text-gray-600'>
            <Currency quantity={6000} currency="IDR" pattern=" ##,### " />
        </Text>
      </View>
      {
        voucher.productId != null &&
        <View className='w-fit flex-row items-center justify-between p-2'>
          <Text style={styles.Semi} className='text-gray-600'>Voucher</Text>
          <Text style={styles.Semi} className='text-gray-600'>
            <Currency quantity={Number(voucher.productPrice)} currency="IDR" pattern=" ##,### " />
          </Text>
        </View>
      }
      <View className='w-fit flex-row items-center justify-between p-2'>
        <Text style={styles.Bold} className='text-base'>Total</Text>
        <Text style={styles.Bold} className='text-base'>
          {
            voucher.productId != null ?
            <Currency quantity={12000+6000+((totalPrice-totalDiscount)+Number(voucher.productPrice))} currency="IDR" pattern=" ##,### " /> :
            <Currency quantity={12000+6000+(totalPrice-totalDiscount)} currency="IDR" pattern=" ##,### " />
          }
        </Text>
      </View>
    </View>
  )
}

export default Summary