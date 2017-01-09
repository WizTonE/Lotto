FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "awardList" });
    }
});

FlowRouter.route('/PrizeInput', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "prizeInput" });
    }
});