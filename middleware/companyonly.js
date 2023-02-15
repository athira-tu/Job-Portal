const companyonly = (req, res, next) => {
    if (req.session.employer) {
        next()
    } else {
        res.redirect('/company/login')
    }

}

module.exports = companyonly