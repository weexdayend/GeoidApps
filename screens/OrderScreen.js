import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, {useState} from 'react'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'
import Currency from 'react-currency-formatter'
import Clipboard from '@react-native-clipboard/clipboard';

import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectMidtrans } from '../reducer/cartSlice'

const OrderScreen = () => {

  const navigation = useNavigation()
  const callback = useSelector(selectMidtrans)

  const info = callback.data
  const data = callback.datamidtrans

  const copyToClipboard = (e) => {
    Clipboard.setString(e)
  }

  console.log(data)

  return (
    <View>
      <ImageBackground
        source={require('../assets/img/large-triangles.png')}
        className='w-screen h-screen'
      >
        <ScrollView className='w-screen h-screen'>
          <View className='w-screen h-screen'>
            <View className='items-center top-14 p-2'>
              <Text style={styles.Bold} className='text-3xl text-white'>Detail Transaksi</Text>
              <Text style={styles.Regu} className='text-white text-sm mt-1'>{info.codeOrder}</Text>
            </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className='absolute top-16 p-2 right-4 bg-white rounded-full'
          >
            <Icons.XMarkIcon fill={'#009245'} />
          </TouchableOpacity>

            <View className='h-screen w-screen top-20 p-4'>
              <View className='p-4 bg-white rounded-xl shadow-lg'>
                <View className='flex-row items-center justify-between border-b border-gray-300 pb-4'>
                  <View className='space-x-4s'>
                    <Text className='text-base text-gray-500'>Nomor VA</Text>
                    <TouchableOpacity
                      onPress={() => copyToClipboard()}
                    >
                      <Text className='text-2xl font-bold'>{data.va_numbers}</Text>
                      <Text className='text-sm font-regular text-[#009245]'>Click to copy!</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View className='flex-row items-center justify-between pb-4 pt-4'>
                  <View className='space-x-4s'>
                    <Text className='text-base text-gray-500'>Total</Text>
                    <Text className='text-xl font-bold'>
                      <Text className='text-lg font-bold'>
                        Rp<Currency quantity={Number(data.gross_amount)} currency="IDR" pattern=" ##,### " />
                      </Text>
                    </Text>
                    
                  </View>
                </View>
              </View>
              <View className='p-4 bg-white rounded-xl shadow-lg mt-5'>
                <View className='flex-row items-center justify-between border-b border-gray-300 pb-4'>
                  <View className='space-x-4s'>
                    <Text className='text-base text-gray-500'>Status</Text>
                    {
                      data.transaction_status === 'pending' && <Text className='text-base'>Pending - Menunggu Pembayaran</Text>
                    }
                  </View>
                </View>

                <View className='flex pt-4'>
                  <Text className='text-base text-gray-500'>Tanggal Transaksi</Text>
                  <Text className='text-base'>{data.transaction_time}</Text>
                </View>
              </View>
              <View className='w-fit p-4 bg-white rounded-xl shadow-lg mt-5'>
                <Text className='text-base text-gray-500'>Detail Produk</Text>
                {
                  info.dataProduct.filter((item) => {
                    return item.productType === 'Product'
                  }).map((item) => (
                    <View className='flex-row items-center justify-between'>
                      <Text className='text-sm'>{item.productName}</Text>
                      <View className='flex-row'>
                        <Text>{item.productItem}x</Text>
                        <View className='mx-2'></View>
                        <Text>{item.productPrice}</Text>
                      </View>
                    </View>
                  ))
                }
                <View className='flex pt-4'>
                {
                  info.dataProduct.filter((item) => {
                    return item.productType === 'service'
                  }).map((item) => (
                    <View className='flex-row justify-between'>
                      <Text className='text-sm'>{item.productName}</Text>
                      <View>
                        <Text>{item.productPrice}</Text>
                      </View>
                    </View>
                  ))
                }
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default OrderScreen