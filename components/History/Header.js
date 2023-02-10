import { View, Text, Platform, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../../fontStyles'

const HEADER_HEIGHT = Platform.OS === 'ios' ? 125 : 70 + StatusBar.currentHeight;

const Header = () => {

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        backgroundColor: 'white',
        zIndex: 10,
        paddingTop: 55,
        borderBottomColor: '#009245',
        borderBottomWidth: 2,
      }}
    >
      <View className='flex-row items-center space-x-4 left-4'>
        <View className='flex-1'>
          <Text style={styles.Bold} className='text-3xl text-[#009245]'>History Order</Text>
          <Text style={styles.Semi} className='text-gray-400 -base'>Aktivitas Transaksi Kamu</Text>
        </View>
      </View>
    </View>
  )
}

export default Header