import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation} from '../../store/api/AuthSlice';

const Login = () => {

  const [login, { error = {} }] = useLoginMutation();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    login({
        email: values.email,
        password: values.password,
    }).unwrap().then(() => {
      navigate("/");
      window.location.reload();
    }
    );


    

    // Reset the form after submission
    resetForm();
  };

  console.log("login error", error)

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
            className="block text-white w-full bg-teal-900 text-black font-bold p-4 rounded-lg hover:bg-teal-700 "
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
