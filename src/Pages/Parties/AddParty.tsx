import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Row, Col, Card } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Textarea } from "@headlessui/react";
import Button from "../../Components/UI/Button";
import { _province } from "../../Utilities/SelectProvince";
import { partyType } from "../../Utilities/PartyType";
import type { Party, Province } from "../../Types/Party";

const { Option } = Select;

export default function AddParty() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Party>({
    ntn: "",
    partyName: "",
    partyType: "",
    phone: "",
    cnic: "",
    strn: "",
    registrationNo: "",
    province: undefined as unknown as Province,
    address: "",
  });

  const handleChange = (changed: Partial<Party>) => {
    setFormValues((prev) => ({ ...prev, ...changed }));
  };

  const handleSubmit = () => {
    console.log("Party Data:", formValues);
    alert("Party saved successfully!");
    navigate("/AdminDashBoardLayout/Parties");
  };

  return (
    <div className="bg-gray-50 p-4">
      <Card
        bordered
        className="mt-2 mb-2 mx-4 shadow-sm border-gray-300"
        style={{ borderRadius: "12px" }}
      >
        {/* Header */}
        <div className="mb-2 ml-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Add Party
          </h1>
          <hr className="mt-1 border-gray-300" />
        </div>

        {/* Form */}
        <Form
          layout="vertical"
          className="mt-2"
          onFinish={handleSubmit}
          initialValues={formValues}
        >
          <Row gutter={16}>
            {/* NTN */}
            <Col span={12}>
              <Form.Item label="NTN" required>
                <Input
                  value={formValues.ntn}
                  onChange={(e) => handleChange({ ntn: e.target.value })}
                  placeholder="Enter NTN"
                />
              </Form.Item>
            </Col>

            {/* Party Name */}
            <Col span={12}>
              <Form.Item label="Party Name" required>
                <Input
                  value={formValues.partyName}
                  onChange={(e) => handleChange({ partyName: e.target.value })}
                  placeholder="Enter Party Name"
                />
              </Form.Item>
            </Col>

            {/* Party Type */}
            <Col span={12}>
              <Form.Item label="Party Type" required>
                <Select
                  placeholder="Select Type"
                  value={formValues.partyType || undefined}
                  onChange={(value) => handleChange({ partyType: value })}
                >
                  {partyType.map((type) => (
                    <Option key={type.partyType} value={type.partyType}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Phone Number */}
            <Col span={12}>
              <Form.Item label="Phone Number" required>
                <PhoneInput
                  country={"pk"}
                  value={formValues.phone}
                  onChange={(phone) => handleChange({ phone })}
                  inputClass="!w-full !h-10"
                  inputStyle={{
                    width: "100%",
                    borderRadius: "6px",
                    borderColor: "#d9d9d9",
                  }}
                  disableDropdown={true}
                />
              </Form.Item>
            </Col>

            {/* CNIC */}
            <Col span={12}>
              <Form.Item label="CNIC" required>
                <Input
                  value={formValues.cnic}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 13) value = value.slice(0, 13);
                    let formatted = value;
                    if (value.length > 5 && value.length <= 12) {
                      formatted = value.slice(0, 5) + "-" + value.slice(5);
                    } else if (value.length > 12) {
                      formatted =
                        value.slice(0, 5) +
                        "-" +
                        value.slice(5, 12) +
                        "-" +
                        value.slice(12);
                    }
                    handleChange({ cnic: formatted });
                  }}
                  placeholder="xxxxx-xxxxxxx-x"
                />
              </Form.Item>
            </Col>

            {/* STRN */}
            <Col span={12}>
              <Form.Item label="STRN" required>
                <Input
                  value={formValues.strn}
                  onChange={(e) => handleChange({ strn: e.target.value })}
                  placeholder="Enter STRN"
                />
              </Form.Item>
            </Col>

            {/* Registration No */}
            <Col span={12}>
              <Form.Item label="Registration No." required>
                <Input
                  value={formValues.registrationNo}
                  onChange={(e) =>
                    handleChange({ registrationNo: e.target.value })
                  }
                  placeholder="Enter Registration No."
                />
              </Form.Item>
            </Col>

            {/* Province */}
            <Col span={12}>
              <Form.Item label="Province" required>
                <Select
                  placeholder="Select Province"
                  value={formValues.province?.stateProvinceDesc || undefined}
                  onChange={(value) => {
                    const selected = _province.find(
                      (p) => p.stateProvinceDesc === value
                    );
                    if (selected) handleChange({ province: selected });
                  }}
                >
                  {_province.map((prov) => (
                    <Option
                      key={prov.stateProvinceCode}
                      value={prov.stateProvinceDesc}
                    >
                      {prov.stateProvinceDesc}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Address */}
            <Col span={24}>
              <Form.Item label="Address" required>
                <Textarea
                  value={formValues.address}
                  onChange={(e) => handleChange({ address: e.target.value })}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-700"
                  placeholder="Enter Address"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <Button
              onClick={() => navigate("../Parties")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-amber-600 to-amber-900 text-white hover:opacity-90">
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
