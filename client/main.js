import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { DDP } from 'meteor/ddp-client'
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
  mySub(){
    var myCursor = Prizes.find().fetch();
    return myCursor;
  }
});

Template.awardList.helpers({
  prizes() {
    return Prizes.find().count();
  },
  awards(prize){
    var myCursor = Members.find({Prize:prize}).fetch();
    return myCursor;
  }
});

// Template.hello.onCreated(function() {
//   this.getListId = () => FlowRouter.getParam('_id');

//   this.autorun(() => {
//     counter = this.subscribe('prize', this.getListId());
    
//   });
// });

Template.hello.events({
    'click button': function(){
          var email = $('#tbxCustEmail').val();
          var msg = $('#tbxCustMsg').val();
          Prizes.insert({Email:email,Message:msg});
    }
});;

Template.prizeInput.events({
    'Update Prize': function(){
          var prize = $('#prizes')[0].val();
          var seq = $('#Sequence').val();
          var TotalPrizes = Prizes.find();
          var Checker = Prizes.find({Prize:prize});
          if(Checker.count() > 0)
            Prizes.Update({Sequence:seq},{$set:{Prize:prize}});
          else
            Prizes.insert({Sequence:TotalPrizes.count()+1, Prize:orize});
    }
});;
