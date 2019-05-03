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
  initContract: function() {
    $.getJSON('Voting.json', function(voting) {
      App.contracts.Voting = TruffleContract(voting);
      App.contracts.Voting.setProvider(App.web3Provider);
      App.watchEvent();
      return App.render();
    });
  },
  addCandidate: function() {
    var votingInstance;
    var candidateName = document.getElementById('candidateName').value;
    App.contracts.Voting.deployed().then(function(instance) {
      votingInstance = instance;
      return votingInstance.addCandidate(candidateName, {from: App.account});
    }).then(function(receipt) {
      $('.loader').show();
      $('.contents').hide();
      $('from').hide();
    }).catch(function(err) {
      alert(err);
    });
  },
  vote: function() {
    var votingInstance;
    var candidateId = $('#candidateSelect').val();
    App.contracts.Voting.deployed().then(function(instance) {
      votingInstance = instance;
      return votingInstance.vote(candidateId, {from: App.account});
    }).then(function(receipt) {
      $('.loader').show();
      $('.contents').hide();
      $('from').hide();
    }).catch(function(err) {
      alert(err);
    });
  },
  watchEvent: function() {
    App.contracts.Voting.deployed().then(function(instance) {
      instance.AddedCandidateEvent().watch(function(err, event) {
        console.log('Added Candidate Event Triggered,', event);
        if (err) {
          alert(err);
        }
        App.render();
      });
      instance.VotedEvent().watch(function(err, event) {
        console.log('Voted Event Triggered,', event);
        if (err) {
          alert(err);
        }
        App.render();
      });
    })
  },
  render: function() {
    var loader = $('.loader');
    var contents = $('.contents');
    var ownerTag = $('.owner');

    var votingInstance;

    loader.show();
    contents.hide();

    App.contracts.Voting.deployed().then(function(instance) {
      votingInstance = instance;
      votingInstance.getOwner.call().then(function(owner) {
        ownerTag.html("Contract Owner is : " + owner)
      });

      $('.yourAccount').html("Your Account is : " + App.account);

      return votingInstance.getCandidateListLength.call();
    }).then(function(count) {
      var candidateCount = count.toNumber();
      var candidateList = $('.candidateList');
      var candidateSelect = $('#candidateSelect');

      candidateList.empty();
      candidateSelect.empty();

      for (let i = 0; i < candidateCount; i++) {
        votingInstance.getCandidate(i).then(function(candidate_info) {
          var name = candidate_info[0];
          var voteCount = candidate_info[1];

          var candidateTemp = "<tr><th>" + name + "</th><td>" + voteCount + "</td></tr>";
          var candidateOpt = "<option value='" + i + "'>" + name + "</option>";
          candidateList.append(candidateTemp);
          candidateSelect.append(candidateOpt);
        });
      }

      return votingInstance.getVoterCount();
    }).then(function(vCount) {
      var voterCount = vCount.toNumber();
      var voterList = $('.voterList');

      voterList.empty();

      for (var i = 0; i < voterCount; i++) {
        votingInstance.getVoter(i).then(function(voter_info) {
          var address = voter_info[0];
          var right = voter_info[1];
          var voterTemp = "<tr><th>" + address + "</th><td>" + right + "</td></tr>";
          voterList.append(voterTemp);
        });
      }
    }).then(function() {
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