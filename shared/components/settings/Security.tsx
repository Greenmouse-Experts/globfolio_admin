import React from "react";
import Button from "../UI/Button";

const SecurityPass = () => {
  return (
    <>
      <div>
        <p className="fw-600 pb-2 px-2 border-b-2 border-[#E8EAED]">Password</p>
        <div>
          <div className="py-12 border-b lg:pl-12">
            <div className="flex items-center">
              <p className="w-3/12">Current password</p>
              <input className="w-96 rounded p-2 border border-[#E8EAED]" />
            </div>
          </div>
          <div className="py-12 border-b lg:pl-12">
            <div className="flex">
              <p className="w-3/12">New password</p>
              <div>
                <input className="w-96 rounded p-2 border border-[#E8EAED]" />
                <p className="mt-2 fs-200 text-[#5F5F5F] fw-500">
                  Your password must be more than 8 characters
                </p>
              </div>
            </div>
          </div>
          <div className="py-12 border-b lg:pl-12">
            <div className="flex items-center">
              <p className="w-3/12">Confirm password</p>
              <input className="w-96 rounded p-2 border border-[#E8EAED]" />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-12">
            <Button title='Update Password' altClassName="py-2 bg-primary px-12 rounded-lg text-white fw-500"/>
        </div>
      </div>
    </>
  );
};

export default SecurityPass;
