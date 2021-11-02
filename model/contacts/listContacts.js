const { Contact } = require('../../db')

const listContacts = async (owner, page, limit, favorite) => {
  if (favorite === undefined) {
    const contacts = await Contact.paginate({ owner }, { page, limit })
    return contacts
  }
  const contacts = await Contact.paginate({ owner, favorite }, { page, limit })

  return contacts
}

module.exports = listContacts
