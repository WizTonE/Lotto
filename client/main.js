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
    return Prize.find().count();
  },
  mySub(){
    var myCursor = Prize.find().fetch();
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
          Prize.insert({Email:email,Message:msg});
    }
});;

