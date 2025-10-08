import type { Party, Province } from "./Party";
import type { products } from "./Products";

export interface Invoice {
  date: string;
  voucherNo: string;
  remarks: string;
  pOrder: string;
  invoiceNo: string;
  address: string;
  ntn: string;
  province: Province;

  productId?: number;
  hscode?: number | string;
  units?: string;
  quantity: number;
  price: number;
  stPercent?: number | string;
  taxValue: number;
  valueExTax: number;
  valueIncTax: number;

  party?: Party;
  products?: products;
}
