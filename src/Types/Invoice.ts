import type { Party } from "./Party";
import type { products } from "./Products";

export interface Invoice {
  date: string;
  voucherNo: string;
  remarks: string;
  pOrder: string;
  invoiceNo: string;
  address: string;
  ntn: string;
  province: string;

  productId?: number;
  hscode?: number;
  units?: string;
  quantity: number;
  price: number;
  stPercent: number;
  taxValue: number;
  valueExTax: number;
  valueIncTax: number;

  party?: Party;
  products?: products;
}
