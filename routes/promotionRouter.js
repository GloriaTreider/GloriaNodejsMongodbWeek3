const express = require('express');
const promotionRouter = express.Router();
const Promotion = require('../models/promotion');

//here we don't have an id yet

promotionRouter.route('/')
    .get((req, res, next) => {
        Promotion.find()
        .then(promotions => res.status(200).json(promotions))
        .catch(err => next(err))
    })    
    .post((req, res, next) => {
        Promotion.create(req.body)
        .then(promotions => res.status(200).json(promotions))
        .catch(err => next(err))
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
         Promotion.deleteMany()
        .then(promotions => res.status(200).json(promotions))
        .catch(err => next(err))
    });

    //here we deal with one promotion at a time

promotionRouter.route('/:promotionId')
    
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId)
        .then(promotions => res.status(200).json(promotions))
        .catch(err => next(err))
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
    })
    .put((req, res) => {
        Promotion.findByIdAndUpdate(req.params.promotionId, req.body, { new: true })
        .then(promotions => res.status(200).json(promotions))
        .catch(err => next(err))
    })
    .delete((req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promotionId)
        .then(promotions => res.status(200).json(promotions))
        .catch(err => next(err))
        
    });

module.exports = promotionRouter;