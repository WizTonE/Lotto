var require = meteorInstall({"lib":{"router.js":function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// lib/router.js                                                            //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
FlowRouter.route('/', {                                                     // 1
    action: function () {                                                   // 2
        function action() {                                                 // 2
            BlazeLayout.render("mainLayout", { content: "awardList" });     // 3
        }                                                                   // 4
                                                                            //
        return action;                                                      // 2
    }()                                                                     // 2
});                                                                         // 1
                                                                            //
FlowRouter.route('/AwardInput', {                                           // 7
    action: function () {                                                   // 8
        function action() {                                                 // 8
            BlazeLayout.render("mainLayout", { content: "awardInput" });    // 9
        }                                                                   // 10
                                                                            //
        return action;                                                      // 8
    }()                                                                     // 8
});                                                                         // 7
                                                                            //
FlowRouter.route('/PrizeInput', {                                           // 13
    action: function () {                                                   // 14
        function action() {                                                 // 14
            BlazeLayout.render("mainLayout", { content: "prizeInput" });    // 15
        }                                                                   // 16
                                                                            //
        return action;                                                      // 14
    }()                                                                     // 14
});                                                                         // 13
//////////////////////////////////////////////////////////////////////////////

}},"collections":{"collections.js":function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// collections/collections.js                                               //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
Prizes = new Mongo.Collection('prizes');                                    // 1
Members = new Mongo.Collection('members');                                  // 2
//////////////////////////////////////////////////////////////////////////////

}},"server":{"main.js":["meteor/meteor",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// server/main.js                                                           //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});
                                                                            //
Meteor.startup(function () {                                                // 3
  // code to run on server at startup                                       // 4
});                                                                         // 5
//////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./lib/router.js");
require("./collections/collections.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
