import { CustomerReviewModelType } from '../../../models/customer-review.model'
import { CustomerReviewDto } from '../dto/customer-review.dto'

export interface IUserService {
  findCustomersReviews: () => Promise<CustomerReviewModelType[]>
  addCustomerReview: (
    customerReviewDto: CustomerReviewDto
  ) => Promise<CustomerReviewModelType>
}
