export interface products {
  id: number;
  hscode ?:number | null | string;
  productName ?: string;
  units ?: string;
  uom?: string;
  salePrice?: string;
  otherType?: string;
  tax?: string;
}
