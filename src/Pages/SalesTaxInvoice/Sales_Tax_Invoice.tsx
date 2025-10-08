import { useState } from "react";
import { Form, Input, Card, Row, Col, message } from "antd";
import Select, { type SingleValue } from "react-select";
import Button from "../../Components/UI/Button";
import type { Party } from "../../Types/Party";
import type { products } from "../../Types/Products";
import type { Invoice } from "../../Types/Invoice";
import { hsCodeProducts } from "../../Utilities/SelectHsCode";
import { uomList } from "../../Utilities/SelectUOM";

type OptionType = {
  value: string;
  label: string;
};

export default function Sales_Tax_Invoice() {
  const [invoiceCounter, setInvoiceCounter] = useState(1000);

  // Dummy parties
  const parties: Party[] = [
    {
      id: 1,
      partyName: "ABC Traders",
      address: "Lahore",
      ntn: "1234567",
      province: { stateProvinceCode: 7, stateProvinceDesc: "Punjab" },
    },
    {
      id: 2,
      partyName: "XYZ Enterprises",
      address: "Karachi",
      ntn: "9876543",
      province: { stateProvinceCode: 8, stateProvinceDesc: "Sindh" },
    },
  ];

  // HS Code Products
  const hsCodes: products[] = hsCodeProducts.map((item, index) => ({
    id: index + 1,
    hscode: item.hsCode,
    productName: item.description,
  }));

  const hsOptions: OptionType[] = hsCodes.map((p) => ({
    value: String(p.hscode),
    label: `${p.hscode} - ${p.productName}`,
  }));

  // UOM Options
  const uomOptions: OptionType[] = uomList.map((u) => ({
    value: u.uom_code,
    label: u.description,
  }));

  const [formData, setFormData] = useState<Invoice>({
    date: "",
    voucherNo: "",
    remarks: "",
    pOrder: "",
    invoiceNo: invoiceCounter.toString(),
    address: "",
    ntn: "",
    province: { stateProvinceCode: 0, stateProvinceDesc: "" },
    quantity: 0,
    valueExTax: 0,
    price: 0,
    stPercent: 0,
    valueIncTax: 0,
    taxValue: 0,
    hscode: "",
    productId: 0,
    units: "",
    party: undefined,
    products: undefined,
  });

  const [productRows, setProductRows] = useState<Invoice[]>([]);

  // Totals
  const totalQuantity = productRows.reduce((a, r) => a + (r.quantity || 0), 0);
  const totalTax = productRows.reduce((a, r) => a + (r.taxValue || 0), 0);
  const totalExTax = productRows.reduce((a, r) => a + (r.valueExTax || 0), 0);
  const totalIncTax = productRows.reduce((a, r) => a + (r.valueIncTax || 0), 0);

  const handlePartyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const partyId = Number(e.target.value);
    const selected = parties.find((p) => p.id === partyId);
    if (!selected) return;
    setFormData({
      ...formData,
      party: selected,
      address: selected.address,
      ntn: selected.ntn,
      province: selected.province,
    });
  };

  const addProductRow = () => {
    setProductRows([
      ...productRows,
      {
        hscode: "",
        productId: 0,
        units: "",
        quantity: 0,
        price: 0,
        stPercent: 0,
        taxValue: 0,
        valueExTax: 0,
        valueIncTax: 0,
        party: formData.party,
        products: undefined,
        date: "",
        voucherNo: "",
        remarks: "",
        pOrder: "",
        invoiceNo: (invoiceCounter + 1).toString(),
        address: "",
        ntn: "",
        province: { stateProvinceCode: 0, stateProvinceDesc: "" },
      },
    ]);
  };

  const updateProductRow = <K extends keyof Invoice>(
    index: number,
    field: K,
    value: Invoice[K]
  ) => {
    const updated = [...productRows];
    updated[index] = { ...updated[index], [field]: value };

    const qty = Number(updated[index].quantity) || 0;
    const price = Number(updated[index].price) || 0;
    const stPercent = Number(updated[index].stPercent) || 0;

    updated[index].valueExTax = qty * price;
    updated[index].taxValue = (updated[index].valueExTax * stPercent) / 100;
    updated[index].valueIncTax =
      updated[index].valueExTax + updated[index].taxValue;

    setProductRows(updated);
  };

  const removeProductRow = (index: number) => {
    setProductRows(productRows.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    message.success("Sales Tax Invoice Saved!");
    console.log("Sales Tax Invoice Saved:", { formData, productRows });
    setInvoiceCounter((prev) => prev + 1);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
      {/* Header */}
      <Card title="Sales Tax Invoice">
        {/* Use 2 columns instead of 3 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Row 1 */}
          <Form.Item label="Date" required className="w-full">
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Select Party" required className="w-full">
            <select
              onChange={handlePartyChange}
              value={formData.party?.id || ""}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Party</option>
              {parties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.partyName}
                </option>
              ))}
            </select>
          </Form.Item>

          {/* Row 2 */}
          <Form.Item label="Invoice No" className="w-full">
            <Input
              value={formData.invoiceNo}
              readOnly
              className="bg-gray-100"
            />
          </Form.Item>

          <Form.Item label="Address" className="w-full">
            <Input value={formData.address} readOnly className="bg-gray-100" />
          </Form.Item>

          {/* Row 3 */}
          <Form.Item label="Seller NTN/CNIC" className="w-full">
            <Input value={formData.ntn} readOnly className="bg-gray-100" />
          </Form.Item>

          <Form.Item label="Province" className="w-full">
            <Input
              value={formData.province.stateProvinceDesc}
              readOnly
              className="bg-gray-100"
            />
          </Form.Item>

          {/* Row 4 */}
          <Form.Item label="Purchase Order No#" className="w-full">
            <Input
              value={formData.pOrder}
              onChange={(e) =>
                setFormData({ ...formData, pOrder: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Document Ref#" className="w-full">
            <Input
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
            />
          </Form.Item>
        </div>
      </Card>

      {/* Product Details */}
      <Card title="Product Details">
        {productRows.length === 0 ? (
          <Button onClick={addProductRow} className="w-full">
            + Add Product
          </Button>
        ) : (
          <>
            {productRows.map((row, index) => (
              <Row gutter={8} key={index} align="middle" className="mb-2">
                {/* HS Code */}
                <Col span={3}>
                  <Form.Item label="HS Code">
                    <Select<OptionType, false>
                      options={hsOptions}
                      value={
                        row.hscode
                          ? {
                              value: String(row.hscode),
                              label: String(row.hscode),
                            }
                          : null
                      }
                      onChange={(selected: SingleValue<OptionType>) => {
                        const found = hsCodes.find(
                          (p) => p.hscode === selected?.value
                        );
                        if (found) {
                          const updated = [...productRows];
                          updated[index] = {
                            ...updated[index],
                            hscode: found.hscode,
                            products: found,
                            productId: found.id,
                          };
                          setProductRows(updated);
                        }
                      }}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  </Form.Item>
                </Col>

                {/* Product Name */}
                <Col span={4}>
                  <Form.Item label="Product Name">
                    <Input
                      value={row.products?.productName ?? ""}
                      readOnly
                      className="bg-gray-100"
                    />
                  </Form.Item>
                </Col>

                {/* Units */}
                <Col span={3}>
                  <Form.Item label="Units">
                    <Select<OptionType, false>
                      options={uomOptions}
                      value={
                        row.units
                          ? {
                              value: row.units,
                              label:
                                uomList.find((u) => u.uom_code === row.units)
                                  ?.description || row.units,
                            }
                          : null
                      }
                      onChange={(selected: SingleValue<OptionType>) =>
                        updateProductRow(index, "units", selected?.value || "")
                      }
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  </Form.Item>
                </Col>

                {/* Qty, Price, ST%, Tax, ExTax, IncTax */}
                <Col span={2}>
                  <Form.Item label="Qty">
                    <Input
                      type="number"
                      value={row.quantity}
                      onChange={(e) =>
                        updateProductRow(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item label="Price">
                    <Input
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        updateProductRow(index, "price", Number(e.target.value))
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item label="S.T %">
                    <Input
                      type="number"
                      value={row.stPercent}
                      onChange={(e) =>
                        updateProductRow(
                          index,
                          "stPercent",
                          Number(e.target.value)
                        )
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item label="Tax">
                    <Input
                      value={row.taxValue}
                      readOnly
                      className="bg-gray-100"
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item label="Ex Tax">
                    <Input
                      value={row.valueExTax}
                      readOnly
                      className="bg-gray-100"
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item label="Inc Tax">
                    <Input
                      value={row.valueIncTax}
                      readOnly
                      className="bg-gray-100"
                    />
                  </Form.Item>
                </Col>

                {/* Delete */}
                <Col span={2}>
                  <Button onClick={() => removeProductRow(index)}>DLT</Button>
                </Col>
              </Row>
            ))}

            <Button onClick={addProductRow} className="w-full mt-2">
              + Add Product
            </Button>
          </>
        )}
      </Card>

      {/* Totals */}
      <Card title="Totals">
        <div className="grid grid-cols-4 gap-4">
          <Form.Item label="Total Qty">
            <Input className="bg-gray-100" value={totalQuantity} readOnly />
          </Form.Item>
          <Form.Item label="Total Tax">
            <Input className="bg-gray-100" value={totalTax} readOnly />
          </Form.Item>
          <Form.Item label="Value Ex Tax">
            <Input className="bg-gray-100" value={totalExTax} readOnly />
          </Form.Item>
          <Form.Item label="Value Inc Tax">
            <Input className="bg-gray-100" value={totalIncTax} readOnly />
          </Form.Item>
        </div>
        <div className="flex justify-end mt-4">
          <Button>Submit Invoice</Button>
        </div>
      </Card>
    </Form>
  );
}
