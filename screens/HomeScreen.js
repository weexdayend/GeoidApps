import { View, Text, SafeAreaView, Animated, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { selectProfile, selectToken } from '../reducer/profileSlice'
import { logCategory, logSection } from '../reducer/homeSlice'

import * as Icons from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import HeadBar from '../components/Home/HeadBar'
import PromoCard from '../components/Home/PromoCard'

import CategoryRow from '../components/Home/CategoryRow'
import SectionRow from '../components/Home/SectionRow'

const HomeScreen = () => {

  let offset = useRef(new Animated.Value(0)).current;

  const url = 'https://geoid-dev.taktikid.com/api/'

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [dataSection, setDataSection] = useState([])
  const [categorySection, setCategorySection] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const dataProfile = useSelector(selectProfile)
  const dataToken = useSelector(selectToken)

  useEffect(() => {
    setIsLoading(true)

    try{
      fetchCategory()
      fetchSection()

      _getLogUser()
    } catch(e) {
      setHasError(true)
    }

    return() => {
      setIsLoading(false)
    }
  }, [])

  const _getLogUser = async () => {
    try {
      const _log = await AsyncStorage.getItem('_logdata')
      const _logparsed = JSON.parse(_log)
    } catch(e) {
      console.log(e)
    }
  }

  const fetchCategory = () => {
    fetch(url+'categories')
    .then((response) => response.json())
    .then((json) => {
      if(json.code === 200){
        dispatch(logCategory(json))
        setCategorySection(json.data)
      }
    })
  }

  const fetchSection = () => {
    fetch(url+'products/section')
    .then((response) => response.json())
    .then((json) => {
      if(json.code === 200){
        dispatch(logSection(json))
        setDataSection(json.data)
      }
    })
  }

  return (
    <SafeAreaView className='w-screen bg-white'>
      {/** Header Section */}
      <HeadBar offset={offset} className='relative' />

      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset}}}],
          {useNativeDriver: false}
        )}
        contentContainerStyle={{
          marginTop: 100,
          paddingBottom: 120,
        }}
        className='bg-gray-100'
      >
        {/** Promo Card Section */}
        <PromoCard />

        {/** Section */}
        <CategoryRow data={categorySection} />

        <SectionRow data={dataSection} />
      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen