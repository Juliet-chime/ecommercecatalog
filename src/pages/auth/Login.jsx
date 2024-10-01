import React, { useState } from "react";
import CustomInputField from "../../components/fields/CustomInputField";
import CustomButton from "../../components/fields/CustomButton";
import { makeApiRequest } from "../../services/baseApi";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/CustomLoader";
import { TailSpin } from "react-loader-spinner";
import { Errorcomponent } from "../../components/Errorcomponent";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValue = {
    username: "mor_2314",
    password: "83r5^_",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "user name should be a minimum of 3 characters")
      .required("Please enter your user name"),
    password: Yup.string().required("Please enter your password"),
  });

  const authenticateUser = async (values) => {
    setError("");
    try {
      const data = {
        username: values.username,
        password: values.password,
      };
      const res = await makeApiRequest({
        method: "POST",
        url: loginUser(),
        data,
      });
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-extrabold my-6">
        Log in to your account
      </h1>

      <Formik
        initialValues={initialValue}
        onSubmit={authenticateUser}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values, errors, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <>
                {!!error ? <Errorcomponent text={error} /> : null}
                <div className="mb-4">
                  <CustomInputField
                    label={"UserName"}
                    name={"username"}
                    value={values.username}
                    placeholder="Please enter your username"
                    fieldStyleProps={{
                      border: "border border-[#cccccc]",
                    }}
                    labelStyle="font-bold text-[12px] mb-1"
                    onChange={handleChange}
                  />
                  <Errorcomponent text={errors.username} />
                </div>
                <div>
                  <CustomInputField
                    label={"Password"}
                    type={"password"}
                    name="password"
                    value={values.password}
                    placeholder="Please enter your email"
                    fieldStyleProps={{
                      border: "border border-[#cccccc]",
                    }}
                    labelStyle="font-bold text-[12px] mb-1"
                    onChange={handleChange}
                  />

                  <Errorcomponent text={errors.password} />
                </div>
              </>
              <div className="w-[50%] m-auto mt-6">
                <CustomButton
                  type="submit"
                  text={
                    !isSubmitting ? (
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
                    height: "h-12",
                    width: "w-full",
                    color: "white",
                    weight: "bold",
                  }}
                  disabled={isSubmitting || Object.keys(errors).length}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
