import React, { useState } from "react";
import CustomInputField from "../../components/fields/CustomInputField";
import CustomButton from "../../components/fields/CustomButton";
import { makeApiRequest } from "../../services/baseApi";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/CustomLoader";
import { TailSpin } from "react-loader-spinner";

const ErrorComponent = ({ text }) => {
  return <span className="text-red-500 text-[11px]">{text}</span>;
};

const Login = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authenticateUser = async (e) => {
    setError("");
    if (!userName) {
      setError("Please enter your username");
    }
    if (!password) {
      setError("Please enter your password");
    }
    try {
      const data = {
        username: userName,
        password: password,
      };
      setLoading(true);
      const res = await makeApiRequest({
        method: "POST",
        url: loginUser(),
        data,
      });
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center mt-12">Log in to your account</h1>
      <>
        {!!error ? (
          !error.toLowerCase().includes("username") ||
          !error.toLowerCase().includes("password") ? (
            <ErrorComponent text={error} />
          ) : null
        ) : null}
        <div className="mb-4">
          <CustomInputField
            label={"UserName"}
            type={"text"}
            value={userName}
            placeholder="Please enter your username"
            fieldStyleProps={{
              border: "border border-[#cccccc]",
            }}
            labelStyle="font-bold text-[12px] mb-1"
            onChange={(e) => setUserName(e.target.value)}
          />
          {!!error ? (
            error.toLowerCase().includes("username") ? (
              <ErrorComponent text={error} />
            ) : null
          ) : null}
        </div>
        <div>
          <CustomInputField
            label={"Password"}
            type={"password"}
            value={password}
            placeholder="Please enter your email"
            fieldStyleProps={{
              border: "border border-[#cccccc]",
            }}
            labelStyle="font-bold text-[12px] mb-1"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!!error ? (
            error.toLowerCase().includes("password") ? (
              <ErrorComponent text={error} />
            ) : null
          ) : null}
        </div>
      </>
      <div className="w-[40%] m-auto mt-4">
        <CustomButton
          text={
            !loading ? (
              "LOG IN"
            ) : (
              <Loader
                component={TailSpin}
                width={25}
                height={25}
                color="white"
              />
            )
          }
          styleProps={{
            backgroundColor: "red-500",
            radius: "rounded-xl",
            height: "h-10",
            width: "w-full",
            color: "white",
            weight: "bold",
          }}
          onClick={authenticateUser}
        />
      </div>
    </div>
  );
};

export default Login;
