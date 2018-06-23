let renderHomePage = (req, res, next) => {
    res.render('defaultSite/homePage', {'title': 'Home Page'});
};

let renderAccomplishments = (req, res, next) => {
    res.render('defaultSite/accomplishments', {'title': 'Accomplishments'});
};

let renderFutureGoals = (req, res, next) => {
    res.render('defaultSite/futureGoals', {'title': 'Future Goals'});
};

let renderAssessRisk = (req, res, next) => {
    res.render('defaultSite/assessRisk', {'title': 'Assess Risk'});
};

let renderMyPlan = (req, res, next) => {
    res.render('defaultSite/myPlan', {'title': 'My Plan'});
};

module.exports = {
    renderHomePage,
    renderAccomplishments,
    renderFutureGoals,
    renderAssessRisk,
    renderMyPlan
};