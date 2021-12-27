const { Contact } = require('../../db')

const listContacts = async (owner, page, limit, favorite) => {
  console.log('fav', favorite)
  console.log('type', typeof favorite)
  if (favorite === undefined) {
    const contacts = await Contact.paginate({ owner }, { page, limit })
    // const contacts = await Contact.paginate({ owner }, { page, limit })
    return contacts
  }
  // const fav = Boolean(favorite)
  // const contacts = await Contact.paginate({ owner, fav }, { page, limit })
  const contacts = await Contact.paginate({ owner, favorite }, { page, limit })
  // if (favorite === 'true') {
  //   const fav = 'true'
  //   const contacts = await Contact.paginate({ owner, fav }, { page, limit })
  //   // const contacts = await Contact.paginate({ owner, favorite: true }, { page, limit })
  //   console.log(contacts)
  //   // const contacts = await Contact.paginate({ owner, fav }, { page, limit })
  //   return contacts
  // }
  // if (favorite === 'false') {
  //   const contacts = await Contact.paginate({ owner, favorite: false }, { page, limit })
  //   // const contacts = await Contact.paginate({ owner, fav: false }, { page, limit })
  //   // const contacts = await Contact.paginate({ owner, Boolean(favorite) }, { page, limit })
  //   return contacts
  // }

  return contacts
}

module.exports = listContacts
