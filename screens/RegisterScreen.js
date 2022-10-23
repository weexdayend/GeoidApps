import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import * as Icons from 'react-native-heroicons/solid'

const RegisterScreen = () => {

  const url = 'https://geoid.taktikid.com/api/users/'
  const navigation = useNavigation()

  const RegisterSchema = Yup.object().shape({
    name:
      Yup.string()
      .min(3, 'Username minimal 3 karakter!')
      .max(50, 'Waduh username kamu terlalu panjang!')
      .required('Username harus di isi ya!'),
    businessname:
      Yup.string()
      .min(10, 'Nama bisnis minimal 10 karakter!')
      .max(50, 'Waduh nama bisnis kamu terlalu panjang!')
      .required('Nama bisnis harus di isi ya!'),
    email:
      Yup.string()
      .email('Isi dengan email kamu ya!')
      .required('Email harus di isi ya!'),
    password:
      Yup.string()
      .min(8, 'Password minimal 8 karakter!')
      .max(25, 'Waduh password kamu terlalu panjang!')
      .required('Password harus di isi ya!')
  });

  const handleRegister = (data) => {
    if(data){
      fetch(url + 'register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((json) => console.log(json.status))
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
          className='absolute top-16 p-2 left-4 bg-white rounded-full'
        >
          <Icons.ArrowLeftIcon fill={'#009245'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className='absolute top-16 p-2 right-4 bg-white rounded-full'
        >
          <Icons.XMarkIcon fill={'#009245'} />
        </TouchableOpacity>


        <View
          className='h-screen w-screen bg-white top-20 p-8 rounded-t-3xl'
        >
          <View className='h-2 bg-white w-screen'></View>
          <ScrollView
            contentContainerStyle={{
              height: 900,
              paddingBottom: 200,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Text className='text-lg font-bold text-gray-700'>
              Masukkan dengan nomor telepon dan email kamu yang terdaftar.
            </Text>
            <Formik
              initialValues={{ name: '', businessname: '', email: '', password: '' }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => handleRegister(values)}
            >
              {({ touched, values, errors, handleChange, handleBlur, handleSubmit }) => (
                <View className='w-fit'>
                  <View className='mt-10 bg-gray-200 rounded-full px-4'>
                    <TextInput
                      placeholder='Name Lengkap'
                      placeholderTextColor={'#787878'}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                  </View>
                  <View className='h-10 px-4'>
                    {
                      touched.name && errors.name &&
                      <Text className='mt-2 text-red-500'>{errors.name}</Text>
                    }
                  </View>

                  <View className='bg-gray-200 rounded-full px-4 mt-4'>
                    <TextInput
                      placeholder='Nama Bisnis'
                      placeholderTextColor={'#787878'}
                      onChangeText={handleChange('businessname')}
                      onBlur={handleBlur('businessname')}
                      value={values.businessname}
                    />
                  </View>
                  <View className='h-10 px-4'>
                    {
                      touched.businessname && errors.businessname &&
                      <Text className='mt-2 text-red-500'>{errors.businessname}</Text>
                    }
                  </View>

                  <View className='bg-gray-200 rounded-full px-4 mt-4'>
                    <TextInput
                      placeholder='ini@email.com'
                      placeholderTextColor={'#787878'}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>
                  <View className='h-10 px-4'>
                    {
                      touched.email && errors.email &&
                      <Text className='mt-2 text-red-500'>{errors.email}</Text>
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
                    <Text className='text-white font-semibold text-base'>Daftar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default RegisterScreen