import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Select, Row, Col, Card, message } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Textarea } from "@headlessui/react";
import Button from "../../Components/UI/Button";
import { _province } from "../../Utilities/SelectProvince";
import { partyType } from "../../Utilities/PartyType";
import type { Party, Province } from "../../Types/Party";
import {
  useAddPartyMutation,
  useGetAllPartiesQuery,
  useUpdatePartyMutation,
  type AddPartyRequest,
} from "../../api/Partyapi";

const { Option } = Select;

export default function PartyForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  // Fetch data only if editing
  const { data } = useGetAllPartiesQuery(undefined, { skip: !id });

  const [addParty, { isLoading: adding }] = useAddPartyMutation();
  const [updateParty, { isLoading: updating }] = useUpdatePartyMutation();
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState<Party>({
    ntn: "",
    party_name: "",
    party_type: "",
    phone: "",
    cnic: "",
    strn: "",
    registration_type: "Registered",
    province: undefined as unknown as Province,
    address: "",
  });

  // Load existing data if in edit mode
  useEffect(() => {
    if (id && data?.data) {
      const party = data.data.find((p: Party) => String(p.id) === id);
      if (party) {
        setFormValues(party);

        form.setFieldsValue({
          ntn: party.ntn,
          party_name: party.party_name,
          party_type: party.party_type,
          phone: party.phone,
          cnic: party.cnic,
          strn: party.strn,
          registration_type: party.registration_type,
          province: party.province,
          address: party.address,
        });
      }
    }
  }, [id, data, form]);

  // Submit Handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    try {
      const payload: AddPartyRequest = {
        ntn: values.ntn,
        party_name: values.party_name,
        party_type: values.party_type,
        phone: values.phone,
        cnic: values.cnic,
        strn: values.strn,
        registration_type: values.registration_type,
        province: values.province,
        address: values.address,
      };
      console.log("values.province", values.province);
      if (id) {
        // Edit mode
        await updateParty({ id, body: payload }).unwrap();
        message.success("Party updated successfully!");
      } else {
        // Add mode
        await addParty(payload).unwrap();
        message.success("Party added successfully!");
      }

      navigate("/admin/Parties");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error?.data?.message || "Operation failed!");
      console.error(error);
    }
  };

  const loading = adding || updating;

  return (
    <div className="bg-gray-50 p-4">
      <Card
        bordered
        className="mt-2 mb-2 mx-4 shadow-sm border-gray-300"
        style={{ borderRadius: "12px" }}
      >
        <div className="mb-2 ml-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            {id ? "Edit Party" : "Add Party"}
          </h1>
          <hr className="mt-1 border-gray-300" />
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-2"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="NTN"
                name="ntn"
                rules={[{ required: true, message: "Please enter NTN" }]}
              >
                <Input placeholder="Enter NTN" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Party Name"
                name="party_name"
                rules={[{ required: true, message: "Please enter Party Name" }]}
              >
                <Input placeholder="Enter Party Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Party Type"
                name="party_type"
                rules={[
                  { required: true, message: "Please select Party Type" },
                ]}
              >
                <Select placeholder="Select Type">
                  {partyType.map((type) => (
                    <Option key={type.partyType} value={type.partyType}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <PhoneInput
                  country={"pk"}
                  value={formValues.phone}
                  onChange={(phone) => setFormValues({ ...formValues, phone })}
                  inputClass="!w-full !h-10"
                  inputStyle={{ width: "100%", borderColor: "#d9d9d9" }}
                  disableDropdown
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="CNIC"
                name="cnic"
                rules={[{ required: true, message: "Please enter CNIC" }]}
              >
                <Input placeholder="xxxxx-xxxxxxx-x" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="STRN"
                name="strn"
                rules={[{ required: true, message: "Please enter STRN" }]}
              >
                <Input placeholder="Enter STRN" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Registration Type"
                name="registration_type"
                rules={[
                  {
                    required: true,
                    message: "Please select Registration Type",
                  },
                ]}
              >
                <Select>
                  <Option value="Registered">Registered</Option>
                  <Option value="Unregistered">Unregistered</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Province"
                name="province"
                rules={[{ required: true, message: "Please select Province" }]}
              >
                <Select placeholder="Select Province">
                  {_province.map((prov) => (
                    <Option value={prov.stateProvinceDesc}>
                      {prov.stateProvinceDesc}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter Address" }]}
              >
                <Textarea
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-700"
                  placeholder="Enter Address"
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              onClick={() => navigate("/admin/Parties")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              className={`bg-gradient-to-r from-amber-600 to-amber-900 text-white hover:opacity-90 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : id ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
