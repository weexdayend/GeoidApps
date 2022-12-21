import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketWithID } from '../../reducer/basketSlice'

import * as Icons from 'react-native-heroicons/solid'
import Currency from 'react-currency-formatter'
import { styles } from '../../fontStyles'
import { UseAddCart, UseDeleteCart } from '../Hooks/cartSystem'
import { selectToken } from '../../reducer/profileSlice'
import { useNavigation } from '@react-navigation/native'

const ProductCard = ({
  id, type, name, description, image, unit, price, discount
}) => {

  const navigation = useNavigation()

  const items = useSelector((state) => selectBasketWithID(state, id))
  const dispatch = useDispatch()
  const token = useSelector(selectToken)

  const { addItem } = UseAddCart()
  const { deleteItem } = UseDeleteCart()

  const alert = () => {
    Alert.alert(
      "Oppss belum login",
      "Login terlebih dahulu yuk, sebelum lanjut menggunakan GEOID.",
      [
        {
          text: 'Login',
          style: 'default',
          onPress: () => navigation.navigate('Login')
        }
      ]
    )
  }

  const insertToCart = (id, type) => {
    if (!token) {
      alert()
    }

    addItem({id, type, token})
    dispatch(addToBasket({id, name, description, image, unit, price, discount}))
  }

  const removeFromCart = (id, type) => {
    deleteItem({id, type, token})
    dispatch(removeFromBasket({id}))
  }

  return (
    <View className='bg-white p-4 border-b border-gray-200'>
      <View className='flex-row'>
        <View className='flex-1 pr-2'>
          <Text style={styles.Semi} className='text-lg'>{name}</Text>
          <Text style={styles.Regu} className='text-gray-500 mb-1'>{unit}</Text>
          <Text style={styles.Regu} className='text-gray-400'>{description}</Text>
        </View>

        <View>
          {
            image === 'none' ?
            <Image
              source={{
                uri: 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg?ver=6',
              }}
              resizeMethod='scale'
              resizeMode='cover'
              className='h-24 w-32 bg-gray-300 p-4 rounded-xl'
            /> :
            <Image
              source={{
                uri: image,
              }}
              resizeMethod='scale'
              resizeMode='cover'
              className='h-24 w-32 bg-gray-300 p-4 rounded-xl'
            />
          }
        </View>
      </View>
      <View className='h-14 flex-row items-center mt-4'>
          <View className='flex-1'>
            {
              discount ?
              <View className='flex-row items-center'>
                <View className='w-fit mr-2'>
                  <Text style={styles.Semi} className='text-gray-700 text-base mr-1'>
                    <Currency quantity={Number(price)-Number(discount)} currency="IDR" pattern="##,### " />
                  </Text>
                  <Text style={styles.Regu} className='text-gray-400 text-base line-through'>
                    <Currency quantity={Number(price)} currency="IDR" pattern="##,### " />
                  </Text>
                </View>
                <View className='p-2 px-4 bg-red-500 rounded-full ml-1'>
                  <Text style={styles.Semi} className='text-white leading-4'>Promo</Text>
                </View>
              </View>
              :
              <View className='items-left'>
                <Text style={styles.Semi} className='text-gray-600 text-base mr-1'>
                  <Currency quantity={Number(price)} currency="IDR" pattern="##,### " />
                </Text>
              </View>
            }
          </View>

          <View className='w-fit'>
            {/* <View className='items-center'>
              <TouchableOpacity 
                onPress={() => insertToCart(id, type)}
                className='w-32 px-3 py-2 items-center rounded-full bg-green-50 border border-[#009245]'
              >
                <Text style={styles.Semi} className='text-[#009245] text-base'>Tambah</Text>
              </TouchableOpacity>
            </View> */}
            {
              items.length == 0 ?
              <View className='items-center'>
                <TouchableOpacity 
                  onPress={() => insertToCart(id, type)}
                  className='w-32 px-3 py-2 items-center rounded-full bg-green-50 border border-[#009245]'
                >
                  <Text style={styles.Semi} className='text-[#009245] text-base'>Tambah</Text>
                </TouchableOpacity>
              </View> :
              <View className='flex-row bg-green-50 items-center w-32 py-1 px-1.5 rounded-full border border-[#009245]'>
                <TouchableOpacity
                  onPress={() => removeFromCart(id, type)}
                  className='p-1 rounded-full bg-[#009245]'
                >
                  <Icons.MinusIcon fill={'#ffffff'} />
                </TouchableOpacity>
                <Text style={styles.Semi} className='flex-1 text-center text-base'>{items.length}</Text>
                <TouchableOpacity
                  onPress={() => insertToCart(id, type)}
                  className='p-1 rounded-full bg-[#009245]'
                >
                  <Icons.PlusIcon fill={'#ffffff'} />
                </TouchableOpacity>
              </View>
            }
          </View>
      </View>
    </View>
  )
}

export default ProductCard