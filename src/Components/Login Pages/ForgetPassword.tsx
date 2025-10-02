import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import CustomLink from "../UI/Link";
function ForgetPassword() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        {/* Centered White Box */}
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl text-black mb-3 font-bold">
            Forgot Password
          </h2>
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Let us help you
          </h4>

          {/* Email Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Add your reset password logic here
              alert("Password reset link sent to your email!");
            }}
            className="space-y-6"
          >
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <span className="text-red-500">*</span> Enter your registered
                email address.
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Reset Password Button */}
            <Button onClick={() => navigate("/new-password-set")}>
              Reset My Password
            </Button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <CustomLink to="/">Back To Login?</CustomLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
