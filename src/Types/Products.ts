export interface HSCodeProduct {
  hsCode: string;
  description: string;
}
export interface products {
  id?: string;
  hs_code: string;
  fbr_product?: string;
  units?: string;
  product_uom?: string;
  sale_price?: string;
  otherType?: string;
  tax?: string;
}
