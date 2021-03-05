import {Customer} from "./Customer";
import {ProductOrders} from "./ProductOrders";

export interface Order {
  id?: number;
  customer?: Customer;
  status?: string;
}
