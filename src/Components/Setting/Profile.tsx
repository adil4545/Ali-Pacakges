import { useRef, useEffect, useState } from "react";
import { FaUpload, FaUserCircle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { Form, Input, Select, Button, Card, Row, Col, Spin } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { Province } from "../../Types/Profile";
import { _province } from "../../Utilities/SelectProvince";
import {
  useUpdateMyProfileMutation,
  useGetMyProfileQuery,
} from "../../api/Profile";

export default function Profile() {
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePic, setProfilePic] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const { data: userData, isLoading, isError } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

  useEffect(() => {
    const getUserData = userData?.data;
    if (getUserData) {
      form.setFieldsValue({
        first_name: getUserData.first_name,
        last_name: getUserData.last_name,
        gender: getUserData.gender,
        email: getUserData.email,
        phone: getUserData.phone,
        role: "admin",
        status: getUserData.status,
        sellerNTNCNIC: getUserData.sellerNTNCNIC,
        sellerBusinessName: getUserData.sellerBusinessName,
        sellerProvince: getUserData.sellerProvince,
        sellerAddress: getUserData.sellerAddress,
      });
      setProfilePic(getUserData.profile_image || "");
    }
  }, [userData, form]);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setProfilePic(previewUrl);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    try {
      await updateProfile(values).unwrap();
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } catch {
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  if (isError || !userData)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load profile data.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 m-1 p-2 flex justify-center relative">
      {/* ✅ Animated Success/Error Message */}
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
                  Profile Updated Successfully!
                </span>
              </>
            ) : (
              <>
                <CloseCircleOutlined className="text-red-500 text-xl" />
                <span className="text-gray-800 font-medium">
                  Failed to Update Profile!
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Card
        title={
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            User Profile
          </h1>
        }
        className="w-full max-w-[95rem] shadow-xl rounded-2xl border border-gray-200"
      >
        <div className="flex flex-col items-center mb-10">
          {profilePic ? (
            <img
              src={profilePic}
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

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[32, 24]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Enter first name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Enter last name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Email" name="email">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Status" name="status">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Role">
                <Input size="large" disabled placeholder="admin" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true }]}
              >
                <PhoneInput
                  country={"pk"}
                  value={form.getFieldValue("phone")}
                  onChange={(phone) => form.setFieldsValue({ phone })}
                  inputClass="!w-full !h-[45px] !text-base !pl-12 border rounded"
                  enableSearch
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Seller NTN/CNIC"
                name="sellerNTNCNIC"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Enter NTN or CNIC" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Seller Province"
                name="sellerProvince"
                rules={[{ required: true }]}
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

            <Col xs={24} md={12}>
              <Form.Item label="Gender" name="gender">
                <Select size="large">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="transgender">Transgender</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Seller Business Name" name="sellerBusinessName">
                <Input size="large" placeholder="Enter business name" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Address"
                name="sellerAddress"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} placeholder="Enter full address" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-4 pt-6">
            <Link to="/admin/dashboard">
              <Button size="large" className="bg-gray-300 hover:bg-gray-400">
                Cancel
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              className="bg-gradient-to-r from-amber-600 to-amber-900 text-white"
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
