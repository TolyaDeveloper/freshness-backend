import { CustomerReviewModelType } from '../../../models/customer-review.model'
import { ProductModelType } from '../../../models/product.model'
import { CustomerReviewDto } from '../dto/customer-review.dto'

export interface IUserService {
  findCustomersReviews: () => Promise<CustomerReviewModelType[]>
  addCustomerReview: (
    customerReviewDto: CustomerReviewDto
  ) => Promise<CustomerReviewModelType>
  findAllCart: (productIds: string[]) => Promise<ProductModelType[]>
}
