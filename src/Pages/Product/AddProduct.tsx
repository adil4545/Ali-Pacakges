import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Row, Col, Card } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { hsCodeProducts } from "../../Utilities/SelectHsCode";
import { uomList } from "../../Utilities/SelectUOM";
import Button from "../../Components/UI/Button";
import type { products } from "../../Types/Products";
import {
  useAddProductMutation,
  type AddProductRequest,
} from "../../api/ProductsApi";

const { Option } = Select;

export default function AddProduct() {
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const hsCodes: products[] = hsCodeProducts.map((item) => ({
    hs_code: item.hsCode,
    fbr_product: item.description,
    uom: "",
    tax: "",
    salePrice: "",
    otherType: "",
  }));

  const [formValues, setFormValues] = useState<products>({
    hs_code: "",
    fbr_product: "",
    product_uom: "",
    sale_price: "",
    tax: "",
  });

  const handleChange = (changed: Partial<products>) => {
    setFormValues((prev) => ({ ...prev, ...changed }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formValues,
        hs_code: formValues.hs_code ?? "",
        fbr_product: formValues.fbr_product ?? "",
        product_uom: formValues.product_uom ?? "",
        sale_price: formValues.sale_price ?? "0",
        tax: formValues.tax ?? "0",
        // otherType: formValues.otherType ?? "",
      };

      await addProduct(payload as AddProductRequest).unwrap();

      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/admin/products");
      }, 2000);
    } catch {
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  return (
    <div className="bg-gray-50 p-4 relative min-h-screen">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 shadow-md rounded-lg px-6 py-3 flex items-center gap-3 z-50 ${
              alertType === "success"
                ? "bg-white"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {alertType === "success" ? (
              <>
                <CheckCircleOutlined className="text-green-500 text-xl" />
                <span className="text-gray-800 font-medium">
                  Product Added Successfully!
                </span>
              </>
            ) : (
              <>
                <CloseCircleOutlined className="text-red-500 text-xl" />
                <span className="text-gray-800 font-medium">
                  Failed to Add Product!
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
              <Form.Item label="HS Code" required>
                <Select
                  placeholder="Select HS Code"
                  value={formValues.hs_code || undefined}
                  onChange={(value) => {
                    const found = hsCodes.find((p) => p.hs_code === value);
                    if (found)
                      handleChange({
                        hs_code: found.hs_code,
                        fbr_product: found.fbr_product || "",
                      });
                  }}
                  showSearch
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                >
                  {hsCodes.map((p) => (
                    <Option
                      key={p.hs_code}
                      value={p.hs_code}
                      label={p.fbr_product}
                    >
                      {p.hs_code} - {p.fbr_product}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="FBR Product">
                <Input
                  value={formValues.fbr_product}
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
                  value={formValues.product_uom || undefined}
                  onChange={(value) => handleChange({ product_uom: value })}
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
            <Col span={24}>
              <Form.Item label="Sale Price">
                <Input
                  type="number"
                  value={formValues.sale_price}
                  onChange={(e) => handleChange({ sale_price: e.target.value })}
                />
              </Form.Item>
            </Col>

            {/* <Col span={12}>
              <Form.Item label="Other Type">
                <Input
                  value={formValues.otherType}
                  onChange={(e) => handleChange({ otherType: e.target.value })}
                />
              </Form.Item>
            </Col> */}
          </Row>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <Button
              onClick={() => navigate("../Products")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </Button>
            <Button className="text-white hover:opacity-90">Submit</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
