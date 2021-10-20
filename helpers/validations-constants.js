// const nameValidation = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
const nameValidation = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?)/
const phoneValidation = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ -]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
// const emailValidation = /^((([0 - 9A - Za - z]{ 1}[-0 - 9A - z\.]{ 0, 30 } [0 - 9A - Za - z] ?)| ([0 - 9А - Яа - я]{ 1 } [-0 - 9А - я\.]{ 0, 30 } [0 - 9А - Яа - я] ?)) @([-A - Za - z]{ 1,} \.) { 1,} [-A - Za - z]{ 2,})$/
const emailValidation = /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u
// const emailValidation = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }

module.exports = {
  nameValidation,
  phoneValidation,
  emailValidation,
}
