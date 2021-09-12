const mongoose = require('mongoose')
const url = process.env.MONGODB_URI;

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const productSchema = new mongoose.Schema({
  name: String,
  boughtDate: Date,
  important: Boolean,
})

const Product = mongoose.model('Product', productSchema)

const product = new Product({
  name: 'Frying pan',
  boughtDate: new Date(),
  important: true,
})

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Product', productSchema)