import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import * as Icons from 'react-native-heroicons/solid'

import { styles } from '../fontStyles'

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
      <ImageBackground
        source={require('../assets/img/large-triangles.png')}
        className='w-screen h-screen'
      >
      <View className='w-screen h-screen'>
        <View className='items-center top-14 p-2'>
          <Text style={styles.Bold} className='text-3xl text-white'>Geoid Apps</Text>
          <Text style={styles.Regu} className='text-white text-sm mt-1'>v1.0.0</Text>
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
          <View className='bg-white w-fit pb-2'>
            <Text style={styles.Semi} className='text-lg text-gray-700'>
              Masukkan dengan nomor telepon dan email kamu yang terdaftar.
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              height: 900,
              paddingBottom: 200,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              initialValues={{ name: '', businessname: '', email: '', password: '' }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => handleRegister(values)}
            >
              {({ touched, values, errors, handleChange, handleBlur, handleSubmit }) => (
                <View className='w-fit'>
                  <View className='mt-4'>
                    <Text style={styles.Regu} className='text-md mb-2'>Nama Lengkap</Text>
                    <View className='bg-gray-200 rounded-full px-4'>
                      <TextInput
                        placeholder='Name Lengkap'
                        placeholderTextColor={'#787878'}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        style={styles.Regu}
                        className='p-4'
                      />
                    </View>
                    <View className='h-10 px-4'>
                      {
                        touched.name && errors.name &&
                        <Text style={styles.Regu} className='mt-2 text-red-500'>{errors.name}</Text>
                      }
                    </View>
                  </View>
                  
                  <View>
                    <Text style={styles.Regu} className='text-md mb-2'>Nama Bisnis</Text>
                    <View className='bg-gray-200 rounded-full px-4 mt-2'>
                      <TextInput
                        placeholder='Nama Bisnis'
                        placeholderTextColor={'#787878'}
                        onChangeText={handleChange('businessname')}
                        onBlur={handleBlur('businessname')}
                        value={values.businessname}
                        style={styles.Regu}
                        className='p-4'
                      />
                    </View>
                    <View className='h-10 px-4'>
                      {
                        touched.businessname && errors.businessname &&
                        <Text style={styles.Regu} className='mt-2 text-red-500'>{errors.businessname}</Text>
                      }
                    </View>
                  </View>

                  <View>
                    <Text style={styles.Regu} className='text-md mb-2'>Email</Text>
                    <View className='bg-gray-200 rounded-full px-4 mt-2'>
                      <TextInput
                        placeholder='ini@email.com'
                        placeholderTextColor={'#787878'}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={styles.Regu}
                        className='p-4'
                      />
                    </View>
                    <View className='h-10 px-4'>
                      {
                        touched.email && errors.email &&
                        <Text style={styles.Regu} className='mt-2 text-red-500'>{errors.email}</Text>
                      }
                    </View>
                  </View>
                  
                  <View>
                    <Text style={styles.Regu} className='text-md mb-2'>Password</Text>
                    <View className='bg-gray-200 rounded-full px-4 mt-2'>
                      <TextInput
                        placeholder='Password'
                        placeholderTextColor={'#787878'}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={styles.Regu}
                        className='p-4'
                      />
                    </View>
                    <View className='h-10 px-4'>
                      {
                        touched.password && errors.password &&
                        <Text style={styles.Regu} className='mt-2 text-red-500'>{errors.password}</Text>
                      }
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.Bold}
                    onPress={handleSubmit}
                    className='w-fit p-4 bg-[#009245] items-center mt-8 rounded-full'
                  >
                    <Text className='text-white font-semibold text-base'>Daftar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </View>
      </ImageBackground>
    </View>
  )
}

export default RegisterScreen