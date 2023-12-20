// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: string
  email: string
  name: string
  password: string
  role: string
  partner: string
  active:boolean
}

export type TrafficTelTypes ={
  id:string
  ClientId:string
  MorId:number
  MorUsername:string
  Customer:string
  Note:string
  Traffic:string
  TrafficCleared:boolean
  Sales:boolean
}

export type MassSendingTypes = {
  ClientId: string
  Surname: string
  Private: string
  Street: string
  Common: string
  PostalCode: string
  Province: string
  CustomerStatus: string
  Profile: string
  Guy: string
  Billing: string
  APName: string
  ServiceStatus: string
  App: string
  Cell: string
}

export type TicketTypes = {
  id: string
  state: string
  priority: string
  customer: string
  creation: string
  lastUpdate: string
  closure: string
  service: string
  ticketType: string
  brokenDown: string
  description: string
  partner: string
  takingCharge: string
  reasonForRequest: string
  assignTo: string
  ticketVisibleByCustomer: boolean
  addDescriptionForCustomer: boolean
  descriptionForCustomer: string
  closeTicketDueToInactivity: number
}

export type ClientType = {
  id: string
  name: string
  address: string
  city: string
  serviceToBeActivate: string
  activateService: string
  customerType: string
  billingGroup: string
  surname: string
  firstName: string
  taxIDcode: string
  identityDocument: string
  number: number
  technicalDepartmentEmail: string
  email: string
  pec: string
  sDICode: number
  mobilePhone: number
  landlinePhone: number
  invoiceViaEmail: boolean
  paperInvoice: boolean
  note: string
  street: string
  civic: string
  common: string
  province: string
  postalCode: string
  nation: string
  payment: string
  iBAN: string
  bICCode: string
  disableUnpaidInvoiceChecking: boolean
  differentBillingAddress: boolean
  status: string
}

export type CardType1 = {
  id: string
  description: string
  network: string
  startIp: string
  reservedIps: string
  guy: string
  active: boolean
  ipsUsed: string
  useableIps: string
  startIp1: string
}

export type CardType2 = {
  id: string
  ipAccessPoint: string
  name: string
  nas: string
  node: string
}

export type CardType3 = {
  id: string
  ipCpe: string
  name: string
  address: string
  referent: string
  ap: string
  node: string
  client: string
  accessPoint: string
}
export type CardType4 = {
  id: string
  firstName: string
  address: string
  customers: string
}

export type CardType5 = {
  id: string
  ipNas: string
  node: string
  client: string
}

export type PartnerType = {
  id: string
  businessName: string
  contactSurname: string
  contactName: string
  landlineTel: number
  telMobile: number
  code: string
  active: boolean
}

export type PassiveType = {
  id: string
  supplierCompanyName: string
  crediteNote: boolean
  number: number
  issueDate: string
  expireDate: string
  totalExcluding: number
  totalNotSubject: number
  totalNonTaxable: number
  totalExempt: number
  totalNotShown: number
  totalReverseCharge: number
  totalEUCountry: number
  totalTaxableAmount: number
  totalVAT: number
  totalDocument: number
  payment: string
  note: string
}

export type InvensionGridType = {
  id: string
  Supervisor: string
  Technician: string
  AppointmentDate: string
  AppointmentDuration: string
  Customer: string
  Service: string
  Priority: string
  Contacts: string
  Address: string
  EstimatedPrice: string
  NotifyCustomer: boolean
  Reminder: string
}

export type ProviderType = {
  id: string
  businessName: string
  cf: string
  beer: string
  email: string
  pec: string
  legalRepresentative: string
  address: string
  city: string
  supplierType: string
  vatNumber: number
  attorney: string
  representativeTaxCode: string
  taxIdCode: string
  identityDocument: string
  number: number
  mobilePhone: number
  landlinePhone: number
  emailNOC: string
  enableTicketSending: boolean
  street: string
  civic: string
  common: string
  province: string
  postalCode: string
  payment: string
  iBAN: string
}

export type NetMapType = {
  id: string
  svlanId: string
  clli: string
  svlanCode: string
  service: string
  startFrom: number
}

export type ModelType = {
  id: string
  name: string
  company: boolean
  reseller: boolean
  administrator: boolean
  administration: boolean
  assistance: boolean
  provisioning: boolean
  sales: boolean
  technician: boolean
  technical: boolean
}

export type ProjectListDataType = {
  id: string
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}

export type EditorType1 = {
  id: string
  BackendDescription: string
  Descriptioninvoice: string
  Service: string
  Type: string
  LineTechnicalProfile: string
  BandPeakDown: string
  BandaPiccoUP: string
  PriceMonthly: string
  RadiusServiceId: string
  CommunicationCode: string
  Partner: string
  Business: boolean
  active: boolean
  NofContracts: string
}

export type ArticleType = {
  id: string
  Description: string
  Price: number
}

export type BundleType = {
  id: string
  Description: string
  Articles: string
}

export type TelevoipTypes ={
  id :string
  No:number
  Customer:string
  BillingFrom:string
  Amount:number
  ClientId:number
  Service:string
  Period:string
  PriceVAT:number
  Discount:number
  Qty:number
  TotalExclVAT:number
  VAT:string
  Total:number
  Description:string
  Position:number
  Sales:boolean
}

export type ControlPanelType = {
  id: string
  Service: string
  Customer: string
  Address: string
  CreatedBy: string
  LastEdit: string
  Communicall: boolean
  Mike: boolean
  Radius: boolean
  Info: string
  Note: string
}

export type DetailType = {
  id: string
  Customer: string
  Minutes: number
  Cost: number
  ISnap: number
  Price: number
  Total: number
  Margin: number
  Fixed: number
  Mobile: number
  Nationals: number
  Foreign: number
  Sales: boolean
}

export type TotalType = {
  id: string
  Date: string
  Customer: string
  Caller: number
  Called: number
  Minutes: number
  Cost: number
  Village: string
  Fixed: boolean
  ISnap: number
  Price: number
}

export type InvoiceType = {
  id: string
  Period: string
  NoInvoices: string
  Taxable: string
  Free: string
  Tax: string
  Amount: string
  AmountCollected: string
}

export type ExerciseType = {
  id: string
  Service: string
  Customer: string
  Address: string
  ModifiedBy: string
  LastEdit: string
  DeliveredFrom: string
  ActivationDate: string
  IssueInvoice: string
}

export type CreditNotesType = {
  id: string
  Period: string
  NoNotes: string
  Taxable: string
  Free: string
  Tax: string
  Amount: string
}

export type EditorType2 = {
  id: string
  BackendDescription: string
  Descriptioninvoice: string
  MORID: string
  Service: string
  CommunicationCode: string
  Active: boolean
  Isnap: string
  ITfixed: string
  ITfurniture: string
  FixedEU: string
  EUfurniture: string
  FixedWorld: string
  WorldFurniture: string
  NofContracts: string
}

export type EditorType3 = {
  id: string
  CommunicationCode: string
  Description: string
  InvoiceCodeEl: string
  BillingNotes: string
  Unpaidtext: string
  NofCustomers: string
}

export type EditorType4 = {
  id: string
  firstName: string
  Monthinadvance: string
  Daytoexpiry: string
  TransmitterCode: string
  Name: string
  Address: string
  PostalCode: string
  Common: string
  Province: string
  Telephone: string
  CrimeCode: string
  Bank: string
  IBAN: string
  PostalAccount: string
  Email: string
  VATNumber: string
  TaxIDCode: string
  SepaCodeCUC: string
  SepaCreditorCode: string
  DD1stUnpaidNotice: string
  DD2stUnpaidNotice: string
  GGServicesBlock: string
  NofCustomers: string
  Nation: string
}

export type EditorType5 = {
  id: string
  Rate: string
  Description: string
  Nature: string
  Default: boolean
}
