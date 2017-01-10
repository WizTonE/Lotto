FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "awardList" });
    }
});

FlowRouter.route('/AwardInput', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "awardInput" });
    }
});

FlowRouter.route('/PrizeInput', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "prizeInput" });
    }
});

FlowRouter.route('/AwardCarousel', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "awardListCarousel" });
    }
});