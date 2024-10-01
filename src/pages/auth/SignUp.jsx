import React from "react";
import CustomInputField from "../../components/fields/CustomInputField";
import CustomButton from "../../components/fields/CustomButton";
import { TailSpin } from "react-loader-spinner";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/CustomLoader";
import { Errorcomponent } from "../../components/Errorcomponent";

const SignUp = ({ signupUser }) => {
  const initialValue = {
    firstname: "",
    email: "",
    phone: "",
    street: "",
    lastname: "",
    username: "",
    city: "",
    number: "",
    zipcode: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(3, "First name should be a minimum of 3 characters")
      .required("Please enter your name"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    phone: Yup.string().required("Please enter your phone number"),
    street: Yup.string().required("Please enter your street"),
    lastname: Yup.string()
      .min(3, "Last name should be a minimum of 3 characters")
      .required("Please enter your last name"),
    username: Yup.string()
      .min(3, "username should be a minimum of 3 characters")
      .required("Please enter your username"),
    city: Yup.string().required("Please enter your city"),
    number: Yup.string().required("Please enter your street number"),
    zipcode: Yup.string().required("Please enter your zipcode"),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-extrabold my-6">Create account</h1>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, action) => signupUser(values, action)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, isSubmitting, errors }) => {
          const {
            firstname,
            lastname,
            street,
            username,
            phone,
            city,
            zipcode,
            email,
            number,
            password,
          } = errors;
          return (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-3">
                    <CustomInputField
                      label={"First Name"}
                      name={"firstname"}
                      value={values.firstname}
                      placeholder="Please enter your first name"
                      fieldStyleProps={{
                        border: "border border-[#cccccc]",
                      }}
                      labelStyle="font-bold text-[12px] mb-1"
                      onChange={handleChange}
                    />
                    <Errorcomponent text={firstname} />
                  </div>

                  <div className="mb-3">
                    <CustomInputField
                      label={"Email"}
                      name={"email"}
                      type={"email"}
                      value={values.email}
                      placeholder="Please enter your email"
                      fieldStyleProps={{
                        border: "border border-[#cccccc]",
                      }}
                      labelStyle="font-bold text-[12px] mb-1"
                      onChange={handleChange}
                    />
                    <Errorcomponent text={email} />
                  </div>

                  <div className="mb-3">
                    <CustomInputField
                      label={"Phone"}
                      name={"phone"}
                      value={values.phone}
                      placeholder="Please enter your phone number"
                      fieldStyleProps={{
                        border: "border border-[#cccccc]",
                      }}
                      labelStyle="font-bold text-[12px] mb-1"
                      onChange={handleChange}
                    />
                    <Errorcomponent text={phone} />
                  </div>
                  <div>
                    <CustomInputField
                      label={"Street"}
                      name={"street"}
                      value={values.street}
                      placeholder="Please enter your street"
                      fieldStyleProps={{
                        border: "border border-[#cccccc]",
                      }}
                      labelStyle="font-bold text-[12px] mb-1"
                      onChange={handleChange}
                    />
                    <Errorcomponent text={street} />
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <CustomInputField
                      label={"Last Name"}
                      name={"lastname"}
                      value={values.lastname}
                      placeholder="Please enter your last name"
                      fieldStyleProps={{
                        border: "border border-[#cccccc]",
                      }}
                      labelStyle="font-bold text-[12px] mb-1"
                      onChange={handleChange}
                    />
                    <Errorcomponent text={lastname} />
                  </div>

                  <div className="mb-3">
                    <CustomInputField
                      label={"Username"}
                      name={"username"}
                      value={values.username}
                      placeholder="Please enter your username"
                      fieldStyleProps={{
                        border: "border border-[#cccccc]",
                      }}
                      labelStyle="font-bold text-[12px] mb-1"
                      onChange={handleChange}
                    />
                    <Errorcomponent text={username} />
                  </div>

                  <div className="mb-3">
                    <CustomInputField
                      label={"City"}
                      name={"city"}
                      value={values.city}
                      placeholder="Please enter your city"
                      fieldStyleProps={{
                        border: "border border-[#cccccc]",
                      }}
                      labelStyle="font-bold text-[12px] mb-1"
                      onChange={handleChange}
                    />
                    <Errorcomponent text={city} />
                  </div>

                  <div>
                    <CustomInputField
                      label={"Number"}
                      name={"number"}
                      value={values.number}
                      placeholder="Please your street number"
                      fieldStyleProps={{
                        border: "border border-[#cccccc]",
                      }}
                      labelStyle="font-bold text-[12px] mb-1"
                      onChange={handleChange}
                    />
                    <Errorcomponent text={number} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-3">
                <div>
                  <CustomInputField
                    label={"Zipcode"}
                    name={"zipcode"}
                    value={values.zipcode}
                    placeholder="Please enter your zipcode"
                    fieldStyleProps={{
                      border: "border border-[#cccccc]",
                    }}
                    labelStyle="font-bold text-[12px] mb-1"
                    onChange={handleChange}
                  />
                  <Errorcomponent text={zipcode} />
                </div>
                <div>
                  <CustomInputField
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    value={values.password}
                    placeholder="Please enter your password"
                    fieldStyleProps={{
                      border: "border border-[#cccccc]",
                    }}
                    labelStyle="font-bold text-[12px] mb-1"
                    onChange={handleChange}
                  />
                  <Errorcomponent text={password} />
                </div>
              </div>
              <div className="w-[40%] m-auto mt-6">
                <CustomButton
                  type="submit"
                  text={
                    !isSubmitting ? (
                      "SIGN UP"
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

export default SignUp;
