import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../../fontStyles'
import { useNavigation } from '@react-navigation/native'

const HeadBar = () => {

  const navigation = useNavigation()

  return (
    <View className='flex-row justify-between p-5 border-b border-[#009245] bg-white shadow-xs'>
      <View className='relative'>
        <Text style={styles.Bold} className='text-lg font-bold'>Isi keranjang kamu</Text>
        <Text style={styles.Regu} className='text-base text-center text-gray-400'>Cek kembali barang nya ya!</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className='absolute bg-[#009245] p-2 rounded-full top-6 right-5'
      >
        <Icons.XMarkIcon fill={'#ffffff'} size={32} />
      </TouchableOpacity>
    </View>
  )
}

export default HeadBar