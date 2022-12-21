import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'

import * as Icons from 'react-native-heroicons/solid'
import Currency from 'react-currency-formatter'
import { styles } from '../fontStyles'

import { 
  addToBasket, 
  removeFromBasket, 
  selectAddress, 
  selectBasketDiscount, 
  selectBasketItems, 
  selectBasketTotal, 
  selectPayment, 
  selectVoucher, 
  setMethod
} from '../reducer/basketSlice'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import HeadBar from '../components/Cart/HeadBar'
import ButtonBottom from '../components/Cart/ButtonBottom'
import { UseGetCart } from '../components/Hooks/cartSystem'
import { selectToken } from '../reducer/profileSlice'

const CartScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const address = useSelector(selectAddress)
  const payment = useSelector(selectPayment)
  const items = useSelector(selectBasketItems)
  const total = useSelector(selectBasketTotal)
  const disct = useSelector(selectBasketDiscount)
  const voucher = useSelector(selectVoucher)

  const [deliveryMethod, setDeliveryMethod] = useState(true)
  const [pickupMethod, setPickupMethod] = useState(false)
  const [groupedItemsCart, setGroupedItemsCart] = useState([])

  const token = useSelector(selectToken)
  const { loadAsh, data } = UseGetCart(token)

  const addItem = (id, name, description, image, variant, price, discount) => {
    dispatch(addToBasket({id, name, description, image, variant, price, discount}))
  }

  const removeItem = (id) => {
    dispatch(removeFromBasket({id}))
  }

  const handleMethod = (method) => {
    setDeliveryMethod(!deliveryMethod)
    setPickupMethod(!pickupMethod)

    changeMethod(method)
  }

  const changeMethod = (method) => {
    dispatch(setMethod(method))
  }

  const RenderDelivery = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Address')}
        className='w-fit bg-green-50 py-4 px-4 rounded-xl border border-[#009245] mt-2'
      >
          
        <View className='flex-row'>
          {
            address.id != null ?
            <>
            <View className='flex-1'>
              <Text style={styles.Semi} className='text-base font-semibold'>{address.name}</Text>
              <Text style={styles.Regu} className='text-base'>{address.detail}</Text>
              <Text style={styles.Regu} className='text-base text-gray-400'>{address.area}</Text>
              <Text style={styles.Regu} className='text base text-gray-400'>{address.code}, {address.city}</Text>
            </View>
            <View className='items-center justify-center pl-4'>
              <Text style={styles.Regu} className='text-base text-green-600'>Ganti alamat</Text>
            </View>
            </>
            :
            <>
            <View className='flex-1 items-center'>
              <Text style={styles.Regu} className='text-base text-green-600'>Pilih alamat pengiriman</Text>
            </View>
            </>
          }
        </View>
      </TouchableOpacity>
    )
  }

  const RenderPayment = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Payment')}
        className='w-fit bg-green-50 py-4 px-4 rounded-xl border border-[#009245] mt-2'
      >    
        <View className='flex-row'>
          {
            payment.id != null ?
            <>
            <View className='flex-1 flex-row'>
              <Text style={styles.Semi} className='text-base'>{payment.name}</Text>
            </View>
            <View className='items-center justify-center pl-4'>
              <Text style={styles.Regu} className='text-base text-green-600'>Ganti metode</Text>
            </View>
            </>
            :
            <>
            <View className='flex-1 items-center'>
              <Text style={styles.Regu} className='text-base text-green-600'>Pilih metode pembayaran</Text>
            </View>
            </>
          }
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView>
    <View className='w-screen h-full bg-gray-100'>
      <HeadBar />

      <ScrollView contentContainerStyle={{ paddingBottom: 125}}>
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
                  <RenderDelivery />
                </View>
                :
                <TouchableOpacity
                  onPress={() => handleMethod('Delivery Order')}
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
                  onPress={() => handleMethod('Pickup Order')}
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
            {
              loadAsh ? (null) :
              (
                data?.map((item, key) => (
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
                        <View className='w-36 rounded-full bg-green-50 p-2 items-center mb-4 border border-[#009245]'>
                          <Text style={styles.Semi} className='text-base'>
                            <Currency quantity={(Number(item.productPrice)-Number(item.productDiscount))*item.productItem} currency="IDR" pattern=" ##,### " />
                          </Text>
                        </View>

                        <View className='flex-row px-6 items-center'>
                          <TouchableOpacity
                            onPress={() => removeItem(items[0]?.id)}
                          >
                            <Icons.MinusCircleIcon fill={'#009245'} size={32} />
                          </TouchableOpacity>
                          <View className='w-20 items-center'>
                            <Text style={styles.Semi} className='text-[#009245] text-xl'>{item.productItem}x</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => addItem(
                              items[0]?.id, items[0]?.name, items[0]?.description, items[0]?.image, items[0]?.variant, items[0]?.price, items[0]?.discount
                            )}
                          >
                            <Icons.PlusCircleIcon fill={'#009245'} size={32} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              )
            }
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
                  <Text style={styles.Semi} className='text-base'>Pilih voucher yang tersedia sebelum kamu order!</Text>
                </View>
                <Icons.ArrowRightCircleIcon fill={'#ef4444'} size={32} />
              </TouchableOpacity>
            </View>
          </View>

          <View className='px-4 mt-4'>
            <View className='w-fit bg-white py-4 px-4 rounded-xl'>
              <Text style={styles.Semi} className='text-base'>Payment Method</Text>
              <RenderPayment />
            </View>
          </View>

          <View className='px-4 mt-4'>
            <View className='w-fit bg-white py-4 px-4 rounded-xl'>
              <View className='pb-2'>
                <Text style={styles.Semi} className='text-base'>Payment Summary</Text>
              </View>
              <View className='w-fit flex-row items-center justify-between p-2'>
                <Text style={styles.Regu}  className='text-gray-600'>Subtotal</Text>
                <View className='flex-row'>
                  <Text style={styles.Regu} className='text-gray-400'>
                    ( -<Currency quantity={disct} currency="IDR" pattern=" ##,### " />)
                  </Text>
                  <Text style={styles.Regu} className='text-gray-600'>
                    <Currency quantity={total-disct} currency="IDR" pattern=" ##,### " />
                  </Text>
                </View>
              </View>
              <View className='w-fit flex-row items-center justify-between p-2'>
                <Text style={styles.Regu} className='text-gray-600'>Delivery fee</Text>
                <Text style={styles.Regu} className='text-gray-600'>
                    <Currency quantity={12000} currency="IDR" pattern=" ##,### " />
                </Text>
              </View>
              <View className='w-fit flex-row items-center justify-between p-2'>
                <Text style={styles.Regu} className='text-gray-600'>Platform fee</Text>
                <Text style={styles.Regu} className='text-gray-600'>
                    <Currency quantity={6000} currency="IDR" pattern=" ##,### " />
                </Text>
              </View>
              {
                voucher.id != null &&
                <View className='w-fit flex-row items-center justify-between p-2'>
                  <Text style={styles.Semi} className='text-gray-600'>Voucher</Text>
                  <Text style={styles.Semi} className='text-gray-600'>
                    - <Currency quantity={voucher.discount} currency="IDR" pattern=" ##,### " />
                  </Text>
                </View>
              }
              <View className='w-fit flex-row items-center justify-between p-2'>
                <Text style={styles.Bold} className='text-base'>Total</Text>
                <Text style={styles.Bold} className='text-base'>
                  {
                    voucher.id != null ?
                      <Currency quantity={12000+6000+(total-disct-voucher.discount)} currency="IDR" pattern=" ##,### " />
                    :
                      <Currency quantity={12000+6000+(total-disct)} currency="IDR" pattern=" ##,### " />
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>

    <View className='absolute bottom-0 w-screen'>
      <ButtonBottom />
    </View>

    </SafeAreaView>
  )
}

export default CartScreen