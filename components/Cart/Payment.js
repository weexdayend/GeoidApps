import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { styles } from '../../fontStyles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectPayment } from '../../reducer/cartSlice'

const Payment = () => {

  const navigation = useNavigation()
  const payment = useSelector(selectPayment)

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Payment')}
      className='w-fit bg-green-50 py-4 px-4 rounded-xl border border-[#009245] mt-2'
    >    
      <View className='flex-row'>
        {
          payment.id != null ?
          <>
          <View className='flex-1 flex-row'>
            <Text style={styles.Semi} className='text-base'>{payment.name}</Text>
          </View>
          <View className='items-center justify-center pl-4'>
            <Text style={styles.Regu} className='text-base text-green-600'>Ganti metode</Text>
          </View>
          </>
          :
          <>
          <View className='flex-1 items-center'>
            <Text style={styles.Regu} className='text-base text-green-600'>Pilih metode pembayaran</Text>
          </View>
          </>
        }
      </View>
    </TouchableOpacity>
  )
}

export default Payment