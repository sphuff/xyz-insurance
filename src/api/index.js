import { QUOTE_API_URL, PROXY_SERVER_URL } from '../constants'

export const postQuote = ({ ownerName, jetModel, jetSeatCapacity, manufacturingDate, purchasePrice, brokerEmail }) => {
    return fetch(`${PROXY_SERVER_URL}${encodeURIComponent(QUOTE_API_URL)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p',
        },
        body: JSON.stringify({
            owner_name: ownerName,
            model: jetModel,
            seat_capacity: jetSeatCapacity,
            manufactured_date: manufacturingDate,
            purchase_price: purchasePrice,
            broker_email: brokerEmail,
        })
    })
        
        .then(res => res.json())
        .catch(err => console.error('err: ',err))
}