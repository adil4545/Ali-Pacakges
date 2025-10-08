import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Row, Col, Card } from "antd";
import { hsCodeProducts } from "../../Utilities/SelectHsCode";
import { uomList } from "../../Utilities/SelectUOM";
import Button from "../../Components/UI/Button"; // 👈 your custom button
import type { products } from "../../Types/Products";

const { Option } = Select;

export default function AddProduct() {
  const navigate = useNavigate();

  // Convert HS data into structure
  const hsCodes: products[] = hsCodeProducts.map((item) => ({
    id: 0,
    hscode: item.hsCode,
    productName: item.description,
    uom: "",
    tax: "",
    units: "",
    salePrice: "",
    otherType: "",
  }));

  const [formValues, setFormValues] = useState<products>({
    id: 0,
    hscode: "",
    productName: "",
    units: "",
    uom: "",
    salePrice: "",
    otherType: "",
    tax: "",
  });

  // Handle changes
  const handleChange = (changed: Partial<products>) => {
    setFormValues((prev) => ({ ...prev, ...changed }));
  };

  const handleSubmit = () => {
    console.log("Submitted Product:", formValues);
  };

  return (
    <div className="bg-gray-50 p-4">
      <Card
        bordered
        className="mt-2 mb-2 mx-4 shadow-sm border-gray-300"
        style={{ borderRadius: "12px" }}
      >
        <div className="mb-2 ml-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Add Product
          </h1>
          <hr className="mt-1 border-gray-300" />
        </div>

        <Form
          layout="vertical"
          className="mt-2"
          onFinish={handleSubmit}
          initialValues={formValues}
        >
          {/* HS Code & Product Name */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<>HS Code</>} required>
                <Select
                  placeholder="Select HS Code"
                  value={formValues.hscode || undefined}
                  onChange={(value) => {
                    const found = hsCodes.find((p) => p.hscode === value);
                    if (found)
                      handleChange({
                        hscode: found.hscode,
                        productName: found.productName || "",
                      });
                  }}
                  showSearch
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                >
                  {hsCodes.map((p) => (
                    <Option
                      key={p.hscode}
                      value={p.hscode}
                      label={p.productName}
                    >
                      {p.hscode} - {p.productName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={<>FBR Product</>}>
                <Input
                  value={formValues.productName}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* UOM + Tax */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Product UOM">
                <Select
                  placeholder="Select UOM"
                  value={formValues.uom || undefined}
                  onChange={(value) => handleChange({ uom: value })}
                  style={{ width: "100%" }}
                >
                  {uomList.map((u) => (
                    <Option key={u.uom_code} value={u.uom_code}>
                      {u.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Tax (%)">
                <Input
                  value={formValues.tax}
                  onChange={(e) => handleChange({ tax: e.target.value })}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Sale Price + Other Type */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Sale Price">
                <Input
                  type="number"
                  value={formValues.salePrice}
                  onChange={(e) => handleChange({ salePrice: e.target.value })}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Other Type">
                <Input
                  value={formValues.otherType}
                  onChange={(e) => handleChange({ otherType: e.target.value })}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <Button
              onClick={() => navigate("../Products")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </Button>
            <Button className=" text-white hover:opacity-90">Submit</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
