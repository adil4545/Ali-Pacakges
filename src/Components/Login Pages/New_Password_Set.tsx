import React, { useState, useEffect } from "react";
import { Form, Input, Typography, message, Card, Alert } from "antd"; // ✅ Added Alert
import CustomLink from "../UI/Link";
import { useResetPasswordMutation } from "../../api/Loginapi";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const { Title, Text } = Typography;

const New_Password_Set: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // ✅ New state to hold error message
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      message.warning("No email found! Please request OTP again.");
      navigate("/forget-password");
    }
  }, [navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    if (!email) {
      message.error("Email not found. Please try again!");
      return;
    }

    try {
      setFormError(null); // ✅ clear previous errors
      const res = await resetPassword({
        email,
        otp: values.otp,
        password: values.password,
      }).unwrap();

      message.success(res.message || "Password reset successfully!");
      localStorage.clear();
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // 🔹 Extract backend error message
      const backendMessage = err?.data?.message || "Failed to reset password!";

      // ✅ Show Ant Design popup
      message.error(backendMessage);

      // ✅ Show error message in form
      setFormError(backendMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        bordered={false}
        className="shadow-lg rounded-2xl p-8 w-full max-w-md"
        style={{ backgroundColor: "white" }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "8px" }}>
          Reset Password
        </Title>
        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Enter the OTP sent to your email and set a new password
        </Text>

        {/* ✅ Show error alert on form top */}
        {formError && (
          <Alert
            message={formError}
            type="error"
            showIcon
            className="mb-4"
            closable
            onClose={() => setFormError(null)}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          {/* OTP Field */}
          <Form.Item
            label={<span>OTP</span>}
            name="otp"
            rules={[{ required: true, message: "Please enter OTP!" }]}
          >
            <Input placeholder="Enter 6-digit OTP" />
          </Form.Item>

          {/* New Password Field */}
          <Form.Item
            label={<span>New Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter new password!" }]}
            hasFeedback
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            label={<span>Confirm Password</span>}
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter new password" />
          </Form.Item>

          {/* Back to Login */}
          <div className="text-center mt-4 mb-2">
            <CustomLink to="/">Back To Login?</CustomLink>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button>{isLoading ? "Submitting..." : "Submit"}</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default New_Password_Set;
