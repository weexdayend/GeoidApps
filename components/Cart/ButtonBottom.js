import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { styles } from '../../fontStyles'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { clearAll, retrieveFromMidtrans, selectAddress, selectPayment } from '../../reducer/cartSlice'

import { createOrder } from '../Hooks/createOrder'
import { selectToken } from '../../reducer/profileSlice'
import { useMutation } from '@tanstack/react-query'

const ButtonBottom = ({items, cart, voucher, fee, price, discount, gross}) => {

  const navigation = useNavigation()

  const dispatch = useDispatch()
  
  const token = useSelector(selectToken)
  const address = useSelector(selectAddress)
  const payment = useSelector(selectPayment)

  const cartInfo = [{
    info : {
      token: token, 
      address: address,
      payment: payment,
      items: items,
      cart: cart,
      voucher: voucher,
      fee: fee,
      price: price,
      discount: discount,
      gross: gross,
    }
  }]

  const mutation = useMutation(createOrder, {
    onSuccess: (data) => {
      if(data.code === 200) {
        dispatch(clearAll())
        dispatch(retrieveFromMidtrans(data))
        navigation.navigate('Placing')
      }
    }
  })

  const processOrder = () => {
    mutation.mutate(cartInfo)
  }

  return (
    <View className='w-screen p-4 pb-8 bg-white border-t border-[#009245]'>
      {
        Object.keys(address).length && Object.keys(payment).length ?
        (
          <TouchableOpacity
            onPress={() => processOrder()}
            className='w-full py-4 bg-[#009245] rounded-full items-center'
          >
            <Text style={styles.Bold} className='text-lg font-bold text-white'>Pesan sekarang!</Text>
          </TouchableOpacity>
        ) :
        (
          <TouchableOpacity
            disabled={true}
            className='w-full py-4 bg-[#585858] rounded-full items-center'
          >
            <Text style={styles.Bold} className='text-md font-bold text-white'>Pilih alamat dan metode pembayaran!</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default ButtonBottom