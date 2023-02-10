import { View, Text, TextInput, ScrollView, TouchableOpacity, Button, SafeAreaView, Alert } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Formik } from 'formik'
import * as Yup from 'yup'
import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../components/Hooks/HooksHelper';
import { UseAddUserAddress } from '../components/Hooks/getUserAddress';

const AddressFormScreen = () => {

  const url = 'https://geoid-dev.caricuan.tech/api/'
  const navigation = useNavigation()

  const [listCities, setListCities] = useState([])
  const [listArea, setListArea] = useState([])
  const [listDistrict, setListDistrict] = useState([])
  
  const [searchCities, setSearchCities] = useState([])
  const [searchArea, setSearchArea] = useState([])
  const [searchDistrict, setSearchDistrict] = useState([])

  const [selected, setSelected] = useState('')
  const [selectedCities, setSelectedCities] = useState('')
  const [selectedArea, setSelectedAera] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const { mutate, isSuccess } = UseAddUserAddress()

  const AddressScheme = Yup.object().shape({
    recipientname: 
      Yup.string()
      .min(3, 'Nama minimal 3 karakter!')
      .max(20, 'Waduh username kamu terlalu panjang!')
      .required('Nama lengkap harus di isi ya!'),
    address:
      Yup.string()
      .required('Alamat lengkap harus di isi ya!'),
  });

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['28%', '50%'], []);

  // callbacks
  const handlePresentModalPress = () => bottomSheetModalRef.current.present();
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleSubmit = async (data) => {
    const dataToken = await AsyncStorage.getItem('_data-user')
    const tokenData = JSON.parse(dataToken)

    let datas = { 
      data: {
        recipientname: data.recipientname,
        address: data.address,
        codeCities: selectedCities.id,
        codeSubdistrict: selectedArea.id,
        codeWard: selectedDistrict.id,
        postalCode: selectedDistrict.code,
      },
      token: tokenData.token
    }

    mutate(datas)
    if(isSuccess){
      Alert.alert(
        "Yeayy!",
        "Alamat kamu berhasil disimpan!",
        [
          {
            text: 'Lanjut belanja!',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ]
      )
    }

    if(!selectedCities && !selectedArea && !selectedDistrict){
      Alert.alert(
        "Waduh ada error!",
        "Data yang di input tidakboleh kosong ya!",
        [
          {
            text: 'Oke!',
            style: 'cancel',
          },
        ]
      )
    }

  }

  const _fetchCity = async() => {
    const dataToken = await AsyncStorage.getItem('_logtoken')
    const tokenData = JSON.parse(dataToken)

    fetch(url+'/regions/cities', {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + tokenData
      },
    })
    .then((response) => response.json())
    .then(({code, data}) => {
      const suggestion = data
        .map(item => ({
          id: item.id,
          title: item.citiesName
        }))
      setListCities(suggestion)
      setSearchCities(suggestion)
    })
  }

  const _fetchArea = async(id) => {
    const dataToken = await AsyncStorage.getItem('_logtoken')
    const tokenData = JSON.parse(dataToken)

    fetch(url+'/regions/cities/'+id+'/subdistrict', {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + tokenData
      }
    })
    .then((response) => response.json())
    .then(({code, data}) => {
      const suggestion = data
        .map(item => ({
          id: item.id,
          title: item.subdistrictName
        }))
      setListArea(suggestion)
      setSearchArea(suggestion)
    })
  }

  const _fetchDistrict = async(id) => {
    const dataToken = await AsyncStorage.getItem('_logtoken')
    const tokenData = JSON.parse(dataToken)

    fetch(url+'/regions/cities/subdistrict/'+id+'/ward', {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + tokenData
      }
    })
    .then((response) => response.json())
    .then(({code, data}) => {
      const suggestion = data
        .map(item => ({
          id: item.id,
          title: item.wardName,
          code: item.postalCode
        }))
      setListDistrict(suggestion)
      setSearchDistrict(suggestion)
    })
  }

  const searchDataKota = (e) => {
    var searchText = e;
    if (searchText) {
      if (selected === 'kota') {
        const filter = listCities.filter((item) => {
          const data = item.title.toLowerCase()
          const search = searchText.toLowerCase()
          return data.match(search)
        })
        if (filter.length) {
          setSearchCities(filter)
        } else {
          setSearchCities(listCities)
        }
      }
    } else {
      setSearchCities(listCities)
    }
  }

  const searchDataKecamatan = (e) => {
    var searchText = e;
    if (searchText) {
      const filter = listArea.filter((item) => {
        const data = item.title.toLowerCase()
        const search = searchText.toLowerCase()
        return data.match(search)
      })
      if (filter.length) {
        setSearchArea(filter)
      } else {
        setSearchArea(listArea)
      }
    } else {
      setSearchArea(listArea)
    }
  }

  const searchDataKelurahan = (e) => {
    var searchText = e;
    if (searchText) {
      const filter = listDistrict.filter((item) => {
        const data = item.title.toLowerCase()
        const search = searchText.toLowerCase()
        return data.match(search)
      })
      if (filter.length) {
        setSearchDistrict(filter)
      } else {
        setSearchDistrict(listDistrict)
      }
    } else {
      setSearchDistrict(listDistrict)
    }
  }

  useEffect(() => {
    try {
      _fetchCity()
    } catch(e) {
      console.log(e)
    }
  }, [])

  const renderKota = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => handlePressKota(item)}
        className='py-4 items-center border-b border-gray-200'
      >
        <Text style={styles.Regu} key={item.id} className='text-base'>{item.title}</Text>
      </TouchableOpacity>
    ), []
  )
  
  const handlePressKota = (item) => {
    setSelectedCities(item)
    bottomSheetModalRef.current.dismiss();
  }

  const renderKecamatan = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => handlePressKecamatan(item)}
        className='py-4 items-center border-b border-gray-200'
      >
        <Text style={styles.Regu} key={item.id} className='text-base'>{item.title}</Text>
      </TouchableOpacity>
    ), []
  )

  const handlePressKecamatan = (item) => {
    setSelectedAera(item)
    bottomSheetModalRef.current.dismiss();
  }

  const renderKelurahan = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => handlePressKelurahan(item)}
        className='py-4 items-center border-b border-gray-200'
      >
        <Text style={styles.Regu} key={item.id} className='text-base'>{item.title} , {item.code}</Text>
      </TouchableOpacity>
    ), []
  )

  const handlePressKelurahan = (item) => {
    setSelectedDistrict(item)
    bottomSheetModalRef.current.dismiss();
  }

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <SafeAreaView className='w-screen h-screen'>
      <View
        className='w-screen h-screen'
      >
        <View className='w-screen h-screen'>      
          <View className='top-4 p-4 mb-2'>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='w-10 p-2 bg-white rounded-full mb-4'
            >
              <Icons.ArrowLeftIcon fill={'#009245'} />
            </TouchableOpacity>
            <Text style={styles.Bold} className='text-xl'>Tambah alamat pengiriman.</Text>
            <Text style={styles.Regu} className='text-base'>Silahkan isi dengan alamat lengkap pengiriman kamu.</Text>
          </View>

          <ScrollView 
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            className='w-screen h-screen px-4'
          >
            <Formik
              initialValues={{ recipientname: '', address: '', hp: '' }}
              validationSchema={AddressScheme}
              onSubmit={values => handleSubmit(values)}
            >
              {({ touched, values, errors, handleChange, handleBlur, handleSubmit }) => (
                <View className='w-fit'>
                  <View className='mt-5 mb-2'>
                    <Text style={styles.Regu} className='text-md mb-2'>Nama Tempat</Text>
                    <View className='bg-gray-200 rounded-full px-4'>
                      <TextInput
                        placeholder='Nama Penerima'
                        placeholderTextColor={'#787878'}
                        onChangeText={handleChange('recipientname')}
                        onBlur={handleBlur('recipientname')}
                        value={values.recipientname}
                        style={styles.Regu}
                        className='p-4'
                      />
                    </View>
                    <View className='h-10 px-4'>
                      {
                        touched.recipientname && errors.recipientname &&
                        <Text style={styles.Regu} className='mt-2 text-red-500'>{errors.recipientname}</Text>
                      }
                    </View>
                  </View>

                  <View className='mb-2'>
                    <Text style={styles.Regu} className='text-md mb-2'>Alamat</Text>
                    <View className='bg-gray-200 rounded-full px-4'>
                      <TextInput
                        placeholder='Nomor telepon penerima'
                        placeholderTextColor={'#787878'}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                        style={styles.Regu}
                        className='p-4'
                      />
                    </View>
                    <View className='h-10 px-4'>
                      {
                        touched.address && errors.address &&
                        <Text style={styles.Regu} className='mt-2 text-red-500'>{errors.address}</Text>
                      }
                    </View>
                  </View>

                  <View className='mb-2'>
                    <Text style={styles.Regu} className='text-md mb-2'>Pilih Kota Bagian</Text>
                    <TouchableOpacity
                      onPress={() => {
                        handlePresentModalPress()
                        setSelected('kota')
                      }}
                      className='bg-gray-200 rounded-full px-4'
                    >
                      {
                        selectedCities ?
                        <Text className='p-4'>{selectedCities.title}</Text> :
                        <Text className='p-4'>Pilih kota bagian...</Text>
                      }
                    </TouchableOpacity>
                    <View className='h-10 px-2'>
                    </View>
                  </View>

                  <View className='mb-2'>
                    <Text style={styles.Regu} className='text-md mb-2'>Pilih Kecamatan</Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (selectedCities.id) {
                          _fetchArea(selectedCities.id)
                          handlePresentModalPress()
                          setSelected('kecamatan')
                        } else {
                          Alert.alert(
                            "Oooppss!",
                            "Kamu harus memilih kota dulu ya!",
                            [
                              {
                                text:'Oke!',
                                style: 'default',
                              }
                            ]
                          )
                        }
                      }}
                      className='bg-gray-200 rounded-full px-4'
                    >
                      {
                        selectedArea ?
                        <Text className='p-4'>{selectedArea.title}</Text> :
                        <Text className='p-4'>Pilih keacamatan...</Text>
                      }
                    </TouchableOpacity>
                    <View className='h-10 px-2'>
                    </View>
                  </View>

                  <View className='mb-2'>
                    <Text style={styles.Regu} className='text-md mb-2'>Pilih Kelurahan & Kode Pos</Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (selectedArea.id) {
                          _fetchDistrict(selectedArea.id)
                          handlePresentModalPress()
                          setSelected('kelurahan')
                        } else {
                          Alert.alert(
                            "Oooppss!",
                            "Kamu harus memilih kecamatan dulu ya!",
                            [
                              {
                                text:'Oke!',
                                style: 'default',
                              }
                            ]
                          )
                        }
                      }}
                      className='bg-gray-200 rounded-full px-4'
                    >
                      {
                        selectedDistrict ?
                        <Text className='p-4'>{selectedDistrict.title}, {selectedDistrict.code}</Text> :
                        <Text className='p-4'>Pilih kelurahan dan kode pos...</Text>
                      }
                    </TouchableOpacity>
                    <View className='h-10 px-2'>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className='w-fit p-4 bg-[#009245] items-center mt-4 rounded-full'
                  >
                    <Text style={styles.Bold} className='text-white font-semibold text-base'>Simpan alamat baru</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </View>

      <BottomSheetModalProvider>
        <View className='flex-1'>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
          >
            <View className='flex-1 p-6'>
              {
                selected == 'kota' ?
                <>
                  <View className=''>
                    <View className='bg-gray-100 rounded-full px-4 mb-4'>
                      <TextInput
                        placeholder='Cari kota...'
                        placeholderTextColor={'#787878'}
                        style={styles.Regu}
                        className='py-3 px-3'
                        onChangeText={(e) => searchDataKota(e)}
                      />
                    </View>
                  </View>
                  <BottomSheetFlatList
                    data={searchCities}
                    keyExtractor={(item, i) => item.id+i}
                    renderItem={renderKota}
                  />
                </> : null
              }

              {
                selected == 'kecamatan' ?
                <>
                  <View className=''>
                    <View className='bg-gray-100 rounded-full px-4 mb-4'>
                      <TextInput
                        placeholder='Cari kota bagian...'
                        placeholderTextColor={'#787878'}
                        style={styles.Regu}
                        className='py-3 px-3'
                        onChangeText={(e) => searchDataKecamatan(e)}
                      />
                    </View>
                  </View>
                  <BottomSheetFlatList
                    data={searchArea}
                    keyExtractor={(item, i) => item.id+i}
                    renderItem={renderKecamatan}
                  />
                </> : null
              }

              {
                selected == 'kelurahan' ?
                <>
                  <View className=''>
                    <View className='bg-gray-100 rounded-full px-4 mb-4'>
                      <TextInput
                        placeholder='Cari kota bagian...'
                        placeholderTextColor={'#787878'}
                        style={styles.Regu}
                        className='py-3 px-3'
                        onChangeText={(e) => searchDataKelurahan(e)}
                      />
                    </View>
                  </View>
                  <BottomSheetFlatList
                    data={searchDistrict}
                    keyExtractor={(item, i) => item.id+i}
                    renderItem={renderKelurahan}
                  />
                </> : null
              }
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  )
}

export default AddressFormScreen