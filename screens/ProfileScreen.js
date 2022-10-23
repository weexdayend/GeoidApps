import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, selectToken } from '../reducer/profileSlice'

const ProfileScreen = () => {

  const url = 'https://geoid.taktikid.com/api/users/'

  const dispatch = useDispatch()
  const tokenUser = useSelector(selectToken)

  const handleLogout = () => {
    fetch(url+'logout', {
      method: 'POST',
      headers: {
        'Authorization' : 'Bearer ' + tokenUser
      }
    })
    .then((response) => {
      if(response.status === 200){
        dispatch(logoutUser())
      }
    })
  }

  return (
    <View>
      <Text>ProfileScreen</Text>
      <TouchableOpacity
        onPress={() => handleLogout()}
        className='w-screen bg-red-500'
      >
        <Text>Keluar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen