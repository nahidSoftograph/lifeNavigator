let renderEditInstances = (req, res, next) => {
    res.render('instances/edit', {'title': 'Edit instances'});
};

let renderCreateSelect = (req, res, next) => {
    res.render('instances/createSelect', {'title': 'Create Select Instances'});
};

module.exports = {
    renderEditInstances,
    renderCreateSelect
};