// FbrTokenModal.tsx
import { Modal, Input, Button, Form } from "antd";

interface Props {
  visible: boolean; // Modal visibility control
  onClose: () => void; // Close handler
}

export default function FbrTokenModal({ visible, onClose }: Props) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("New Token:", values.tokenKey);

        onClose(); // Close modal
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="FBR Token"
      open={visible} // AntD v5 uses "open" instead of "visible"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Token Key"
          name="tokenKey"
          rules={[{ required: true, message: "Please enter token key!" }]}
        >
          <Input placeholder="Enter Token Key" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
