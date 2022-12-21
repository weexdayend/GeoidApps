import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setVoucher, selectVoucher, selectMethod, removeVoucher } from '../reducer/basketSlice'
import { UseGetVouchers } from '../components/Hooks/getVouchers'
import { selectToken } from '../reducer/profileSlice'

const VoucherData = [
  {
    id: 1,
    voucherName: '50% off up to 500k',
    voucherDescription: '50% discount up to 500k',
    voucherMin: 'Min. order 1000k',
    voucherMax: 'Max. discount 500k',
    voucherDiscount: 500000,
    voucherType: 'Delivery Order',
    voucherAvailable: 'Limited availability',
  }, 
  {    
    id: 2,
    voucherName: '65% off up to 500k',
    voucherDescription: '65% discount up to 500k',
    voucherMin: 'Min. order 1550k',
    voucherMax: 'Max. discount 500k',
    voucherDiscount: 500000,
    voucherType: 'Pickup Order',
    voucherAvailable: 'Limited availability',
  },
]

const VoucherScreen = () => {


  const token = useSelector(selectToken)
  const { loadAsh, data } = UseGetVouchers(token)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const method = useSelector(selectMethod)
  const voucher = useSelector(selectVoucher)

  const [selected, isSelected] = useState()

  const handleChoose = (id, name, description, min, max, discount, type, available) => {
    dispatch(setVoucher({id, name, description, min, max, discount, type, available}))
    isSelected(true)
  }

  const handleRemove = () => {
    dispatch(removeVoucher())
    isSelected(!selected)
  }

  useLayoutEffect(() => {
    if(voucher.id != null){
      isSelected(true)
    } else {
      isSelected(false)
    }
  }, [])

  const RenderButton = ({item}) =>(
    <>
      {
        selected ? 
        <TouchableOpacity
          onPress={handleRemove}
          className='w-36 py-2 rounded-full border border-red-500 items-center'
        >
          <Text style={styles.Semi} className='text-base text-red-500'>Gunakan nanti</Text>
        </TouchableOpacity>
        : 
        <TouchableOpacity
          onPress={() => handleChoose(
            item.id, item.voucherName, item.voucherDescription, item.voucherMin, item.voucherMax, item.voucherDiscount, item.voucherType, item.voucherAvailable
          )}
          className='w-36 py-2 rounded-full border border-[#009245] items-center'
        >
          <Text style={styles.Semi} className='text-base text-[#009245]'>Gunakan</Text>
        </TouchableOpacity>
      }
    </>
  )

  return (
    <View className='w-screen h-full'>
      <View className='w-screen bg-white'>
        <View className='flex-row justify-between p-5 border-b border-[#009245] bg-white shadow-xs'>
          <View className='relative'>
            <Text style={styles.Bold} className='text-lg'>Pilih voucher</Text>
            <Text style={styles.Regu} className='text-base text-gray-400'>Voucher diskon special untuk kamu!</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='absolute bg-[#009245] p-2 rounded-full top-6 right-5'
        >
          <Icons.XMarkIcon fill={'#ffffff'} size={32} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        className='bg-gray-100'
      >
        <View className='p-4 mt-2'>
          {
            loadAsh ? (
              <Text>Loading...</Text>
            ) : data ? (
              data.map((item, index) => (
                <View key={index}
                  className='w-fit mb-6'
                >
                  <View className={
                    voucher.id === item.id ? 'bg-[#009245] rounded-2xl ' : null
                  }>
                    {
                      voucher.id === item.id ?
                      <View className='px-6 py-2 flex-row items-center space-x-2'>
                        <Text style={styles.Bold} className='text-sm text-white'>Applied</Text>
                        <Icons.CheckCircleIcon fill={'#ffffff'} size={20} />
                      </View>
                      :
                      null
                    }
                    <View className='bg-gray-200 rounded-2xl'>
                      <View className='bg-white px-6 py-4 rounded-2xl shadow-md'>
                        <Text style={styles.Bold} className='text-lg'>{item.voucherName}</Text>
                        <View className='p-4'>
                          <Text style={styles.Regu} className='text-base'>{item.voucherDescription}</Text>
                          <Text style={styles.Regu} className='text-base'>{item.voucherMin}</Text>
                          <Text style={styles.Regu} className='text-base'>{item.voucherMax}</Text>
                        </View>
  
                        <View className='flex-row items-center justify-between py-4'>
                          <View className='flex-row items-center space-x-2'>
                            <Icons.ClockIcon fill={'#3f3f46'} />
                            <Text style={styles.Semi} className='text-sm text-zinc-700'>{item.voucherAvailable}</Text>
                          </View>
                          {
                            method === item.voucherType &&
                            <RenderButton item={item} />
                          }
                        </View>
                      </View>
  
                      <View className='flex-row px-6 py-4 items-center'>
                        <View className='flex-row items-center rounded-full bg-white border border-gray-300 py-1 px-4 space-x-2'>
                          {
                            item.voucherType === 'Delivery Order' ?
                            <Image
                              source={require('../assets/img/icons8-in-transit-96.png')}
                              style={{
                                height: 24,
                                width: 24,
                              }}
                            />
                            :
                            <Image
                              source={require('../assets/img/icons8-manual-handling-96.png')}
                              style={{
                                height: 24,
                                width: 24,
                              }}
                            />
                          }
                          <Text style={styles.Semi} className='text-sm'>{item.voucherType}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (<Text>Data not available</Text>)
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default VoucherScreen