import { postQuote } from '../api'
import sinon from 'sinon'
import chai from 'chai'
let expect = chai.expect

function mockApiResponse(body = {}) {
    return new window.Response(JSON.stringify(body), {
       status: 200,
       headers: { 'Content-type': 'application/json' }
    });
}

describe('API Tests', () => {
    it('Expect postQuote to call API with proper fields', done => {
        let stub = sinon.stub(window, 'fetch').callsFake((url, options) => {
            expect(options.headers['x-api-key']).to.equal('L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p')
            let body = JSON.parse(options.body)
            expect(body).to.have.property('owner_name')
            expect(body).to.have.property('manufactured_date')
            expect(body).to.have.property('seat_capacity')
            expect(body).to.have.property('model')
            expect(body).to.have.property('purchase_price')
            expect(body).to.have.property('broker_email')

            return Promise.resolve(mockApiResponse())
        })
        postQuote({ 
            ownerName: 'John Doe',
            purchasePrice: 111,
            jetSeatCapacity: 100,
            jetModel: 'Gulfstream G650',
            brokerEmail: 'broker@test.com',
            manufacturingDate: new Date()
         })
            .then(res => {
                expect(window.fetch.calledOnce).to.be.true
                done()
            })
            .catch(err => done(err))
    })
})