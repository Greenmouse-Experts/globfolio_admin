import { NextComponentType, NextPageContext, NextPage } from "next";
import { AppProps } from "next/app";
import { LayoutKeys } from "./Layout";

export type AppPage<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys;
};

export type MyAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
  };
};