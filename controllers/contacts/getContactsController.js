const { listContacts } = require('../../model/contacts')
const { HTTPCodes } = require('../../helpers')

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user
  // let { page = 1, limit = 20, favorite } = req.query
  let { page, limit, favorite } = req.query
  console.log(req.query)
  if (page === undefined || page === '') {
    console.log('before', page)
    page = 1
    console.log('after',page)
  }
  if (limit === undefined || limit === '') {
    limit = 20
    // limit = 2
  }
  if (favorite === undefined || favorite === '') {
    favorite = undefined
  }
  // limit = limit > 2 ? 2 : limit
  limit = limit > 20 ? 20 : limit
  // const {page, limit, favorite} = req.query
  // if (Object.keys(req.query).length === 0) {
  // if (page !== '' || limit !== '' || favorite !== '') {
  //   // let { page = 1, limit = 20, favorite } = req.query
  //   console.log('req.query', req.query)
  //   console.log('favorite', favorite)
  //   console.log('page', page)
  //   console.log('limit', limit)

  //   limit = limit > 20 ? 20 : limit

  //   // const contacts = await listContacts(owner, page, limit, favorite)
  //   // // let { page = 1, limit = 20, favorite = undefined } = req.query

  //   // res.status(HTTPCodes.OK).json(
  //   //   { contacts: contacts, message: 'success', code: HTTPCodes.OK }
  //   // )
  // }
  // // let { page = 1, limit = 20, favorite } = req.query
  // // }
  // if (page === '' || limit === '' || favorite === '') {
  //   const queryObj = { ...req.query }
  //   queryObj.page = 1
  //   queryObj.limit = 20
  //   queryObj.limit = queryObj.limit > 20 ? 20 : queryObj.limit
  //   queryObj.favorite = undefined
  //   // const contacts = await listContacts(owner, queryObj.page, queryObj.limit, queryObj.favorite)

  //   // res.status(HTTPCodes.OK).json(
  //   //   { contacts: contacts, message: 'success', code: HTTPCodes.OK }
  //   //   )
  // }

  // const contacts = await listContacts(owner, page, limit, favorite)
  // // let { page = 1, limit = 20, favorite = undefined } = req.query

  // res.status(HTTPCodes.OK).json(
  //   { contacts: contacts, message: 'success', code: HTTPCodes.OK }
  // )
  // limit = limit > 20 ? 20 : limit
  const contacts = await listContacts(owner, page, limit, favorite)

  res.status(HTTPCodes.OK).json(
    { contacts: contacts, message: 'success', code: HTTPCodes.OK }
  )
}

module.exports = getContactsController
