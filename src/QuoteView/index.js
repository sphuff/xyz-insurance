import React, { Component } from 'react'
import './styles.css'

class LoadingIndicator extends Component {
    constructor() {
        super()
        this.state = {
            loadingStr: 'Loading'
        }
    }
    componentDidMount() {
        this.loadingInterval = setInterval(() => {
            this.setState({
                loadingStr: this.state.loadingStr + '.',
            })
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.loadingInterval)
        this.loadingInterval = null
    }

    render() {
        const { loadingStr }= this.state
        return (
            <div className="loading-indicator">{ loadingStr }</div>
        )
    }
}

const QuoteViewSuccess = (props) => {
    const { quoteDetails: { 
        owner_name: ownerName, 
        model: jetModel, 
        seat_capacity: jetSeatCapacity, 
        manufactured_date: manufacturedDate, 
        purchase_price: purchasePrice, 
        broker_email: brokerEmail 
    } } = props
    return (
        <div className="quote-success-view">
            <h1>New Quote</h1>
            <h4>{ `Owner Name: ${ownerName}`}</h4>
            <h4>{ `Jet Model: ${jetModel}`}</h4>
            <h4>{ `Seat Capacity: ${jetSeatCapacity}`}</h4>
            <h4>{ `Manufactured Date: ${manufacturedDate}`}</h4>
            <h4>{ `Purchase Price: ${purchasePrice}`}</h4>
            <h4>{ `Broker Email: ${brokerEmail}`}</h4>
        </div>
    )
}

const QuoteViewFailure = (props) => {
    const { quoteError: { 
        errorMessage,
        errors
    } } = props
    const reasons = errors && errors[0] && errors[0].reasons ? errors[0].reasons : []
    return (
        <div className="quote-failure-view">
            <h1>Error</h1>
            <h4>{ `Error Message: ${errorMessage}`}</h4>
            { reasons.map(reason => {
                return (<h5 className="quote-failure-error-reason">{ reason.reason }</h5>)
            })}
        </div>
    )
}

const QuoteView = (props) => {
    const { hasLoaded, quoteError } = props
    if (!hasLoaded)
        return <LoadingIndicator />
    if (!quoteError.errorMessage) 
        return <QuoteViewSuccess { ...props } />
    else 
        return <QuoteViewFailure { ...props } />
}

export default QuoteView