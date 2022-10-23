import { View, Text, Image, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketWithID } from '../../reducer/basketSlice'

import * as Icons from 'react-native-heroicons/solid'

const ProductCard = ({
  id, name, description, image, variant, price, discount
}) => {

  const items = useSelector((state) => selectBasketWithID(state, id))
  const dispatch = useDispatch()

  const addItem = () => {
    dispatch(addToBasket({id, name, description, image, variant, price, discount}))
  }

  const removeItem = () => {
    dispatch(removeFromBasket({id}))
  }

  return (
    <View className='bg-white p-4 border border-gray-200'>
      <View className='flex-row'>
        <View className='flex-1 pr-2'>
          <Text className='text-lg font-semibold'>{name}</Text>
          <Text className='text-gray-500 mb-1'>{variant}</Text>
          <Text className='text-gray-400'>{description}</Text>
        </View>

        <View>
          <Image
            source={{
              uri: image,
            }}
            className='h-24 w-32 bg-gray-300 p-4 rounded-xl'
          />
        </View>
      </View>
      <View className='h-14 flex-row items-center mt-4'>
          <View className='flex-1'>
            {
              discount ?
              <View className='flex-row items-center'>
                <Text className='text-gray-700 font-semibold text-base mr-1'>{Number(price)-Number(discount)}</Text>
                <Text className='text-gray-400 text-base line-through'>{Number(price)}</Text>
                <View className='p-1 px-4 bg-red-500 rounded-full ml-1'>
                  <Text className='text-white'>Promo</Text>
                </View>
              </View>
              :
              <Voew className='bg-green-50 p-1 w-60 rounded-full items-center'>
                <Text className='text-gray-600 font-semibold text-base mr-1'>{Number(price)}</Text>
              </Voew>
            }
          </View>

          <View className='w-fit'>
            <View>
              {
                items.length == 0 ?
                <View className='items-center'>
                  <TouchableOpacity 
                    onPress={addItem}
                    className='w-32 p-2 items-center rounded-full bg-[#009245]'
                  >
                    <Text className='text-white text-base'>Tambah</Text>
                  </TouchableOpacity>
                </View>
                :
                <View className='flex-row bg-green-50 items-center w-32 p-2 rounded-full border border-[#009245]'>
                  <TouchableOpacity
                    onPress={removeItem}
                    className='p-1 rounded-full bg-[#009245]'
                  >
                    <Icons.MinusIcon fill={'#ffffff'} />
                  </TouchableOpacity>
                  <Text className='flex-1 text-center text-base'>{items.length}</Text>
                  <TouchableOpacity
                    onPress={addItem}
                    className='p-1 rounded-full bg-[#009245]'
                  >
                    <Icons.PlusIcon fill={'#ffffff'} />
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
      </View>
    </View>
  )
}

export default ProductCard