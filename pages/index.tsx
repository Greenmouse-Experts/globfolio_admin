import React from "react";
import Link from "next/link";
import { AppPage } from "@/shared/components/layouts/Types";
import Image from "next/image";
import LoginForm from "@/shared/components/auth/Login";
import logo from "../public/logo.svg";

const Login: AppPage = () => {
  return (
    <>
      <div className="bg-primary h-screen">
        <div className="w-full h-full bg-login">
        <div className="box h-full place-center">
          <Link href="/" className="absolute top-6 left-2 lg:left-6">
            <Image
              src={logo}
              alt="logo"
              className="w-48"
              width={400}
              height={100}
            />
          </Link>
          <div className="lg:w-[550px] mx-auto bg-white lg:px-16 p-6">
            <div className="mt-6 lg:mt-6">
              <p className="text-xl fw-600">Super Admin Login</p>
              <p className="mt-3 fs-500">Fill in your credentials to login to your dashboard</p>
            </div>
            <div className="my-8 lg:my-8 mx-auto">
              <LoginForm />
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;
Login.Layout = "Login";
