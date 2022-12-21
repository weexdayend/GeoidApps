import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { styles } from '../../fontStyles'
import { useNavigation } from '@react-navigation/native'

const ButtonBottom = () => {

  const navigation = useNavigation()

  return (
    <View className='w-screen p-4 pb-8 bg-white border-t border-[#009245]'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Placing')}
        className='w-full py-4 bg-[#009245] rounded-full items-center'
      >
        <Text style={styles.Bold} className='text-lg font-bold text-white'>Pesan sekarang!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonBottom