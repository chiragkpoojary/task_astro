import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ReactLoading from "react-loading";
// Interface for signup form
interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Example() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(null);
    try {
      setloading(true);
      const response = await fetch("http://localhost:8080/signup", {
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

      if (response.ok) {
        setFormData((prevData) => ({
          ...prevData,
          email: "",
          password: "",
          confirmPassword: "",
        }));
        setloading(false);
        alert("Signup successful!");
      } else {
        setFormData((prevData) => ({
          ...prevData,
          email: "",
          password: "",
          confirmPassword: "",
        }));
        alert("usernalready exist");
        setloading(false);
      }
    } catch (error) {
      setNotification("An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
      <style>{`
 /* For Chrome, Safari, Edge */
input:-webkit-autofill {
  background-color: transparent !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  color: white !important;
}

/* Autofill text color */
input:-webkit-autofill::first-line {
  color: white !important;
}

/* Autofill focus state */
input:-webkit-autofill:focus {
  background-color: transparent !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  color: white !important;
}

/* For Firefox */
input:-moz-autofill {
  background-color: transparent !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
  color: white !important;
}
/* For Firefox */
input:-moz-autofill {
  background-color: transparent !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
  color: white !important;
}

/* Autofill text color */
input:-moz-autofill::first-line {
  color: white !important;
}

/* Autofill focus state in Firefox */
input:-moz-autofill:focus {
  background-color: transparent !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
  color: white !important;
}

/* Chrome and Safari (in case you need it later) */
input:-webkit-autofill {
  background-color: transparent !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  color: white !important;
}


      `}</style>
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
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3  flex items-center cursor-pointer text-white"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        </div>

        <Label className="text-sm/6 font-medium text-white">
          Confirm Password
        </Label>
        <Input
          className={clsx(
            "mt-1.5 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          )}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <Button
          className="flex justify-center items-center mt-9 mb-3 rounded-md bg-blue-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600"
          onClick={handleSignup}
        >
          Submit
        </Button>
        {notification && <p className="text-white mt-3">{notification}</p>}

        <p className="text-white">
          Already have an account?{" "}
          <a
            href="/"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Login here
          </a>
        </p>
      </Field>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32">
          <ReactLoading type="balls" color="red" />
        </div>
      )}
    </div>
  );
}
