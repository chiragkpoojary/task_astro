import {
  Button,
  Field,
  Input,
  Label,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ReactLoading from "react-loading";
import { json } from "react-router-dom";
interface SigninData {
  email: string;
  password: string;
}

export default function Example() {
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SigninData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false); // State for managing success dialog visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form data input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    setloading(true);
    setError(null);
    try {
      const response = await fetch("https://rust-task-optimized.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
   
      sessionStorage.setItem("jwt",result.token)
      if (response.ok) {
        setIsOpen(true);
        setloading(false); // Show success dialog on successful sign-in
      } else {
        setError(result.error || "Signin failed");
        setloading(false);
      }
    } catch (error) {
      setError("An error occurred during signin.");
    }
  };
const authsucess=()=>{
setIsOpen(false);
window.location.href="/task"
}
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
        <Field className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col">
          <Label className="text-sm/6 font-medium text-white">Email</Label>
          <Input
            className={clsx(
              "mt-1.5 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              "autofill:shadow-none autofill:bg-transparent autofill:text-white",
            )}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />

          <Label className="text-sm/6 font-medium text-white mt-2">
            Password
          </Label>
          <div className="relative">
            <Input
              className={clsx(
                "mt-1.5 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                "autofill:shadow-none autofill:bg-transparent autofill:text-white",
              )}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3  flex items-center cursor-pointer text-white"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </span>
          </div>
          {loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32">
              <ReactLoading type="balls" color="red" />
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {/* Success Dialog */}
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel className="min-w-fit space-y-4 border bg-white p-12 rounded-lg shadow-md">
                <DialogTitle className="font-bold text-lg">
                  Signin Successful
                </DialogTitle>
                <Description className="text-gray-700">
                  You have successfully signed in!
                </Description>
                <div className="flex justify-end gap-4">
                  <Button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md "
                    onClick={authsucess}
                  >
                    <a href="/task"> OK</a>
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>

          <Button
            className="flex justify-center items-center mt-4 mb-3 rounded-md bg-blue-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            onClick={handleSignup}
          >
            Submit
          </Button>
          <p className="text-white">
            Do not have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              Signup here
            </a>
          </p>
        </Field>
      </div>
    </>
  );
}
