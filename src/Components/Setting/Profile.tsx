import { useState, useRef } from "react";
import { FaUpload, FaUserCircle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { Form, Input, Select, Button, Card, Row, Col, message } from "antd";
import type { Province, UserProfile } from "../../Types/Profile";
import { _province } from "../../Utilities/SelectProvince";

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userData: UserProfile = {
    first_name: "Ali",
    last_name: "Khan",
    email: "ali.khan@example.com",
    phone: "923222222222222",
    role: "Admin",
    status: "Active",
    gender: "Male",
    sellerBusinessName: "ALI Packages",
    ntn: "123456789",
    address: "Lahore, Pakistan",
    profilePic: "",
  };

  const [formData, setFormData] = useState<UserProfile>(userData);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: previewUrl });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log("Updated Profile Data:", { ...formData, ...values });
    message.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 m-1 p-2 flex justify-center">
      <Card
        title={
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            User Profile
          </h1>
        }
        className="w-full max-w-[95rem] shadow-xl rounded-2xl border border-gray-200"
      >
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-10">
          {formData.profilePic ? (
            <img
              src={formData.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-amber-600 shadow-md"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400" />
          )}

          <Button
            type="primary"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white"
            icon={<FaUpload />}
          >
            Update Profile Picture
          </Button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>

        {/* Profile Form */}
        <Form
          layout="vertical"
          initialValues={formData}
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Row gutter={[32, 24]}>
            {/* First / Last Name */}
            <Col xs={24} md={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input size="large" placeholder="Enter first name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Last Name is required" }]}
              >
                <Input size="large" placeholder="Enter last name" />
              </Form.Item>
            </Col>

            {/* Email / Phone */}
            <Col xs={24} md={12}>
              <Form.Item label="Email" name="email">
                <Input size="large" disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Phone is required" }]}
              >
                <PhoneInput
                  country={"pk"}
                  value={formData.phone?.toString()}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  inputClass="!w-full !h-[45px] !text-base !pl-12 border rounded focus:ring-2 focus:ring-amber-600 outline-none"
                  buttonClass="!border !border-gray-300"
                  dropdownClass="!bg-white !shadow-lg"
                  enableSearch
                />
              </Form.Item>
            </Col>

            {/* Role / Status */}
            <Col xs={24} md={12}>
              <Form.Item label="Role" name="role">
                <Input size="large" disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Status" name="status">
                <Input size="large" disabled />
              </Form.Item>
            </Col>

            {/* Gender / Business */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Select size="large" placeholder="Select Gender">
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="Transgender">Transgender</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Seller Business Name"
                name="sellerBusinessName"
                rules={[
                  { required: true, message: "Business name is required" },
                ]}
              >
                <Input size="large" placeholder="Enter business name" />
              </Form.Item>
            </Col>

            {/* NTN / Province */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Seller NTN/CNIC"
                name="ntn"
                rules={[{ required: true, message: "NTN/CNIC is required" }]}
              >
                <Input size="large" placeholder="Enter NTN or CNIC" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Seller Province"
                name={["province", "stateProvinceDesc"]}
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Select size="large" placeholder="Select Province">
                  {_province.map((prov: Province) => (
                    <Select.Option
                      key={prov.stateProvinceCode}
                      value={prov.stateProvinceDesc}
                    >
                      {prov.stateProvinceDesc}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Address */}
            <Col xs={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter full address"
                  className="text-base"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Link to="/admin/dashboard">
              <Button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
                size="large"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold"
              size="large"
            >
              Update Profile
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
