import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, Alert } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, selectToken, selectProfile, selectLog } from '../reducer/profileSlice'

import LinearGradient from 'react-native-linear-gradient';
import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../components/Hooks/servicesUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {

  const url = 'https://geoid.taktikid.com/api/users/'

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const tokenUser = useSelector(selectToken)
  const dataUser = useSelector(selectProfile)
  const logUser = useSelector(selectLog)

  const mutation = useMutation(logout, {
    onSuccess: () => {
      AsyncStorage.clear()
      dispatch(logoutUser())
    }
  })

  const handleLogout = () => {
    mutation.mutate(tokenUser)
  }

  const alertSuccess = () => {
    Alert.alert(
      "Mau kemana nih?",
      "Yakin kamu mau keluar dari akun kamu?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text:'Lanjutkan',
          onPress: () => handleLogout(),
          style: 'default',
        }
      ]
    )
  }

  return (
    <View className='w-screen h-screen'>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 125,
        }}
      >
        <ImageBackground
          source={require('../assets/img/large-triangles.png')}
          className='w-screen h-96 items-center justify-center p-4 pt-20'
        >
          <Image source={require('../assets/img/Asset6.png')}
            style={{
              resizeMode: "contain",
              height: 45,
              padding: 10,
              marginBottom: 25,
            }}
          />
          <View className='w-full bg-transparent rounded-3xl shadow-md'>
              {
                logUser === true ?
                <>
                  <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={['rgba(52, 223, 132, 0.5)', 'rgba(0, 146, 69, 0.6)']} className='p-6 rounded-3xl'>
                    <View className='flex-row justify-between items-center'>
                      <View className='flex-1'>
                        <Text style={styles.Regu} className='text-white text-sm'>Kabar baik hari ini?</Text>
                        <Text style={styles.Semi} className='text-white text-lg'>Irvan Gerhana Septiyana</Text>
                      </View>
                    </View>
                    <View className='py-4 mb-4'>
                      <Text style={styles.Bold} className='text-white text-2xl'>0000 1111 2222 3333</Text>
                    </View>
                    <View className='flex-row space-x-2 items-center'>
                      <View className='flex-row space-x-1 bg-blue-500 py-2 px-4 rounded-full'>
                        <Icons.CheckBadgeIcon size={20} className='text-white' />
                        <Text style={styles.Bold} className='text-white text-sm'>Terverifikasi</Text>
                      </View>
                      <View className='flex-row space-x-1 bg-white py-2 px-4 rounded-full'>
                        <Icons.SparklesIcon size={20} className='text-blue-500' />
                        <Text style={styles.Bold} className='text-blue-500 text-sm'>10.000P</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </> 
                : 
                <>
                </> 
              }
          </View>
        </ImageBackground>

        <View className='flex-grow w-screen bg-gray-100'>
          <View className='flex p-6'>
            {
              logUser === true ?
              <>
                <Text style={styles.Bold} className='text-base text-gray-600'>Pengaturan Akun</Text>
                <TouchableOpacity className='flex-row items-center space-x-3 py-3 border-b border-gray-200'>
                  <Icons.UserIcon className='text-gray-500' size={22} />
                  <Text style={styles.Regu} className='text-base text-gray-600'>Edit Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex-row items-center space-x-3 py-3 border-b border-gray-200'>
                  <Icons.InboxIcon className='text-gray-500' size={22} />
                  <Text style={styles.Regu} className='text-base text-gray-600'>Riwayat Transaksi</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('AddAddress')}
                  className='flex-row items-center space-x-3 py-3 border-b border-gray-200'
                >
                  <Icons.MapPinIcon className='text-gray-500' size={22} />
                  <Text style={styles.Regu} className='text-base text-gray-600'>Tambah Alamat</Text>
                </TouchableOpacity>

                <Text style={styles.Bold} className='text-base text-gray-600 mt-4'>Pengaturan Umum</Text>
                <TouchableOpacity className='flex-row items-center space-x-3 py-3 border-b border-gray-200'>
                  <Icons.DocumentTextIcon className='text-gray-500' size={22} />
                  <Text style={styles.Regu} className='text-base text-gray-600'>Terms of Services</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex-row items-center space-x-3 py-3 border-b border-gray-200'>
                  <Icons.ShieldExclamationIcon className='text-gray-500' size={22} />
                  <Text style={styles.Regu} className='text-base text-gray-600'>Privacy Poliicy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={alertSuccess}
                  className='w-full py-4 bg-red-500 mt-8 items-center rounded-full'
                >
                  <Text style={styles.Semi} className='text-white text-lg'>Keluar akun?</Text>
                </TouchableOpacity>
              </> : 
              <>
                <View className='mt-10'>
                  <Text style={styles.Bold} className='text-lg text-gray-700'>Halo kabar baik hari ini?</Text>
                  <Text style={styles.Bold} className='text-lg text-gray-700'>Jangan lupa login dulu ya.</Text>
                </View>
                <View className='mt-14'>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    className='w-fit py-3 bg-[#009245] rounded-full items-center'
                  >
                    <Text style={styles.Bold} className='text-lg text-white length-1 pb-1'>Login dulu yuk!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    className='w-fit py-3 rounded-full items-center mt-4'
                  >
                    <Text style={styles.Bold} className='text-lg text-[#009245] length-1 pb-1'>Daftar akun baru</Text>
                  </TouchableOpacity>
                </View>
              </>
            }

            {/** About */}
            <View className='mt-14 items-center'>
              <Text style={styles.Bold} className='text-base text-gray-500'>GeoID Apps</Text>
              <Text style={styles.Regu} className='text-xs text-gray-300'>Version 1.0.0</Text>
              <Text style={styles.Bold} className='text-sm text-gray-400'>Powered by Kura-Kura</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen