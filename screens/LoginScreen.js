import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../components/Hooks/servicesUser'

import { useNavigation } from '@react-navigation/native'
import { loggedUser } from '../reducer/profileSlice'

import { Formik } from 'formik'
import * as Yup from 'yup'
import * as Icons from 'react-native-heroicons/solid'

import { styles } from '../fontStyles'
import { useMutation } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const mutation = useMutation(login, {
    onSuccess: (e) => {
      if(e.code === 200){
        alertSuccess()
        AsyncStorage.setItem('_data-user', JSON.stringify({data: e.data, token: e.token}))
        dispatch(loggedUser({data: e.data, token: e.token}))
      } else {
        alertError()
      }
    }
  })

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

  const alertError = () => {
    Alert.alert(
      "Waduh ada error!",
      "Sepertinya username atau password kamu salah nih!",
      [
        {
          text: 'Coba kembali',
          style: 'cancel',
        },
      ]
    )
  }

  const alertSuccess = () => {
    Alert.alert(
      "Selamat datang kembali!",
      "Kabar baik hari ini? selamat berbelanja yah!",
      [
        {
          text:'Mulai belanja',
          onPress: () => navigation.navigate('Home'),
          style: 'default',
        }
      ]
    )
  }

  const handleLogin = (data) => {
    if(data){
      mutation.mutate(data)
      // fetch(url + 'login', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      // .then((response) => response.json())
      // .then((json) => {
      //   console.log(json)
      //   if(json.code === 200){
      //     dispatch(loggedUser(json))
      //     alertSuccess()
      //   } else if (json.code === 501) {
      //     alertError()
      //   }
      // }).catch((e) => {Alert(e)})
    }
  }

  return (
    <View bounces={false} className='w-screen h-screen'>
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
          className='absolute top-16 p-2 right-4 bg-white rounded-full'
        >
          <Icons.XMarkIcon fill={'#009245'} />
        </TouchableOpacity>

        <View className='h-screen w-screen bg-white top-20 p-8 rounded-t-3xl'>
          <Text style={styles.Semi} className='text-lg text-gray-700'>
            Masukkan dengan nomor telepon dan email kamu yang terdaftar.
          </Text>

          <Formik
            initialValues={{ userlogin: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={values => handleLogin(values)}
          >
            {({ touched, values, errors, handleChange, handleBlur, handleSubmit }) => (
              <View className='w-fit'>
                <View className='mt-10'>
                  <Text style={styles.Regu} className='text-md mb-2'>Nomor Telepon / Email</Text>
                  <View className='bg-gray-200 rounded-full px-4'>
                  <TextInput
                    placeholder='0812xxx / ini@email.com'
                    placeholderTextColor={'#787878'}
                    onChangeText={handleChange('userlogin')}
                    onBlur={handleBlur('userlogin')}
                    value={values.userlogin}
                    style={styles.Regu}
                    className='p-4'
                  />
                  </View>
                  <View className='h-10 px-4'>
                    {
                      touched.userlogin && errors.userlogin &&
                      <Text style={styles.Regu} className='mt-2 text-red-500'>{errors.userlogin}</Text>
                    }
                  </View>
                </View>
                
                <View>
                  <Text style={styles.Regu} className='text-md mb-2'>Password</Text>
                  <View className='bg-gray-200 rounded-full px-4'>
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
                  onPress={handleSubmit}
                  className='w-fit p-4 bg-[#009245] items-center mt-5 rounded-full'
                >
                  <Text style={styles.Bold} className='text-white font-semibold text-base'>Masuk</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                  className='w-fit p-4 items-center mt-4 rounded-full'
                >
                  <Text style={styles.Semi} className='text-gray-700 font-semibold text-base'>Pengguna Baru?</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen