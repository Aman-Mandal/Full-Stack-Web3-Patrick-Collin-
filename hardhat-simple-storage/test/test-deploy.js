const { assert, expect } = require('chai')
const { ethers } = require('hardhat')

// describe is a keyword by 'MochaJS'
// It takes 2 params ("string", function() - In this function we gonna write our tests)
describe('SimpleStorage', function () {
  let simpleStorageFactory, simpleStorage

  // beforeEach runs everytime before the 'it' blocks
  beforeEach(async function () {
    // Creating and deploying a new contract for each test
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await simpleStorageFactory.deploy()
  })

  // Writing tests
  it('Should start with the favNumber of 0', async function () {
    const expectedValue = '0'
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue) - Same as above
  })

  it('Should update when we call store', async function () {
    const expectedValue = '69'
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
})
