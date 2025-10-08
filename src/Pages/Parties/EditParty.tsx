import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form, Input, Select, Card, message } from "antd";
import type {
  Party as PartyType,
  Province as ProvinceType,
} from "../../Types/Party";
import { _province } from "../../Utilities/SelectProvince";
import { partyType } from "../../Utilities/PartyType";
import Button from "../../Components/UI/Button";

const { Option } = Select;

export default function EditParty() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form] = Form.useForm();

  const [formData, setFormData] = useState<PartyType>({
    id: Number(id),
    ntn: "",
    partyName: "",
    partyType: "",
    phone: "",
    cnic: "",
    strn: "",
    registrationNo: "",
    province: undefined as unknown as ProvinceType,
    address: "",
  });

  useEffect(() => {
    const storedParties: PartyType[] = JSON.parse(
      localStorage.getItem("parties") || "[]"
    );
    const party = storedParties.find((p) => p.id === Number(id));

    if (party) {
      setFormData(party);
      form.setFieldsValue({
        ...party,
        province: party.province?.stateProvinceDesc,
      });
    }
  }, [id, form]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    const updatedParty: PartyType = {
      ...formData,
      ...values,
      province: { stateProvinceDesc: values.province } as ProvinceType,
    };

    let storedParties: PartyType[] = JSON.parse(
      localStorage.getItem("parties") || "[]"
    );

    storedParties = storedParties.map((p) =>
      p.id === Number(id) ? updatedParty : p
    );

    localStorage.setItem("parties", JSON.stringify(storedParties));

    message.success("Party updated successfully!");
    navigate("/AdminDashBoardLayout/Parties");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Card
        title={
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Edit Party
          </h1>
        }
        className="w-full mt-3 mb-6 mx-4 shadow-md"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          onFinish={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-6">
            {/* NTN */}
            <Form.Item
              label="NTN"
              name="ntn"
              className="!mb-2"
              rules={[{ required: true, message: "Please enter NTN" }]}
            >
              <Input />
            </Form.Item>

            {/* Party Name */}
            <Form.Item
              label="Party Name"
              name="partyName"
              className="!mb-2"
              rules={[{ required: true, message: "Please enter Party Name" }]}
            >
              <Input />
            </Form.Item>

            {/* Party Type */}
            <Form.Item
              label="Party Type"
              name="partyType"
              className="!mb-2"
              rules={[{ required: true, message: "Please select Party Type" }]}
            >
              <Select placeholder="Select Type">
                {partyType.map((type) => (
                  <Option key={type.partyType} value={type.partyType}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Phone */}
            <Form.Item
              label="Phone Number"
              name="phone"
              className="!mb-2"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <PhoneInput
                country={"pk"}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputClass="!w-full !h-10"
                inputStyle={{ width: "100%" }}
                enableSearch={false}
                disableDropdown={true}
              />
            </Form.Item>

            {/* CNIC */}
            <Form.Item
              label="CNIC"
              name="cnic"
              className="!mb-2"
              rules={[{ required: true, message: "Please enter CNIC" }]}
            >
              <Input />
            </Form.Item>

            {/* STRN */}
            <Form.Item
              label="STRN"
              name="strn"
              className="!mb-2"
              rules={[{ required: true, message: "Please enter STRN" }]}
            >
              <Input />
            </Form.Item>

            {/* Registration No */}
            <Form.Item
              label="Registration No."
              name="registrationNo"
              className="!mb-2"
              rules={[
                { required: true, message: "Please enter Registration No." },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Province */}
            <Form.Item
              label="Province"
              name="province"
              className="!mb-2"
              rules={[{ required: true, message: "Please select Province" }]}
            >
              <Select placeholder="Select Province">
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

            {/* Address */}
            <Form.Item
              label="Address"
              name="address"
              className="col-span-2 !mb-2"
              rules={[{ required: true, message: "Please enter Address" }]}
            >
              <Input />
            </Form.Item>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-2">
            <Button onClick={() => navigate("../Parties")}>Cancel</Button>
            <Button>Update</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
