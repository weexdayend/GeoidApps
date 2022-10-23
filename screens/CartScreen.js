import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'

import * as Icons from 'react-native-heroicons/solid'
import * as Animatable from 'react-native-animatable'

import { addToBasket, removeFromBasket, selectBasketDiscount, selectBasketItems, selectBasketTotal } from '../reducer/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

const CartScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const items = useSelector(selectBasketItems)
  const total = useSelector(selectBasketTotal)
  const disct = useSelector(selectBasketDiscount)

  const [deliveryMethod, setDeliveryMethod] = useState(true)
  const [pickupMethod, setPickupMethod] = useState(false)
  const [groupedItemsCart, setGroupedItemsCart] = useState([])

  const handleMethod = () => {
    setDeliveryMethod(!deliveryMethod)
    setPickupMethod(!pickupMethod)
  }

  const RenderDelivery = () => {
    return (
      <Animatable.View animation={'fadeIn'}>
        <View className='w-fit bg-white py-4 px-4 rounded-xl'>
          <Text>Delivery</Text>
        </View>
      </Animatable.View>
    )
  }

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item)
      return results
    }, [])

    setGroupedItemsCart(groupedItems)
  }, [items])

  return (
    <SafeAreaView className='w-screen bg-white'>
      <View className='w-screen h-screen bg-[#009245]'>
        <View className='flex-row justify-between p-5 border-b border-[#009245] bg-white shadow-xs'>
          <View className='relative'>
            <Text className='text-lg font-bold'>Isi keranjang kamu</Text>
            <Text className='text-base text-center text-gray-400'>Cek kembali barang nya ya!</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className='absolute bg-[#009245] p-2 rounded-full top-6 right-5'
          >
            <Icons.XMarkIcon fill={'#ffffff'} size={32} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View className='w-screen h-screen p-4 mt-2'>
            <View className='w-fit bg-white py-4 px-4 rounded-xl mb-6'>
              {
                deliveryMethod ?
                <TouchableOpacity className='flex-row justify-between items-center'>
                  <Text className='text-base font-semibold'>Delivery</Text>
                  <Icons.CheckCircleIcon fill={'#009245'} size={32} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => handleMethod()}
                  className='flex-row justify-between items-center'
                >
                  <Text className='text-base'>Delivery</Text>
                  <Icons.MinusCircleIcon fill={'#bababa'} size={32} />
                </TouchableOpacity>
              }
              <View className='border border-gray-200 my-4'></View>
              {
                pickupMethod ?
                <TouchableOpacity className='flex-row justify-between items-center'>
                  <Text className='text-base font-semibold'>Pickup</Text>
                  <Icons.CheckCircleIcon fill={'#009245'} size={32} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => handleMethod()}
                  className='flex-row justify-between items-center'
                >
                  <Text className='text-base'>Pickup</Text>
                  <Icons.MinusCircleIcon fill={'#bababa'} size={32} />
                </TouchableOpacity>
              }
            </View>

            {deliveryMethod ? <RenderDelivery /> : null}

            {Object.entries(groupedItemsCart).map(([id, items]) => (
              <View
                key={id}
                className='items-center bg-white py-4 px-4 border-b border-gray-200'
              >
                <View className='flex-row items-center'>
                  <View className='flex-1 px-4'>
                    <Text className='text-base'>{items[0]?.name}</Text>
                    <Text className='text-base text-gray-600'>{items[0]?.variant}</Text>
                  </View>
                  <Text className='text-lg'>
                    {Number(items[0]?.price)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen