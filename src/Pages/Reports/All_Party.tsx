import { useState } from "react";
import { motion } from "framer-motion";
import { Card, Form, Select, DatePicker, Radio, Button } from "antd";

export default function All_Party() {
  const [form] = Form.useForm();
  const [reportType, setReportType] = useState("detail");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saleType: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromDate: { format: (arg0: string) => any };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toDate: { format: (arg0: string) => any };
  }) => {
    alert(`
      Sale Type: ${values.saleType}
      From: ${values.fromDate?.format("YYYY-MM-DD")}
      To: ${values.toDate?.format("YYYY-MM-DD")}
      Report Type: ${reportType}
    `);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-4 my-6"
    >
      <Card
        title={
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Sales Tax Register (All Parties)
          </h1>
        }
        className="shadow-md rounded-lg"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Sale Type */}
          <Form.Item
            label="Sale Type"
            name="saleType"
            className="md:col-span-2"
            rules={[{ required: true, message: "Please select sale type" }]}
          >
            <Select placeholder="-- Select --" allowClear>
              <Select.Option value="Taxable">Taxable</Select.Option>
              <Select.Option value="Exempt">Exempt</Select.Option>
              <Select.Option value="Export">Export</Select.Option>
            </Select>
          </Form.Item>

          {/* From Date */}
          <Form.Item
            label="From"
            name="fromDate"
            rules={[{ required: true, message: "Please select From Date" }]}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>

          {/* To Date */}
          <Form.Item
            label="To"
            name="toDate"
            rules={[{ required: true, message: "Please select To Date" }]}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>

          {/* Report Type */}
          <Form.Item label="Report Type" className="md:col-span-2" required>
            <Radio.Group
              onChange={(e) => setReportType(e.target.value)}
              value={reportType}
            >
              <Radio value="detail">Detail</Radio>
              <Radio value="summary">Summary</Radio>
              <Radio value="excel">Excel Report</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="md:col-span-2 flex justify-end mt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold"
              >
                Find
              </Button>
            </motion.div>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  );
}
