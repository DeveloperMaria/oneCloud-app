import * as yup from 'yup'

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  name: yup.string().required(),
  partner: yup.string().required(),
  active: yup.boolean().required()
})

export const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

export const partnerSchema = yup.object().shape({
  businessName: yup.string().required(),
  contactSurname: yup.string().required(),
  contactName: yup.string().required(),
  landlineTel: yup
    .number()
    .required()
    .max(20, 'Landline Tel must be at most 20 characters')
    .min(3, 'Landline Tel must be at least 3 characters'),
  telMobile: yup
    .number()
    .required()
    .max(20, 'Tel Mobile must be at most 20 characters')
    .min(3, 'Tel Mobile must be at least 3 characters'),
  code: yup.string().max(3).required(),
  active: yup.boolean().required()
})

export const clientSchema = yup.object().shape({
  customerType: yup.string().required(),
  billingGroup: yup.string().required(),
  surname: yup.string().required(),
  firstName: yup.string().required(),
  taxIDcode: yup.string().required(),
  identityDocument: yup.string().required(),
  technicalDepartmentEmail: yup.string().email().required(),
  number: yup.number().required(),
  email: yup.string().email().required(),
  pec: yup.string().required(),
  sDICode: yup.number().required(),
  mobilePhone: yup.number().required(),
  landlinePhone: yup.number().required(),
  invoiceViaEmail: yup.boolean().required(),
  paperInvoice: yup.boolean().required(),
  note: yup.string().required(),
  street: yup.string().required(),
  civic: yup.string().required(),
  common: yup.string().required(),
  province: yup.string().required(),
  postalCode: yup.string().required(),
  nation: yup.string().max(2).required(),
  payment: yup.string().required(),
  iBAN: yup.string().required(),
  bICCode: yup.string().required(),
  differentBillingAddress: yup.boolean().required(),
  disableUnpaidInvoiceChecking: yup.boolean().required(),
  status: yup.string().required()
})

export const ticketSchema = yup.object().shape({
  customer: yup.string().required(),
  service: yup.string().required(),
  assignTo: yup.string().required(),
  ticketType: yup.string().required(),
  reasonForRequest: yup.string().required(),
  priority: yup.string().required(),
  description: yup.string().required(),
  ticketVisibleByCustomer: yup.boolean().required(),
  addDescriptionForCustomer: yup.boolean().required(),
  descriptionForCustomer: yup.string().required(),
  closeTicketDueToInactivity: yup.number().required()
})

export const providerSchema = yup.object().shape({
  businessName: yup.string().required(),
  email: yup.string().email().required(),
  pec: yup.string().required(),
  supplierType: yup.string().required(),
  vatNumber: yup.number().required(),
  attorney: yup.string().required(),
  representativeTaxCode: yup.string().required(),
  taxIdCode: yup.string().required(),
  identityDocument: yup.string().required(),
  number: yup.number().required(),
  mobilePhone: yup.number().required(),
  landlinePhone: yup.number().required(),
  emailNOC: yup.string().email().required(),
  enableTicketSending: yup.boolean().required(),
  street: yup.string().required(),
  civic: yup.string().required(),
  common: yup.string().required(),
  province: yup.string().required(),
  postalCode: yup.string().required(),
  payment: yup.string().required(),
  iBAN: yup.string().required()
})

export const passiveSchema = yup.object().shape({
  supplierCompanyName: yup.string().required(),
  crediteNote: yup.boolean().required(),
  number: yup.number().required(),
  issueDate: yup.string().required(),
  expireDate: yup.string().required(),
  totalExcluding: yup.number().required(),
  totalNotSubject: yup.number().required(),
  totalNonTaxable: yup.number().required(),
  totalExempt: yup.number().required(),
  totalNotShown: yup.number().required(),
  totalReverseCharge: yup.number().required(),
  totalEUCountry: yup.number().required(),
  totalTaxableAmount: yup.number().required(),
  totalVAT: yup.number().required(),
  totalDocument: yup.number().required(),
  payment: yup.string().required(),
  note: yup.string().required()
})

export const ipAddressSchema = yup.object().shape({
  description: yup.string().required(),
  startIp: yup.string().required(),
  network: yup.string().required(),
  startIp1: yup.string().required(),
  reservedIps: yup.string().required(),
  active: yup.boolean().required()
})

export const accessPointSchema = yup.object().shape({
  ipAccessPoint: yup.string().required(),
  name: yup.string().required(),
  nas: yup.string().required(),
  node: yup.string().required()
})

export const comondiusSchema = yup.object().shape({
  ipCpe: yup.string().required(),
  name: yup.string().required(),
  address: yup.string().required(),
  referent: yup.string().required(),
  accessPoint: yup.string().required()
})
export const knotsSchema = yup.object().shape({
  firstName: yup.string().required(),
  address: yup.string().required()
})
export const nasSchema = yup.object().shape({
  ipNas: yup.string().required(),
  node: yup.string().required()
})

export const articleSchema = yup.object().shape({
  Description: yup.string().required(),
  Price: yup.number().required()
})
export const bundleSchema = yup.object().shape({
  Description: yup.string().required()
})

export const inventionGridSchema = yup.object().shape({
  Supervisor: yup.string().required(),
  Technician: yup.string().required(),
  AppointmentDate: yup.string().required(),
  AppointmentDuration: yup.string().required(),
  Customer: yup.string().required(),
  Service: yup.string().required(),
  Priority: yup.string().required(),
  Reminder: yup.string().required(),
  Contacts: yup.string().required(),
  Address: yup.string().required(),
  EstimatedPrice: yup.string().required(),
  NotifyCustomer: yup.boolean().required(),
})


export const profileSchema = yup.object().shape({
  BackendDescription: yup.string().required(),
  Descriptioninvoice: yup.string().required(),
  Service: yup.string().required(),
  Type: yup.string().required(),
  LineTechnicalProfile: yup.string().required(),
  BandPeakDown: yup.string().required(),
  BandaPiccoUP: yup.string().required(),
  PriceMonthly: yup.number().required(),
  RadiusServiceId: yup.number().required(),
  CommunicationCode: yup.string().required(),
  Partner: yup.string().required(),
  Business: yup.boolean().required(),
  active: yup.boolean().required(),

})

export const morSchema = yup.object().shape({
  BackendDescription: yup.string().required(),
  Descriptioninvoice: yup.string().required(),
  MORID: yup.number().required(),
  Service: yup.string().required(),
  CommunicationCode: yup.string().required(),
  Isnap: yup.number().required(),
  ITfixed: yup.number().required(),
  ITfurniture: yup.number().required(),
  FixedEU: yup.number().required(),
  EUfurniture: yup.number().required(),
  FixedWorld: yup.number().required(),
  WorldFurniture: yup.number().required(),
})

export const paymentMethodSchema = yup.object().shape({
  CommunicationCode: yup.string().required(),
  Description: yup.string().required(),
  InvoiceCodeEl: yup.string().required(),
  BillingNotes: yup.string().required(),
  Unpaidtext: yup.string().required(),
})


export const billingGroupSchema = yup.object().shape({
  firstName: yup.string().required(),
  Monthinadvance: yup.number().required(),
  Daytoexpiry: yup.number().required(),
  TransmitterCode: yup.number().required(),
  Name: yup.string().required(),
  Address: yup.string().required(),
  PostalCode: yup.number().required(),
  Common: yup.string().required(),
  Province: yup.string().required(),
  Telephone: yup.number().required(),
  CrimeCode: yup.string().required(),
  Bank: yup.string().required(),
  IBAN: yup.string().required(),
  PostalAccount: yup.number().required(),
  Email: yup.string().email().required(),
  VATNumber: yup.number().required(),
  TaxIDCode: yup.number().required(),
  SepaCodeCUC: yup.string().required(),
  SepaCreditorCode: yup.number().required(),
  DD1stUnpaidNotice: yup.number().required(),
  DD2stUnpaidNotice: yup.number().required(),
  GGServicesBlock: yup.number().required(),
  Nation: yup.number().required(),
})

export const rateSchema = yup.object().shape({
  Rate: yup.string().required(),
  Description: yup.string().required(),
  Nature: yup.string().required(),
  Default: yup.boolean().required(),
})