import React, { PropsWithChildren } from "react";

const NoLayout = (props: PropsWithChildren) => {
  return (
    <>
      <main>{props.children}</main>
    </>
  );
};

export default NoLayout;