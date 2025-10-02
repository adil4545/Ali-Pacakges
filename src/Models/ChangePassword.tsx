// ChangePasswordModal.tsx

import { Modal, Input, Button, Form } from "antd";

interface Props {
  visible: boolean; // Control modal visibility
  onClose: () => void; // Close handler
}

export default function ChangePasswordModal({ visible, onClose }: Props) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Password values:", values);
        // Here you can call API to change password
        onClose(); // Close modal on success
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Change Password"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Previous Password"
          name="prevPassword"
          rules={[
            { required: true, message: "Please enter previous password!" },
          ]}
        >
          <Input.Password placeholder="Previous Password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter new password!" }]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
