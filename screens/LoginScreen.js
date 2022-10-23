import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import { loggedUser } from '../reducer/profileSlice'

import { Formik } from 'formik'
import * as Yup from 'yup'
import * as Icons from 'react-native-heroicons/solid'

const LoginScreen = () => {

  const url = 'https://geoid.taktikid.com/api/users/'

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const LoginSchema = Yup.object().shape({
    userlogin: 
      Yup.string()
      .min(10, 'Username minimal 10 karakter!')
      .max(50, 'Waduh username kamu terlalu panjang!')
      .required('Username harus di isi ya!'),
    password:
      Yup.string()
      .min(8, 'Password minimal 8 karakter!')
      .max(25, 'Waduh password kamu terlalu panjang!')
      .required('Password harus di isi ya!')
  });

  const handleLogin = (data) => {
    if(data){
      fetch(url + 'login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((json) => {
        if(json.code === 200){
          dispatch(loggedUser(json))
          navigation.navigate('Cart')
        }
      })
    }
  }

  return (
    <View className='w-screen'>
      <View className='bg-[#009245] w-screen h-screen'>
        <View className='items-center top-14 p-2'>
          <Text className='text-4xl font-bold text-white'>Geoid Apps</Text>
          <Text className='text-white text-sm mt-4'>v1.0.0</Text>
        </View>
        
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='absolute top-16 p-2 right-4 bg-white rounded-full'
        >
          <Icons.XMarkIcon fill={'#009245'} />
        </TouchableOpacity>

        <View className='h-screen w-screen bg-white top-20 p-8 rounded-t-3xl'>
          <Text className='text-lg font-bold text-gray-700'>
            Masukkan dengan nomor telepon dan email kamu yang terdaftar.
          </Text>

          <Formik
            initialValues={{ userlogin: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={values => handleLogin(values)}
          >
            {({ touched, values, errors, handleChange, handleBlur, handleSubmit }) => (
              <View className='w-fit'>
                <View className='mt-10 bg-gray-200 rounded-full px-4'>
                  <TextInput
                    placeholder='0812xxx / ini@email.com'
                    placeholderTextColor={'#787878'}
                    onChangeText={handleChange('userlogin')}
                    onBlur={handleBlur('userlogin')}
                    value={values.userlogin}
                  />
                </View>
                <View className='h-10 px-4'>
                  {
                    touched.userlogin && errors.userlogin &&
                    <Text className='mt-2 text-red-500'>{errors.userlogin}</Text>
                  }
                </View>

                <View className='bg-gray-200 rounded-full px-4 mt-4'>
                  <TextInput
                    placeholder='Password'
                    placeholderTextColor={'#787878'}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
                <View className='h-10 px-4'>
                  {
                    touched.password && errors.password &&
                    <Text className='mt-2 text-red-500'>{errors.password}</Text>
                  }
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  className='w-fit p-4 bg-[#009245] items-center mt-10 rounded-full'
                >
                  <Text className='text-white font-semibold text-base'>Masuk</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                  className='w-fit p-4 items-center mt-4 rounded-full'
                >
                  <Text className='text-gray-700 font-semibold text-base'>Pengguna Baru?</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen