let getFlashMessages = (req, cb) => {
    let successMessage = req.flash('success');
    let successMessages = req.flash('success') || null,
        infoMessages = req.flash('info') || null,
        warningMessages = req.flash('warning') || null,
        errorMessages = req.flash('error') || null;
    console.log('Success Message: ' + successMessage);
    return cb (successMessages, infoMessages, warningMessages, errorMessages);
};

module.exports = {
  getFlashMessages
};