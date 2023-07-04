import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../store/api/AuthSlice';

const Register = () => {

  const [register, { error = {} }] = useRegisterMutation();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    register({
        name: values.name,
        email: values.email,
        password: values.password,
    }).unwrap().then(()=>{
      navigate("/")
    })
    

    // Reset the form after submission
    resetForm();
  };

  console.log("register error", error)

  return (
    <div className="bg-white mt-16 p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
            <div className="mb-5">
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>

          <button
            type="submit"
            className="block text-white w-full bg-teal-900 text-black font-bold p-4 rounded-lg hover:bg-teal-700"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
