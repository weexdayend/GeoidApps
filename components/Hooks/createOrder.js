import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "./HooksHelper";

// const orderUrl = 'https://geoid-dev.caricuan.tech/api/orders'
const options = (body,token) => {
    return headers = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        },
        body: JSON.stringify(body)
    }
}

export const createOrder = async (data) => {
    let body = {
        "codeOrder": "0", // default 0
        "addressId": "",
        "idVoucher": "0", // default 0
        "paymentId": "", // 1 for transfer and 2 for cash on delivery
        "totalProduct": "", // count total item
        "totalPrice": "", // count total price item
        "jenisBayar": "", // transfe or cod
        "nameBank": "", // for cod just fill with -
        "dataProduct": []
    }
    let token = ''

    // body builder fill with data from reducer
    const tmp = data.map((item) => {return item.info})
    tmp.map((item) => {
        body.addressId = item.address.id
        body.paymentId = '1'
        body.totalProduct = item.items
        body.totalPrice = item.gross
        body.jenisBayar = 'transfer'
        body.nameBank = item.payment.tmpName
        // create new data product list with the voucher
        // const dataProduct = cart.concat(voucher)
        // console.log(dataProduct)
        let joinDataPrpoduct = item.cart.concat(item.voucher, item.fee)
        body.dataProduct = joinDataPrpoduct

        // insert token data
        token = item.token
    })

    const response = await fetch(`${BASE_URL}/orders`, options(body, token))
    .then((response) => response.json()).then((data) => {
        console.log(data)
        return data
    })
    return response
}

export const UseCreateOrder = () => {
    const { mutate } = useMutation({
        mutationFn: (data) => createOrder(data)
    })

    return { postOrder: mutate }
}