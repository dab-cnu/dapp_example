App = {
  web3Provider: null,
  contracts: {},
  init: function() {
    return App.initWeb3();
  },
  initWeb3: function() {
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(App.web3Provider);
    App.account = web3.eth.accounts[0];
    return App.initContract();
  },
  initContract: function(){
    $.getJSON('show_human.json', function(data){
      App.contracts.show_human = TruffleContract(data);
      App.contracts.show_human.setProvider(App.web3Provider); 
      App.watchEvent();
      return App.render();
    });
  },
  addHuman: function() {
    var show_humanInstance;
    var humanName = document.getElementById('humanName').value;
    var humanAge = document.getElementById('humanAge').value;
    
    App.contracts.show_human.deployed().then(function(instance) {
      show_humanInstance = instance;
      return show_humanInstance.addHuman(humanName, humanAge,{from: App.account});
    }).then(function(receipt) {
      $('.loader').show();
      $('.contents').hide();
      $('from').hide();
    }).catch(function(err) {
      alert(err);
    });
  },
  watchEvent: function() {
    App.contracts.show_human.deployed().then(function(instance) {
      instance.AddedHumanEvent().watch(function(err, event) {
        console.log('Added Human Event Triggered,', event);
        if (err) {
          alert(err);
        }
        App.render();
      });
    })
  },
  render: function(){
    var loader = $('.loader');
    var contents = $('.contents');
    var show_humanInstance;

    loader.show();
    contents.hide();  

    App.contracts.show_human.deployed().then(function(instance){
      show_humanInstance = instance;
      
      return show_humanInstance.getHumanCount.call();
    }).then(function(count) {
      var humanCount = count.toNumber();
      var humanList = $('.humanList');
      
      humanList.empty();

      for (let i = 0; i < humanCount; i++) {
        show_humanInstance.getHuman(i).then(function(human_info) {
          var name = human_info[0];
          var age = human_info[1];

          var humanTemp = "<tr><th>" + name + "</th><td>" + age +"</td></tr>";
          humanList.append(humanTemp);
        });
      }
    }).then(function(){
      loader.hide();
      contents.show();
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});