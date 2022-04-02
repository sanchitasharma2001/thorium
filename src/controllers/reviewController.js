const bookModel = require("../models/bookModel")
const reviewModel = require('../models/reviewModel')
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const validations=require("../validations/validator")

const addReview = async (req, res) => {
    try {
        if (!(validations.isValid(req.params.bookId) && validations.isValidObjectId(req.params.bookId))) {
            return res.status(400).send({ status: false, msg: "BookId is not valid" })
        }
        if (!validations.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: 'Review body is empty' })

        }
        let { reviewedBy, rating, review } = req.body
        if (!validations.isValid(review)) {
            return res.status(400).send({ status: false, message: 'Review is not valid' })
        }
        if (!validations.isValid(rating)) {
            return res.status(400).send({ status: false, message: 'Rating is not valid' })

        }
        if (!([1, 2, 3, 4, 5].includes(Number(rating)))) {
            return res.status(400).send({ status: false, msg: "Rating should be from [1,2,3,4,5] this values" })

        }
        let book = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })
        if (book) {

            req.body["bookId"] = req.params.bookId
            req.body["reviewedAt"] = new Date()

            let review = await reviewModel.create(req.body)

            let ReviewCount = await reviewModel.find({ bookId: req.params.bookId }).count()


            let countUpdate = await bookModel.findOneAndUpdate({ _id: req.params.bookId }, { reviews: ReviewCount })

            return res.status(201).send({ status: true, msg: "Thank you for Reviewing the book !!!", addedReview: review })

        } else {
            return res.status(404).send({ status: true, msg: "No such book exist to be review" })
        }
    } catch (err) {
       return res.status(500).send({ status: false, error: err.message })

    }
}

//----------------------------------------------------------------------------------------------------------------

const updateReview = async (req, res) => {

    try {
        let update = {}

        if (!(validations.isValid(req.params.bookId) && validations.isValidObjectId(req.params.bookId))) {
            return res.status(400).send({ status: false, msg: "BookId is not valid" })
        }

        if (!(validations.isValid(req.params.reviewId) &&  validations.isValidObjectId(req.params.reviewId))) {
            return res.status(400).send({ status: false, msg: "ReviewId is not valid" })
        }

        let book = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })
        if (!book) {
            return res.status(400).send({ status: false, msg: "Book not exist can't update it's review !!!!" })
        }

        let review2= await reviewModel.findOne({ _id: req.params.reviewId, isDeleted: false })

        if (!review2) {
            return res.status(400).send({ status: false, msg: "Review not exist can't update it !!" })
        }

        if (!validations.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: 'Review update body is empty' })

        }

        let { reviewedBy, rating, review } = req.body
        if (reviewedBy) {
            if (!validations.isValid(reviewedBy)) {
                return res.status(400).send({ status: false, message: 'ReviewedAt is not valid value ' })
            }
            update["reviewedBy"] = reviewedBy
        }
        if (review) {
            if (!validations.isValid(review)) {
                return res.status(400).send({ status: false, message: 'ReviewedAt is not valid value ' })
            }
            update["review"] = review
        }
        if (rating) {
            if (!([1, 2, 3, 4, 5].includes(Number(rating)))) {
                return res.status(400).send({ status: false, msg:"Rating should be from [1,2,3,4,5] this values" })

            }
            update["rating"] = rating
        }
        let updatedReview = await reviewModel.findOneAndUpdate({ _id: req.params.reviewId, isDeleted: false }, update, { new: true })

        return res.status(200).send({ status: false, msg: "Review update is successfull...", updatedReview })


    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


//-----------------------------------------------------------------------------------------------------------------
const deleteReview = async (req, res) => {

    try {

        if (!(validations.isValid(req.params.bookId) && validations.isValidObjectId(req.params.bookId))) {
            return res.status(400).send({ status: false, msg: "bookId is not valid" })
        }

        if (!(validations.isValid(req.params.reviewId) && validations.isValidObjectId(req.params.reviewId))) {
            return res.status(400).send({ status: false, msg: "reviewId is not valid" })
        }

        let book = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })

        if (!book) {
            return res.status(400).send({ status: false, msg: " book not exist " })
        }

        let deletedReview = await reviewModel.findOneAndUpdate({ _id: req.params.reviewId, isDeleted: false }, { isDeleted: true })

        if (deletedReview) {
            let reviewount = await reviewModel.find({ bookId: req.params.bookId, isDeleted: false }).count()
            await bookModel.findOneAndUpdate({ _id: req.params.bookId }, { reviews: reviewount })
            return res.status(200).send({ status: true, msg: "review is deleted successfully" })
        } else {
            return res.status(400).send({ status: false, msg: "review not exist" })
        }

    } catch (err) {

        console.log(err)
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports.addReview = addReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview
