

export const abi  = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "priceFeedAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "FundME__NotOwner",
      "type": "error"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [],
      "name": "MINIMUM_USD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "addressToAmountFunded",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fund",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "funders",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "i_owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "priceFeed",
      "outputs": [
        {
          "internalType": "contract AggregatorV3Interface",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
  export const contractAddress = "0x17E2681A0185A83CaCDD8CE96c4e2db68aecd534"
 




const connectBtn = document.getElementById("btn")
const fundBtn = document.getElementById("fund-btn")
const chkBalance = document.getElementById("chk-balance")
const withdrawFunds = document.getElementById("withdraw-funds")
const connect = async()=> {
    if (typeof window.ethereum !== "undefined") {
        console.log("yeah")
        await  window.ethereum.request({method:"eth_requestAccounts"})
        connectBtn.innerHTML = "connected"
        
        
    }
}
const fund =async ()=>{
    
    if (typeof window.ethereum !== "undefined") {
        const ethAmount = "0.2"
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer  = provider.getSigner()
        const contract = new ethers.Contract(contractAddress,abi, signer)
        try {
           const transactionResponse =   await contract.fund({value: ethers.utils.parseEther(ethAmount)})
             await listenForTransactionMine(transactionResponse, provider)
        console.log("done withdrawing funds");
        } catch (error) {
            

        }
        
        
    }
}
function listenForTransactionMine(transactionResponse, provider) {
    console.log("mining" + transactionResponse.hash);
return new Promise((resolve, reject)=> {
 provider.once(transactionResponse.hash, (transactionReciept)=>{
    console.log(`completed with ${transactionReciept.confirmations} confirmations`);
    resolve()
    })

})
}
async function ethBalance () {
    if (typeof window.ethereum !=="undefined") {
        const provider  = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }

}
const withdraw =async()=>{
if (typeof window !== "undefined") {
  console.log("withdrawing....")
  const provider  = new ethers.providers.Web3Provider(window.ethereum)
  const signer  = provider.getSigner()
  const contract = new ethers.Contract(contractAddress,abi,signer) 
  try {
    const transactionResponse  = await contract.withdraw()
    listenForTransactionMine(transactionResponse,provider)
    
  } catch (error) {
    console.error(error);
  }
}
}


connectBtn.onclick = connect
chkBalance.onclick = ethBalance
fundBtn.onclick = fund
withdrawFunds.onclick = withdraw
