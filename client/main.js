import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { DDP } from 'meteor/ddp-client'
import './main.html';
import '../client/jquery.backgroundPosition.js';
import '../client/jquery.spritely.js';
import '../client/slot.js';
import '../ui/slot.css';

// const handle = Meteor.subscribe('prize');
// Tracker.autorun(() => {
//   Meteor.subscribe("prize", {Id: Session.get("_id")});
// });

Template.hello.helpers({
  counter() {
    return Prizes.find().count();
  },
  mySub() {
    var myCursor = Prizes.find().fetch();
    return myCursor;
  }
});

Template.awardList.helpers({
//   formerFivePrizes() {
// return
//   },
  prizes() {
    return Prizes.find({}, { sort: { index: -1 } }).fetch();
  },
  awards(prize) {
    var myCursor = Members.find({ Prize: prize }).fetch();
    return myCursor;
  }
});

Template.awardInput.helpers({
  prizes() {
    return Prizes.find({}, { sort: { index: -1 } }).fetch();
  },
  awards(prize) {
    var myCursor = Members.find({ Prize: prize }).fetch();
    return myCursor;
  }
});

Template.prizeInput.helpers({
  prizes() {
    return Prizes.find().fetch();
  }
});



// Template.hello.onCreated(function() {
//   this.getListId = () => FlowRouter.getParam('_id');

//   this.autorun(() => {
//     counter = this.subscribe('prize', this.getListId());

//   });
// });

Template.hello.events({
  'click button': function () {
    var email = $('#tbxCustEmail').val();
    var msg = $('#tbxCustMsg').val();
    Prizes.insert({ Email: email, Message: msg });
  }
});;

Template.awardInput.events({
  'click button': function () {
    var prize = $('#prizes').val();
    var seq = $('#Sequence').val();
    var totalPrizes = Prizes.find();
    var checker = Prizes.find({ Prize: prize });
    if (checker.count() > 0) {
      var member = Members.findOne({ Sequence: parseInt(seq), Prize: "" });
      if (member != undefined)
        Members.update({ _id: member._id }, { $set: { Prize: prize } });
      else
        alert('號碼不存在或已中獎');
    }
    else {
      Prizes.insert({ Sequence: totalPrizes.count() + 1, Prize: prize });
      var member = Members.findOne({ Sequence: parseInt(seq), Prize: "" });
      if (member != undefined)
        Members.update({ Sequence: seq }, { $set: { Prize: prize } });
      else
        alert('號碼不存在或已中獎');
    }
    $('#Sequence').val('');
  }
});;

Template.prizeInput.events({
  'click button': function () {
    var prize = $('#prize').val();
    var totalPrizes = Prizes.find();
    var checker = Prizes.find({ Prize: prize });
    if (checker.count() == 0) {
      Prizes.insert({ index: totalPrizes.count() + 1, Prize: prize });
    }
    $('#prize').val('');
  }
});