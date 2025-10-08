import { FaQuestionCircle } from "react-icons/fa";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <div className="relative">
        <div className="w-56 h-56 bg-blue-100 rounded-full flex items-center justify-center">
          <FaQuestionCircle className="text-blue-600 text-8xl" />
        </div>
      </div>

      <h1 className="text-5xl font-bold text-gray-800 mt-6">404</h1>
      <p className="text-gray-600 mt-2">
        Sorry, the page you visited does not exist.
      </p>

      <div className="items-center justify-center mt-4">
        <Button onClick={() => navigate("/")}>Back Home</Button>
      </div>
    </div>
  );
}
