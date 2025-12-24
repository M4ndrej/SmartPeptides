export interface AffiliateUser {
    viewData: ViewData
  }
  
  export interface ViewData {
    paymentMethods: PaymentMethods
    paymentMethod: string
    affiliate: Affiliate[]
  }
  
  export interface PaymentMethods {
    manual: string
  }
  
  export interface Affiliate {
    affiliateId: string
    userId: string
    firstName: string
    lastName: string
    email: string
    addressLine1: string
    addressLine2: string
    addressCity: string
    addressState: string
    addressZipCode: string
    addressCountry: string
    status: string
    dateCreated: string
    companyName: string
    websiteUrl: string
    uniqueRefKey: string
    nameOnCheck: any
    paypalEmail: string
    bankDetails: string
    paymentMethod: string
    bountyType: string
    bountyAmount: string
    phoneNumber: string
    userData: string
  }
  