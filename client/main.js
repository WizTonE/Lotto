import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { ReactiveVar } from 'meteor/reactive-var';
// import { DDP } from 'meteor/ddp-client'
import './main.html';
import './templates/prizeInput.html';
import './templates/awardList.html';
import './templates/awardInput.html';
import '../client/jquery.backgroundPosition.js';
import '../client/jquery.spritely.js';
import '../client/slot.js';
import '../ui/carousel.css';

// const handle = Meteor.subscribe('prize');
// Tracker.autorun(() => {
//   Meteor.subscribe("prize", {Id: Session.get("_id")});
// });


pagingIndex = 0;
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
  AwardListChanged: function(){
    return Session.get("AwardListChanged");
  },
  prizes() {
    return Prizes.find({}, { sort: { index: -1 } }).fetch();
  },
  pageAwards(prize) {
    if(prize != undefined)
    {
      var totalAwardsbyPrize = Members.find({ Prize: prize }).count();
      var loopItem =  Math.ceil(totalAwardsbyPrize/10)*10;
      if(totalAwardsbyPrize > 0)
      {
        if(pagingIndex <= loopItem)
        {
          var skips = pagingIndex;

          pagingIndex = pagingIndex + 10;
          var limits = skips + 10;

          var awards = Members.find({Prize: prize}, { sort: {Time:1} }).fetch();
          return awards.slice(skips, limits);
        }
      }
    }
  },
  
  paging(prize){
    var totalAwardsbyPrize = Members.find({ Prize: prize }).count();
    var loopItem =  Math.ceil(totalAwardsbyPrize/10);
    console.log('totalAwardsbyPrize:'+totalAwardsbyPrize);
    var foreachArray = [];
    for(i = 0; i < loopItem; i ++)
    {
      foreachArray[i] = {Prize:prize};
    }
    console.log('foreachArray:'+foreachArray);
   return foreachArray;
  },
  awards(prize) {
    var myCursor = Members.find({ Prize: prize },{ sort: {Time:1}} ).fetch();
    return myCursor;
  },
  isFirstIndex(index) {
    if (index == 1) return true;
    else return false;
  },
  isPagingRequired(prize){
    if(prize=='六獎' || prize=='五獎'){
      return true;
    }
    else
      return false;
  },
  isAwards6(prize){
    if(prize=='六獎'){
      return true;
    }
    else
      return false;
  },
  isAwards5(prize){
    if( prize=='五獎'){
      return true;
    }
    else
      return false;
  },
  isAwards4(prize){
    if( prize=='四獎'){
      return true;
    }
    else
      return false;
  },
  last5Members() {
    return Members.find({ Prize: { $ne: "" } }, { sort: { Time: -1 }, limit: 5 }).fetch();
  },
  lastMember() {
    return Members.find({ Prize: { $ne: "" } }, { sort: { Time: -1 }, limit: 1 }).fetch();
  },
  tableRowStyle(idx) {
    if (idx % 2 === 1)
      return "danger";
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

Template.awardListCarousel.helpers({
  isFirstIndex(index) {
    if (index == 1) return true;
    else return false;
  },
  prizes() {
    return Prizes.find({}, { sort: { index: -1 } }).fetch();
  },
  awards(prize) {
    var myCursor = Members.find({ Prize: prize }).fetch();
    return myCursor;
  }
});

Template.slide.helpers({
  pageAwards(prize, page)
  {
    var awards = Members.find({Prize: prize}, { sort: {Time:1} }).fetch();
    if(page=='p1')
      return awards.slice(0, 10);
    if(page=='p2')
      return awards.slice(10, 20);
    if(page=='p3')
      return awards.slice(20, 30);
    if(page=='p4')
      return awards.slice(30, 40);
    if(page=='p5')
      return awards.slice(40, 50);
  },
});

Template.registerHelper('context', function(prize, page) {
  var result = _.clone(this);
    result.Prize = prize;
    result.Page = page;
    return result;
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
      if (member != undefined) {
        var time = new Date();
        Members.update({ _id: member._id }, { $set: { Prize: prize, Time: time } });
      }
      else
        alert('號碼不存在或已中獎');
    }
    else {
      Prizes.insert({ Sequence: totalPrizes.count() + 1, Prize: prize });
      var member = Members.findOne({ Sequence: parseInt(seq), Prize: "" });
      if (member != undefined) {
        var time = new Date();
        Members.update({ Sequence: seq }, { $set: { Prize: prize, Time: time } });
      }
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

Template.awardListCarousel.onRendered(function () {
  // Use the Packery jQuery plugin
  this.$('cl1').addClass('active');
});

Template.awardList.onRendered(function () {
  // Use the Packery jQuery plugin
  $(function () {
    $('.carousel').carousel({
      interval: 5000
    });
  });
  $(".owl-carousel").owlCarousel({
      interval: 5000
    });
  $('#myCarousel').on('slide.bs.carousel', function () {
    $('.right carousel-control').trigger('click');
  })
});