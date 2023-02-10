import { View, Text, ScrollView } from 'react-native'
import React from 'react'

import { UseGetHistory } from '../components/Hooks/getHistory'
import { useSelector } from 'react-redux'
import { selectToken } from '../reducer/profileSlice'

import Header from '../components/History/Header'
import ListItems from '../components/History/ListItems'

const HistoryScreen = () => {

  const token = useSelector(selectToken)
  const { loadAsh, data } = UseGetHistory(token)

  return (
    <View>
      <Header className='bg-white absolute top-5' />

      <ScrollView
        contentContainerStyle={{
          paddingTop: 125,
          paddingBottom: 55
        }}
        bounces={false}
      >
        {
          loadAsh ? (<Text>Loading...</Text>) :
          data ?
          (
            data?.map((item, key) => (
              <ListItems key={key} data={item} />
            ))
          ) : (<Text>Tidak ada data...</Text>)
        }
        {/* {
          loadAsh ? (null) :
          data ?
          (
            data?.map((item, key) => (
              <ListItems key={key} data={item} />
            ))
          ) : (null)
        } */}
      </ScrollView>
    </View>
  )
}

export default HistoryScreen