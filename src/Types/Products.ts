export interface products {
  id: number;
  hscode?: string | number; // API ka hS_CODE
  productName?: string; // API ka description
  units?: string;
  uom?: string;
  salePrice?: string;
  otherType?: string;
  tax?: string;
}
