export interface OrderItemDto {
  _id: string
  name: string
  price: number
  image: string
  commodityId: string
}

export interface BasicListItemDataType {
  _id: string
  userId: string
  createAt: number
  status: string
  price: number
  remark: string
  code: string

  userName: string,
  provinceName: string,
  cityName: string,
  countyName: string,
  detailAddressInfo: string,
  nationalCode: string,
  telNumber: string

  paymentTime?: number
  cancelTime?: number

  customerServiceCancelTime?: number
  customerServiceRemark?: string

  shippingTime?: number
  shippingNumber?: string
  shippingType?: string

  finishTime?: number

  items: OrderItemDto[]
}


