const reviewModel = require("../models/reviewModel");
const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const createReview = async function(req, res){
    try {
        const params = req.params
        const bookId = params.bookId

        if(!bookId) {
            res.status(400).send( { status : false , message : `${book} is Not a valid Book Id`} )
            return
        }
            
           const data = req.body;
        
           if(Object.keys(data).length !==0 ){
               const{bookId, reviewBy, reviewAt, rating, review} = data

               //VALIDATIONS
           if(!isValid(bookId)){
               return res.status(400).send({status: false, message: "BookId is required"})
           }
           if(!isValid(reviewBy)){
               return res.status(400).send({status: false, message: "Review by who is required"})
           }
           if(!isValid(rating)){
               return res.status(400).send({status: false, message: "Ratings are required"})
           }
           if(!isValid(review)){
               return res.status(400).send({status: false, message: "Reviews are required"})
           }

           let Rating = data.rating
           let validateRating = function(Rating){
               return /^[0-5]([\.][0-5][0-5]?)?$/.test(Rating)
           }
           if (!validateRating(Rating)){
            return res.status(400).send({status: false , message: "Please enter rating in range 1 to 5"})
           }

           let ReviewAt = data.reviewAt
           let validateReviewAt = function (ReviewAt) {
               return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(ReviewAt)
           }
           if (!validateReviewAt(ReviewAt)){
           return res.status(400).send({status: false , message: "Please enter ReviewAt in a valid format i.e. YYYY-MM-DD"})
           }

           const createReview = await reviewModel.create(data)
        return res.status(201).send({status: true, message: "Reviews are created sucessfully", data: createReview})
           }
    } catch (error) {
        return res.status(500).send({status: false, msg: error.message})
    }
}



const updateReview = async function (req, res) {

    try {

        const reviewID = req.params.reviewId
        const bookId = req.params.bookId
        let updateData = req.body
        let updateQuery = {}

        if (!isValid(updateData)) {
            return res.status(400).send({ status: false, message: "Please Provide Data To Update" })
        }

        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid Book Id" })
        }

        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: "Book Not Found, PLease check book Id" })
        }
        if (!isValid(reviewID)) {
            return res.status(400).send({ status: false, message: "Invalid ReviewId" })
        }

        let Review = await reviewModel.findOne({ _id: reviewID, isDeleted: false })
        if (!Review) {
            return res.status(404).send({ status: false, message: "Review Not Found, Please Check Review Id" })
        }

        if (Review['bookId'] != bookId) {
            return res.status(400).send({ status: false, message: "This review dosent belong To given Book Id" })
        }
        
        let { reviewBy, rating, review } = updateData
        let reviewKeys = ["reviewBy", "rating", "review"]
        for (let i = 0; i < Object.keys(req.body).length; i++) {
            let key = reviewKeys.includes(Object.keys(req.body)[i])
            if (!key)
                return res.status(400).send({ status: false, msg: "Wrong Key present" })
        }

        if (Object.keys(updateData).includes("reviewBy")) {
            if ((reviewBy.trim() == "") || (reviewBy == null)) {
                reviewBy = 'Guest'
            }
            if (typeof reviewBy !== 'string') {
                return res.status(400).send({ status: false, message: "Please Give a proper Name" })
            }
            updateQuery.reviewBy = reviewBy
        }


        if (Object.keys(updateData).includes("ratings")) {
            if (typeof rating != 'number') {
                return res.status(400).send({ status: false, message: "invalid Rating Input" })
            }
            if (!(rating >= 1 && rating <= 5)) {
                return res.status(400).send({ status: false, message: "Invalid Rating! , please rate in beetween 1 to 5" })
            }

            updateQuery.rating = rating
        }

        if (Object.keys(updateReview).includes("reviews")) {

            if (!isValid(review)) {
                return res.status(400).send({ status: false, message: "Please Enter A Valid Review" })
            }
            updateQuery.review = review
        }
        if (Review['bookId'] == bookId) {

            const updatedReview = await reviewModel.findOneAndUpdate({ _id: reviewID, isDeleted: false },
                { $set: updateQuery },
                { new: true }).select({ __v: 0 })

            return res.status(200).send({ status: true, message: "Success", Data: updatedReview })


        } else {
            return res.status(400).send({ status: false, message: "This review dosent belong To given Book Id" })
        }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




const deleteReview = async function(req, res) {

    try {
        if (!isValid(req.params.bookId)) {
            return res.status(400).send({ status: false, msg: "bookId is not valid" })
        }

        if (!isValid(req.params.reviewId)) {
            return res.status(400).send({ status: false, msg: "reviewId is not valid" })
        }

        let book = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })

        if (!book) {
            return res.status(400).send({ status: false, msg: 'Book not exist ' })
        }

        const deleteReview = await reviewModel.findOneAndUpdate({ _id: req.params.reviewId, isDeleted: false }, { isDeleted: true })

        if (deleteReview) {
            const reviewCount = await reviewModel.find({ bookId: req.params.bookId, isDeleted: false }).count()
            await bookModel.findByIdAndUpdate({ _id: req.params.bookId }, { reviews: reviewCount })
            return res.status(200).send({ status: true, msg: "review is deleted successfully" })
        } else {
            return res.status(400).send({ statsu: false, msg: 'review not exist' })
        }

    } catch (error) {
        res.status(500).send({ satus: false, error: error.message })
    }

}


module.exports.createReview = createReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview
