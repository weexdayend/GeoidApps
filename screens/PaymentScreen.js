import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { UseGetPayments } from '../components/Hooks/getPayments'
import { retrievePayment, selectPayment } from '../reducer/cartSlice'

const PaymentScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const payment = useSelector(selectPayment)

  const { loadAsh, data } = UseGetPayments()

  const handleChoose = (id, name, tmpName) => {
    dispatch(retrievePayment({id, name, tmpName}))
  }

  return (
    <SafeAreaView className='w-screen h-screen bg-white'>
      <View className='bg-gray-100'>
        <View className='flex-row justify-between p-5 border-b border-[#009245] bg-white shadow-xs'>
          <View className='relative'>
            <Text style={styles.Bold} className='text-lg'>Pilih metode pembayaran</Text>
            <Text style={styles.Regu} className='text-base text-gray-400'>Jangan lupa pilih ya!</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='absolute bg-[#009245] p-2 rounded-full top-6 right-5'
        >
          <Icons.XMarkIcon fill={'#ffffff'} size={32} />
        </TouchableOpacity>
      </View>

      <ScrollView className='w-screen h-screen bg-gray-100'>
        <View className='p-4 mt-2'>
          {
            loadAsh ? (<Text>Load data...</Text>) :
            (
              data?.map((item, index) => (
                <TouchableOpacity key={index}
                  onPress={() => handleChoose(
                    item.id, item.paymentName, item.tmpName
                  )}
                  className={payment.id === item.id ? 
                    'w-fit bg-green-50 py-4 px-4 rounded-xl border border-[#009245] mb-4 border-l-8' :
                    'w-fit bg-white py-4 px-4 rounded-xl mb-4'
                  }
                >
                  <View className='flex-row justify-between items-center'>
                    <View className='flex-row items-center py-2 w-64'>
                      <Image
                        source={{uri: item.paymentImage}}
                        style={{
                          height: 48,
                          width: 48,
                          marginRight: 10,
                        }}
                      />

                      <Text className='text-base'>{item.paymentName}</Text>
                    </View>
                    <View className='w-fit'>
                      {
                        payment.id === item.id ?
                        <Icons.CheckCircleIcon fill={'#009245'} size={32} /> :
                        <Icons.MinusCircleIcon fill={'#bababa'} size={32} />
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PaymentScreen