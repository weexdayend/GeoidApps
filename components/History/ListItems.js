import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/solid'
import Currency from 'react-currency-formatter'
import { styles } from '../../fontStyles'

const ListItems = ({data}) => {

  var items = data.dataProduct.reduce((total, item) => total += Number(item.productItem), 0)
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date(data.transaction_time);

  console.log(items)

  return (
    <View className='w-screen bg-white p-4 py-6 border-b border-gray-300'>
      <View className='flex-row justify-between items-center border-b border-gray-100'>
        <View className='flex-row items-center space-x-2 mb-4'>
          <Icons.ShoppingBagIcon fill={'#009245'} />
          <View>
            <Text style={styles.Ligh} className='text-xs'>Belanja</Text>
            <Text style={styles.Semi} className='text-md'>{today.toLocaleDateString("id-ID", options)}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.Regu} className='text-xs text-[#009245]'>Lihat Detail</Text>
        </View>
      </View>
      <View className='flex-row justify-between items-center mt-4'>
        <View>
          <Text style={styles.Ligh} className='text-xs'>Total</Text>
          <Text style={styles.Regu} className='text-md'>
            Rp. <Currency quantity={Number(data.totalPrice)} currency="IDR" pattern="##,### " />
          </Text>
        </View>
        <View>
          <TouchableOpacity className='px-4 py-2 bg-[#009245] rounded-full'>
            <Text style={styles.Semi} className='text-sm text-white'>Order lagi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ListItems