import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveMethod, selectCartItems, selectFee, selectGross, selectVoucher, sumTotalDiscount, sumTotalItem, sumTotalPrice } from '../reducer/cartSlice'

import HeadBar from '../components/Cart/HeadBar'
import ButtonBottom from '../components/Cart/ButtonBottom'
import ItemList from '../components/Cart/ItemList'
import Delivery from '../components/Cart/Delivery'
import Payment from '../components/Cart/Payment'
import Summary from '../components/Cart/Summary'

const CartScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const voucher = useSelector(selectVoucher)
  const cart = useSelector(selectCartItems)
  const totalItem = useSelector(sumTotalItem)
  const totalPrice = useSelector(sumTotalPrice)
  const totalDiscount = useSelector(sumTotalDiscount)
  const grossAmount = useSelector(selectGross)
  const fee = useSelector(selectFee)

  const [deliveryMethod, setDeliveryMethod] = useState(true)
  const [pickupMethod, setPickupMethod] = useState(false)

  // create new data product list with the voucher
  // const dataProduct = cart.concat(voucher)
  // console.log(dataProduct)

  const handleMethod = (method) => {
    setDeliveryMethod(!deliveryMethod)
    setPickupMethod(!pickupMethod)

    changeMethod(method)
  }

  const changeMethod = (method) => {
    dispatch(retrieveMethod(method))
  }

  return (
    <View className='bg-white pt-14'>
      <View className='w-screen h-full bg-gray-100'>
        <HeadBar />

        <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 125}}>
          {
            cart.length ? 
            (
              <View className='w-screen mt-2'>
                <View className='p-4'>
                  <View className='w-fit bg-white py-4 px-4 rounded-xl'>
                    {
                      deliveryMethod ?
                      <View>
                        <TouchableOpacity className='flex-row justify-between items-center'>
                          <View className='flex-row items-center'>
                            <Image
                              source={require('../assets/img/icons8-in-transit-96.png')}
                              style={{
                                height: 32,
                                width: 32,
                                marginRight: 10,
                              }}
                            />
                            <Text style={styles.Semi} className='text-base'>Delivery</Text>
                          </View>
                          <Icons.CheckCircleIcon fill={'#009245'} size={32} />
                        </TouchableOpacity>
                        <Delivery />
                      </View>
                      :
                      <TouchableOpacity
                        onPress={() => handleMethod('Delivery')}
                        className='flex-row justify-between items-center'
                      >
                        <View className='flex-row items-center'>
                          <Image
                            source={require('../assets/img/icons8-in-transit-96.png')}
                            style={{
                              height: 32,
                              width: 32,
                              marginRight: 10,
                            }}
                          />
                          <Text style={styles.Regu} className='text-base'>Delivery</Text>
                        </View>
                        <Icons.MinusCircleIcon fill={'#bababa'} size={32} />
                      </TouchableOpacity>
                    }
                    <View className='border border-gray-200 my-4'></View>
                    {
                      pickupMethod ?
                      <TouchableOpacity className='flex-row justify-between items-center'>
                        <View className='flex-row items-center'>
                          <Image
                            source={require('../assets/img/icons8-manual-handling-96.png')}
                            style={{
                              height: 32,
                              width: 32,
                              marginRight: 10,
                            }}
                          />
                          <Text style={styles.Semi} className='text-base'>Instant Pickup</Text>
                        </View>
                        <Icons.CheckCircleIcon fill={'#009245'} size={32} />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        onPress={() => handleMethod('Pickup')}
                        className='flex-row justify-between items-center'
                      >
                        <View className='flex-row items-center'>
                          <Image
                            source={require('../assets/img/icons8-manual-handling-96.png')}
                            style={{
                              height: 32,
                              width: 32,
                              marginRight: 10,
                            }}
                          />
                          <Text style={styles.Regu} className='text-base'>Instant Pickup</Text>
                        </View>
                        <Icons.MinusCircleIcon fill={'#bababa'} size={32} />
                      </TouchableOpacity>
                    }
                  </View>
                </View>

                <View className='pl-4'>
                  <ItemList />
                </View>

                <View style={styles.Bold} className='px-4 mt-2'>
                  <View className='w-fit bg-white py-6 px-4 rounded-xl'>
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('Voucher')}
                      className='flex-row items-center'
                    >
                      <View className='p-2 rounded-full bg-yellow-100 mr-2'>
                        <Image 
                          source={require('../assets/img/icons8-gift-96.png')}
                          style={{
                            height: 48,
                            width: 48,
                          }}
                        />
                      </View>
                      <View className='flex-1'>
                        {
                          voucher.productId != null ?
                          <Text style={styles.Bold} className='text-base'>Selamat, 1 voucher telah berhasil digunakan!</Text> : 
                          <Text style={styles.Semi} className='text-base'>Pilih voucher yang tersedia sebelum kamu order!</Text>
                        }
                      </View>
                      <Icons.ArrowRightCircleIcon fill={'#ef4444'} size={32} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className='px-4 mt-4'>
                  <View className='w-fit bg-white py-4 px-4 rounded-xl'>
                    <Text style={styles.Semi} className='text-base'>Payment Method</Text>
                    <Payment />
                  </View>
                </View>

                <View className='px-4 mt-4'>
                  <Summary totalPrice={totalPrice} totalDiscount={totalDiscount} voucher={voucher} />
                </View>
              </View>
            )
            :
            (
              <View className='w-screen items-center'>
                <View className='top-24 items-center p-8'>
                  <Image
                    source={require('../assets/img/sammy-packages.png')}
                  />

                  <Text style={styles.Bold} className='text-4xl text-[#008247] mt-4'>Belum ada barang di keranjang kamu!</Text>
                </View>
              </View>
            )
          }
        </ScrollView>
      </View>

      {
        cart.length ?
        (
          <View className='absolute bottom-0 w-screen'>
            <ButtonBottom items={totalItem} cart={cart} voucher={voucher} fee={fee} price={totalPrice} discount={totalDiscount} gross={grossAmount} />
          </View>
        ) : (null)
      }

    </View>
  )
}

export default CartScreen