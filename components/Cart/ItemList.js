import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'

import * as Icons from 'react-native-heroicons/solid'
import Currency from 'react-currency-formatter'
import { styles } from '../../fontStyles'

import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../reducer/profileSlice'
import { UseAddCart, UseDeleteCart, UseGetCart } from '../Hooks/cartSystem'
import { retrieveFromDB } from '../../reducer/cartSlice'

const ItemList = () => {

  const dispatch = useDispatch()

  const token = useSelector(selectToken)
  const { loadAsh, data, isSuccess, isRefetching } = UseGetCart(token)

  const { addItem, statusAdd } = UseAddCart()
  const { deleteItem, statusDelete } = UseDeleteCart()

  const insertToCart = (id, type) => {
    if (!token) {
      alert()
    }

    addItem({id, type, token})
  }

  const removeFromCart = (id, type) => {
    deleteItem({id, type, token})
  }

  useEffect(() => {
    let tmpData = null
    if(isSuccess){
      tmpData = data
      if(tmpData){
        tmpData.map((item) => 
          delete item.productImage
        )
        dispatch(retrieveFromDB(tmpData))
      } else {
        console.log('null')
      }
    }
  }, [data])

  return (
    <View className='pt-1 pb-1'>
      {
        loadAsh ? (<Text>Load data...</Text>) :
        data ?
        (
          data?.map((item,key) => (
            <View
              key={key}
              className='bg-white py-4 border-l-8 border-[#009245] rounded-l-xl mb-2'
            >
              <View className='flex-row justify-between'>
                <View className='flex-1 pl-4 py-2'>
                  <Text style={styles.Semi} className='text-base'>{item.productName}</Text>
                  <Text style={styles.Regu} className='text-base text-gray-600'>{item.productUnit}</Text>
                  <View className='flex-row'>
                    {
                      item.productDiscount > 0 ? (
                      <>
                        <Text style={styles.Semi} className='text-base'>
                          <Currency quantity={Number(item.productPrice)-Number(item.productDiscount)} currency="IDR" pattern=" ##,### " />
                        </Text>
                        <Text style={styles.Semi} className='text-gray-400 text-base line-through'>
                          <Currency quantity={Number(item.productPrice)} currency="IDR" pattern=" ##,### " />
                        </Text>
                      </>
                      ) : (
                      <>
                        <Text style={styles.Semi} className='text-base'>
                          <Currency quantity={Number(item.productPrice)} currency="IDR" pattern=" ##,### " />
                        </Text>
                      </>
                      )
                    }
                  </View>
                </View>
                <View className='px-2 w-fit items-center'>
                  {
                    statusAdd == 'loading' || statusDelete == 'loading' ?
                    null :
                    <View className='w-36 rounded-full bg-green-50 p-2 items-center mb-4 border border-[#009245]'>
                      <Text style={styles.Semi} className='text-base'>
                        <Currency quantity={(Number(item.productPrice)-Number(item.productDiscount))*item.productItem} currency="IDR" pattern=" ##,### " />
                      </Text>
                    </View>
                  }
                  <View className='flex-row px-6 items-center'>
                    {
                      statusAdd == 'loading' || statusDelete == 'loading' ?
                      <View className='flex'></View> :
                      <TouchableOpacity
                        onPress={() => removeFromCart(item.productId, item.productType)}
                      >
                        <Icons.MinusCircleIcon fill={'#009245'} size={32} />
                      </TouchableOpacity>
                    }
                    <View className='w-20 items-center'>
                    {
                      statusAdd == 'loading' || statusDelete == 'loading' ?
                      <ActivityIndicator className='w-fit h-fit mt-8' size="small" color="#009245" />
                      :
                      <Text style={styles.Semi} className='text-[#009245] text-xl'>{item.productItem}x</Text>
                    }
                    </View>
                    {
                      statusAdd == 'loading' || statusDelete == 'loading' ?
                      <View className='flex'></View> :
                      <TouchableOpacity
                        onPress={() => insertToCart(item.productId, item.productType)}
                      >
                        <Icons.PlusCircleIcon fill={'#009245'} size={32} />
                      </TouchableOpacity>
                    }
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (<Text className='flex text-center'>Belum ada barang di keranjang kamu.</Text>)
      }
    </View>
  )
}

export default ItemList