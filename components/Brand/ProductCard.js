import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React from 'react'

import { useSelector } from 'react-redux'

import * as Icons from 'react-native-heroicons/solid'
import Currency from 'react-currency-formatter'
import { styles } from '../../fontStyles'

import { UseAddCart, UseDeleteCart, UseGetCart } from '../Hooks/cartSystem'
import { selectToken } from '../../reducer/profileSlice'
import { useNavigation } from '@react-navigation/native'
import { selectCartItemsID } from '../../reducer/cartSlice'

const ProductCard = ({
  id, type, name, description, image, unit, price, discount
}) => {

  const navigation = useNavigation()

  // const items = useSelector((state) => selectBasketWithID(state, id))
  const items = useSelector((state) => selectCartItemsID(state, id))
  const token = useSelector(selectToken)

  const { isRefetching, data } = UseGetCart(token)
  const { addItem, statusAdd } = UseAddCart()
  const { deleteItem, statusDelete } = UseDeleteCart()

  const alert = () => {
    Alert.alert(
      "Oppss belum login",
      "Login terlebih dahulu yuk, sebelum lanjut menggunakan GEOID.",
      [
        {
          text: 'Login dulu ya!',
          style: 'default',
        }
      ]
    )
  }

  const insertToCart = (id, type) => {
    if (!token) {
      alert()
    }

    addItem({id, type, token})
  }

  const removeFromCart = (id, type) => {
    deleteItem({id, type, token})
  }

  const RenderProcess = () => {
    return (
      <View className='flex-row bg-green-50 items-center w-32 py-1 px-1.5 rounded-full border border-[#009245]'>
        <ActivityIndicator className='p-1' size="small" color="#009245" />
      </View>
    )
  }

  const RenderButton = () => {
    return (
      <>
      {
        items.length == 0 ?
        (
          <>
          {
            statusAdd == 'loading' || statusDelete == 'loading' ?
            <RenderProcess /> :
            <View className='items-center'>
              <TouchableOpacity 
                onPress={() => insertToCart(id, type)}
                className='w-32 px-3 py-2 items-center rounded-full bg-green-50 border border-[#009245]'
              >
                <Text style={styles.Semi} className='text-[#009245] text-base'>Tambah</Text>
              </TouchableOpacity>
            </View>
          }
          </>
        ) :
        (
          <>
          {
            statusAdd == 'loading' || statusDelete == 'loading' ?
            <RenderProcess /> :
            <View className='flex-row bg-green-50 items-center w-32 py-1 px-1.5 rounded-full border border-[#009245]'>
              <TouchableOpacity
                onPress={() => removeFromCart(id, type)}
                className='p-1 rounded-full bg-[#009245]'
              >
                <Icons.MinusIcon fill={'#ffffff'} />
              </TouchableOpacity>
              <Text style={styles.Semi} className='flex-1 text-center text-base'>{items.map(i => i.productItem)}</Text>
              <TouchableOpacity
                onPress={() => insertToCart(id, type)}
                className='p-1 rounded-full bg-[#009245]'
              >
                <Icons.PlusIcon fill={'#ffffff'} />
              </TouchableOpacity>
            </View>
          }
          </>
        )
      }
      </>
    )
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
            <RenderButton />
          </View>
      </View>
    </View>
  )
}

export default ProductCard