const bookModel = require("../models/bookModel")
const jwt = require("jsonwebtoken")
const reviewModel = require("../models/reviewModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const createBook = async function(req, res){

    try {
        let data = req.body

        // data.releasedAt = Date.now()
        // data.isRealesed = true

        data.deleteAt = Date.now()
        data.isDeleted = false


        if (Object.keys(data).length !== 0) {
            const {title, excerpt, userId, ISBN, category, subCategory, reviews, deleteAt, releasedAt} = data

            //validation

            if (!isValid(title)) {
                return res.status(400).send({ status: false, message: `Title is required` })
            }


            if (!isValid(excerpt)) {
                return res.status(400).send({ status: false, message: `Excerpt is required` })
            }

            if (!isValid(userId)) {
                return res.status(400).send({ status: false, message: "UserId is required" })
            }
            if(!isValid(ISBN)){
                return res.status(400).send({status: false, message: "ISBN is required"})
            }
            if(!isValid(category)){
                return res.status(400).send({status:false, message: "category is required"})
            }

            // if(isValid(reviews)){
            //     return res.status(201).send({status:true, message: "No of reviews of this book"})
            // }

            const isTitleUsed = await bookModel.findOne({title: title});
            if(isTitleUsed){
                return res.status(400).send({status: false, msg:  " Book with same title is already exist."})
            }

            if(subCategory) {
                if(Array.isArray(subCategory)) {
                    data['subCategory'] = [...subCategory]
                }
                if(Object.prototype.toString.call(subCategory) === '[object String]') {
                    data['subcategory'] = [ subCategory ]
                }
            }else{
                return res.status(400).send({status: false, message: "Subcategory is required"})            }
            }
            
            let isbn = data.ISBN
            let validateISBN = function (isbn) {
                return /^(\d{13})?$/.test(isbn)
            }
            if (!validateISBN(isbn)){
            return res.status(400).send({status: false , message: "Please enter a 13 digit valid ISBN"})
            }

            let ReleasedAt = data.releasedAt
            let validateReleasedAt = function (ReleasedAt) {
                return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(ReleasedAt)
            }
            if (!validateReleasedAt(ReleasedAt)){
            return res.status(400).send({status: false , message: "Please enter releasedAt in a valid format i.e. YYYY-MM-DD"})
            }

         const createBook= await bookModel.create(data)

            return res.status(201).send({ status: true, message: "Books with all the details created Sucessfully", data: createBook })

        
        }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}



const getBook = async function (req, res) {

    try {
        const filterQuery = { isDeleted : false , deletedAt : null , isRealesed : true }
        let queryParams = req.query

        if(Object.keys(queryParams) != 0){
          const {  userId , category , subCategory} = queryParams 

          let validateUserId = function(UserId){
              return /^[a-f\d]{24}$/.test(UserId)
          }
             if(isValid(userId) && validateUserId(userId)) {
                filterQuery['userId'] = userId
            }

            if(isValid(category)) {
                filterQuery['category'] = category.trim()
            }

            if(isValid(subCategory)) {
                const subcatArr = subCategory.trim().split(',').map(subCategory => subCategory.trim());
                filterQuery['subCategory'] = {$all : subcatArr}
            }

        const books = await bookModel.find({$and : [filterQuery]}).sort({title:1}).select({_id:1,title:1, userId:1, category:1, releasedAt:1, reviews:1})
        if(books.length == 0){
            return res.status(404).send({status: false, msg: "No books available."})
        }
        return res.status(200).send({status: true, message: "Books List", data: books})
          
     }
    }
    
      catch (err) {
        res.status(500).send( { Status : false ,Error: err.message } )
    }
}


const getBookById = async function(req, res){
    try{
        let book_Id = req.params.bookId

        let book = await bookModel.findById(book_Id)
        if(!book){
            return res.status(404).send({status: false, message: "Book does not exists"})
        }
        let reviews1 = await reviewModel.find({bookId: book_Id})
        let obj = {
            _id: book._id,
            title: book.title,
            excerpt: book.excerpt,
            userId: book.userId,
            category: book.category,
            subCategory: book.subCategory,
            isDeleted: book.isDeleted,
            reviews: book.reviews,
            deleteAt: book.deleteAt,
            releasedAt: book.releasedAt,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            reviewsData: reviews1
        }
        return res.status(200).send({status: true, message: "Book details with reviews", data: obj})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({status: false, message: error.message})
    }
}


const updateBook = async function (req, res)  {

    try{
        let book_Id = req.params.bookId

        let Book = await bookModel.findById(book_Id)
        if(!Book){
            return res.status(404).send({status: false, message: "Book not found"})
        }

        let is_Deleted = Book.isDeleted
        if(is_Deleted == true){
            return res.status(404).send({status: false,  message: "Book is deleted already"})
        }

        let Title = req.body.title
        let Excerpt = req.body.excerpt
        let ReleasedAt = req.body.releasedAt
        let isbn = req.body.ISBN

        let titleExist = await bookModel.findOne({title: Title})
        if(titleExist){
            return res.status(400).send({status: false, message: "Title is already exists"})
        }

        let ISBNExist = await bookModel.findOne({ISBN: isbn})
        if(ISBNExist){
            return res.status(400).send({status: false, message: "ISBN already exists"})
        }

        let updatedBook = await bookModel.findOneAndUpdate({_id: book_Id},
            {
                $set:{
                    title: Title, excerpt: Excerpt, releasedAt: ReleasedAt, ISBN: isbn
                }
            }, {new: true})

            return res.status(200).send({status: true, message: "Your  book details have been updated successfully", updatedBook})
        }

        catch(error){
            console.log(error.message)
            return res.status(500).send({status: false, message:error.message})
        }   
}


const deleteById = async function(req, res) {

    try {
        const params = req.params
        const bookId = params.bookId

        if(!bookId) {
            res.status(400).send( { status : false , message : `${book} is Not a valid Book Id`} )
            return
        }
         const book = await bookModel.findOne( { _id: bookId, isDeleted : false, deletedAt : null } )
         if(!book) {
             res.status(404).send( {status : false , message : 'book not found'} )
             return
         }
        
        await bookModel.findOneAndUpdate( {_id: bookId }, {$set : { isDeleted : true , deletedAt : new Date() }} )
        res.status(200).send( { status : true , message : "Book Deleted Successfully" } )
    
    } catch (error) {
        res.status(500).send({ Err: error.message })
    }
}

module.exports.createBook = createBook
module.exports.getBook = getBook
module.exports.getBookById = getBookById
module.exports.updateBook = updateBook
module.exports.deleteById = deleteById
