import React, { Component } from 'react'
import "./styles.css"
import { postQuote } from '../api'
import QuoteView from '../QuoteView'

const OWNER_NAME = 'ownerName'
const JET_MODEL = 'jetModel'
const JET_SEAT_CAPACITY = 'jetSeatCapacity'
const MANUFACTURING_DATE = 'manufacturingDate'
const PURCHASE_PRICE = 'purchasePrice'
const BROKER_EMAIL = 'brokerEmail'

const getTargetKeyForType = (type) => {
    // different value types stored in different fields, so extract
    // proper value for type
    if (type === 'date')
        return 'valueAsDate'
    else if (type === 'number')
        return 'valueAsNumber'
    else
        return 'value'
}


export default class QuoteForm extends Component {
    constructor() {
        super()
        this.state = {
            ownerName: null,
            jetModel: 'Gulfstream G650',
            jetSeatCapacity: null,
            manufacturingDate: null,
            purchasePrice: null,
            brokerEmail: null,
            hasSubmittedQuote: false,
            quoteDetails: null,
            annualPremium: null,
            quoteError: null,
        }
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    handleInput(e, inputName) {
        const inputType = e.target.type
        let valueKey = getTargetKeyForType(inputType)
        // don't update if improper value type is being entered
        if (!e.target[valueKey])
            return 
        this.setState({
            [inputName]: e.target[valueKey],
        })
    }

    handleButtonClick(ev) {
        const { 
            ownerName,
            jetModel,
            jetSeatCapacity,
            manufacturingDate,
            purchasePrice,
            brokerEmail,
        } = this.state
        ev.preventDefault()
        postQuote({ ownerName, jetModel, jetSeatCapacity, manufacturingDate, purchasePrice, brokerEmail })    
            .then(res => {
                const { annual_premium: annualPremium, quote: quoteDetails, errorMessage, errors } = res
                this.setState({
                    annualPremium,
                    quoteDetails,
                    errorMessage,
                    quoteError: { errorMessage, errors }
                })
            })
        this.setState({
            hasSubmittedQuote: true,
        })
    }

    render() {
        const { annualPremium, quoteDetails, hasSubmittedQuote, quoteError } = this.state
        if (hasSubmittedQuote) {
            return ( <QuoteView hasLoaded={ (annualPremium && quoteDetails) || quoteError } quoteError={ quoteError } annualPremium={ annualPremium } quoteDetails={ quoteDetails } /> )
        }
        return (
            <form className="quote-form">
                <div className="form-input-container">
                    <input type="text" name="ownerName" placeholder="Owner Name" onChange={ (ev) => this.handleInput(ev, OWNER_NAME) }></input>
                    <select name="jetModel" onChange={ (ev) => this.handleInput(ev, JET_MODEL) }>
                        <option value="Gulfstream G650">Gulfstream G650</option>
                        <option value="Cessna A-37 Dragonfly">Cessna A-37 Dragonfly</option>
                        <option value="Cessna Citation Encore">Cessna Citation Encore</option>
                    </select>
                    <input type="number" name="jetSeatCapacity" placeholder="Jet Seat Capacity" min={ 0 } onChange={ (ev) => this.handleInput(ev, JET_SEAT_CAPACITY) }></input>
                    <input type="date" name="manufacturingDate" placeholder="Manufacturing Date" onChange={ (ev) => this.handleInput(ev, MANUFACTURING_DATE) }></input>
                    <input type="number" name="purchasePrice" placeholder="Purchase Price" min={ 0 } step={ 1000 } onChange={ (ev) => this.handleInput(ev, PURCHASE_PRICE) }></input>
                    <input type="email" name="brokerEmail" placeholder="Email" onChange={ (ev) => this.handleInput(ev, BROKER_EMAIL) }></input>
                </div>
                <button type="button" onClick={ (ev) => this.handleButtonClick(ev) }>Submit</button>
            </form>
        )
    }
}