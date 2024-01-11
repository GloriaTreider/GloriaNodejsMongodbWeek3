const express = require('express');
const partnerRouter = express.Router();
const Partner = require('../models/partner');
const authenticate = require('../authenticate');

//here we don't have an id yet

partnerRouter.route('/')
    .get((req, res, next) => {
        Partner.find()
        .then(partners => res.status(200).json(partners))
        .catch(err => next(err))
    })    
    .post(authenticate.verifyUser, (req, res, next) => {
        Partner.create(req.body)
        .then(partners => res.status(200).json(partners))
        .catch(err => next(err))
    })
    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /partners');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
         Partner.deleteMany()
        .then(partners => res.status(200).json(partners))
        .catch(err => next(err))
    });

    //here we deal with one partner at a time

partnerRouter.route('/:partnerId')
    
    .get((req, res, next) => {
        Partner.findById(req.params.partnerId)
        .then(partners => res.status(200).json(partners))
        .catch(err => next(err))
    })
    .post(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    })
    .put(authenticate.verifyUser, (req, res) => {
        Partner.findByIdAndUpdate(req.params.partnerId, req.body, { new: true })
        .then(partners => res.status(200).json(partners))
        .catch(err => next(err))
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Partner.findByIdAndDelete(req.params.partnerId)
        .then(partners => res.status(200).json(partners))
        .catch(err => next(err))
        
    });

module.exports = partnerRouter;