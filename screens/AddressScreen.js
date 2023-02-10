import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { UseGetUserAddress } from '../components/Hooks/getUserAddress'
import { selectToken, selectProfile } from '../reducer/profileSlice'
import { retrieveAddress, selectAddress } from '../reducer/cartSlice'

const AddressScreen = () => {
  
  const profile = useSelector(selectProfile)
  const token = useSelector(selectToken)
  const address = useSelector(selectAddress)

  const { loadAsh, data } = UseGetUserAddress(profile.id, token)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleChoose = (id, name, detail, area, code, city) => {
    dispatch(retrieveAddress({id, name, detail, area, code, city}))
    navigation.goBack()
  }

  return (
    <SafeAreaView className='w-screen h-screen bg-white'>
      <View className='bg-gray-100'>
        <View className='flex-row justify-between p-5 border-b border-[#009245] bg-white shadow-xs'>
          <View className='relative'>
            <Text style={styles.Bold} className='text-lg'>Daftar alamat kamu</Text>
            <Text style={styles.Regu} className='text-base text-gray-400'>Mau dikirim ke mana nih?</Text>
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
          paddingBottom: 150
        }}
        className='w-screen h-screen bg-gray-100'
      >
        <View className='p-4 mt-2'>
          {
            loadAsh ? (
              <Text>Loading...</Text>
            ) : data ? (
              data.map((item, key) => (
                <TouchableOpacity key={key}
                  onPress={() => handleChoose(
                    item.id, item.addressName, item.addressDetail, item.addressArea, item.addressCode, item.addressCity
                  )}
                  className={address.id === item.id ? 
                    'w-fit bg-green-50 py-4 px-4 rounded-xl border border-[#009245] mb-4 border-l-8' :
                    'w-fit bg-white py-4 px-4 rounded-xl mb-4'
                  }
                >
                  <View className='flex-row justify-between items-center'>
                    <View className='py-2 w-64'>
                      <Text style={styles.Bold} className='text-base'>{item.addressName}</Text>
                      <Text style={styles.Regu} className='text-base text-gray-500'>{item.addressDetail}</Text>
                      <Text style={styles.Regu} className='text-base text-gray-400'>{item.addressArea}</Text>
                      <Text style={styles.Regu} className='text-base text-gray-400'>{item.addressCode} , {item.addressCity}</Text>
                    </View>
                    <View className='w-fit'>
                      {
                        address.id === item.id ?
                        <Icons.CheckCircleIcon fill={'#009245'} size={32} /> :
                        <Icons.MinusCircleIcon fill={'#bababa'} size={32} />
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (<Text>Data not availale</Text>)
          }

          <TouchableOpacity 
            onPress={() => navigation.navigate('AddAddress')}
            className='w-fit p-2 py-4 border border-[#009245] rounded-full items-center mt-4'
          >
            <Text style={styles.Bold} className='text-lg text-[#009245] leading-5'>
              Tambah alamat
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddressScreen