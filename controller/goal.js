let Goal = require('../models/goal');

let createGoal = (req, res, next) => {

};

let updateGoal = (req, res, next) => {
  let goalName = req.body.goalName,
      goalId = req.body.goalId,
      callBackURL = req.body.callBackURL,
      goalText = req.body.goalText;

  if (!goalName) {
    console.log('Invalid goal name');
  } else if (!goalText) {
      console.log('Invalid goal text');
  } else if (!goalId) {
      console.log('Invalid goal Id');
  }else if (!callBackURL) {
      console.log('Invalid goalId');
  } else {
    Goal.findById(goalId, (err, goal) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            goal.goalName = goalName || goal.goalName;
            goal.goalText = goalText || goal.goalText;
            goal.save((err, goal) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Updated goal');
                    console.log(goal);
                    res.redirect(callBackURL);
                }
            });
        }
    });
  }
};

let deleteGoal = (req, res, next) => {

};

module.exports = {
  createGoal,
  updateGoal,
  deleteGoal
};