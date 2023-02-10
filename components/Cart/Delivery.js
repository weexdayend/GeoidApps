import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { styles } from '../../fontStyles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectAddress } from '../../reducer/cartSlice'

const Delivery = () => {

  const navigation = useNavigation()
  const address = useSelector(selectAddress)

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Address')}
      className='w-fit bg-green-50 py-4 px-4 rounded-xl border border-[#009245] mt-2'
    >
        
      <View className='flex-row'>
        { 
          address.id != null ?
          <>
          <View className='flex-1'>
            <Text style={styles.Semi} className='text-base font-semibold'>{address.name}</Text>
            <Text style={styles.Regu} className='text-base'>{address.detail}</Text>
            <Text style={styles.Regu} className='text-base text-gray-400'>{address.area}</Text>
            <Text style={styles.Regu} className='text base text-gray-400'>{address.code}, {address.city}</Text>
          </View>
          <View className='items-center justify-center pl-4'>
            <Text style={styles.Regu} className='text-base text-green-600'>Ganti alamat</Text>
          </View>
          </>
          :
          <>
          <View className='flex-1 items-center'>
            <Text style={styles.Regu} className='text-base text-green-600'>Pilih alamat pengiriman</Text>
          </View>
          </>
        }
      </View>
    </TouchableOpacity>
  )
}

export default Delivery