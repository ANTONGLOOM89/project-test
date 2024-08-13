const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OptimizedContract", function() {
  let signers
  let deployer
  let contract

  beforeEach(async () => {
    // Account
    signers = await ethers.getSigner()
    deployer = signers[0]

    // Contracts
    const OptimizedContract = await ethers.getContractFactory("OptimizedContract")
    contract = await OptimizedContract.deploy("This is a test contract")
    await contract.deployed()
  })

  context("Initialization", async () => {

    it("Correct description", async () => {
      const description = "This is a test contract"

      expect(await contract.getDescription()).to.equal(description) 

    })

    it("Create new user", async () => {
      await contract.createUser("TestName")

      const user = await contract.getUser(0)
      expect(user.id).to.equal(0)
      expect(user.name).to.equal("TestName")
      expect(user.balance).to.equal(0)
    })

    it("Deposit amount to balance", async () => {
      await contract.createUser("TestName")

      await contract.deposit(0, 10)
      const user = await contract.getUser(0)
      expect(user.balance).to.equal(10)

    })

    it("user ID correctly", async () => {
      await contract.createUser('TestName1')
      await contract.createUser('TestName2')


      const user1 = await contract.getUser(0)
      const user2 = await contract.getUser(1)

      expect(user1.id).to.equal(0)
      expect(user2.id).to.equal(1)

    })

  })

})
