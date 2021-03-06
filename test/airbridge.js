/* globals before it describe */

'use strict'

var assert = require('assert')

var prepare = require('./fixtures/prepare')
var tracker = require('../')

var courier = tracker.courier(tracker.COURIER.AIRBRIDGE.CODE)

describe(tracker.COURIER.AIRBRIDGE.NAME, function () {
  var deliveredIDNumber = 'DELIVEREDID'
  var deliveredMYNumber = 'DELIVEREDMY'
  var rescheduledSGNumber = 'RESCHEDULEDSG'
  var intransitNumber = 'INTRANSIT'

  before(function () {
    // @TODO add nock
    prepare(courier, deliveredIDNumber)
    prepare(courier, deliveredMYNumber)
    prepare(courier, rescheduledSGNumber)
    prepare(courier, intransitNumber)
  })

  it('indonesia delivered number', function (done) {
    courier.trace(deliveredIDNumber, function (err, result) {
      assert.equal(err, null)

      assert.equal(deliveredIDNumber, result.number)
      assert.equal(tracker.COURIER.AIRBRIDGE.CODE, result.courier.code)
      assert.equal(tracker.STATUS.DELIVERED, result.status)

      done()
    })
  })
  it('malayasia delivered number', function (done) {
    courier.trace(deliveredMYNumber, function (err, result) {
      assert.equal(err, null)

      assert.equal(deliveredMYNumber, result.number)
      assert.equal(tracker.COURIER.AIRBRIDGE.CODE, result.courier.code)
      assert.equal(tracker.STATUS.DELIVERED, result.status)

      done()
    })
  })

  it('singapore rescheduled number', function (done) {
    courier.trace(rescheduledSGNumber, function (err, result) {
      assert.equal(err, null)

      assert.equal(rescheduledSGNumber, result.number)
      assert.equal(tracker.COURIER.AIRBRIDGE.CODE, result.courier.code)
      assert.equal(tracker.STATUS.EXCEPTION, result.status)

      done()
    })
  })

  it('transit number', function (done) {
    courier.trace(intransitNumber, function (err, result) {
      assert.equal(err, null)

      assert.equal(intransitNumber, result.number)
      assert.equal(tracker.COURIER.AIRBRIDGE.CODE, result.courier.code)
      assert.equal(tracker.STATUS.EXCEPTION, result.status)

      done()
    })
  })
})
