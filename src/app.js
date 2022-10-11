App = {
    loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      await web3.eth.getAccounts().then((acc) => {
        // console.log(acc);
        App.account = acc[0];
        console.log(App.account)
        // console.log(App.account);
      });
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const verifier = await $.getJSON('Verifier.json')
      console.log(verifier)
      App.contracts.Verifier = TruffleContract(verifier)
      App.contracts.Verifier.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.verifier = await App.contracts.Verifier.deployed()
    },
  
    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }
  
      // Update app loading state
      App.setLoading(true)
      console.log("html")
      console.log(App.account)
      // Render Account
      $('#account').html(App.account)
      console.log('hello')
  
      // // Update loading state
      App.setLoading(false)
    },

    createTask: async () => {
      App.setLoading(true)
      const rollno = $('#rollno').val();
      const mark1 = $('#mark1').val();
      const mark2 = $('#mark2').val();
      const mark3 = $('#mark3').val();
      const mark4 = $('#mark4').val();
      const mark5 = $('#mark5').val();
    //   const { createHash } = require('crypto');
      
    // var SHA256 = require("crypto-js/sha256");
    // console.log(SHA256("Message"));
    //   function hash(string) {
    //     return createHash('sha256').update(string).digest('hex');
    //   }
      const content = rollno+mark1+mark2+mark3+mark4+mark5;
    //   const hashContent = SHA256(content);
      console.log(content);
      setTimeout('', 10000);
      var encrypted = CryptoJS.SHA256(content);
      console.log(encrypted)
      await App.verifier.createTask(encrypted,  { from:  App.account})
    //   window.location.reload()
      alert('done')
    },

  
    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }
  
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })