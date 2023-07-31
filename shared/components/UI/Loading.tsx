import React from "react";
import { Comment, InfinitySpin } from "react-loader-spinner";
import { BeatLoader, PropagateLoader, PulseLoader } from "react-spinners";

export const ScaleSpinner = ({
  size,
  color,
}: {
  size?: number;
  color: string;
}) => {
  const override: any = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    padding: "3px 0px 22px",
  };
  return (
    <PropagateLoader
      color={color}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export const FadeSpinner = ({
  size,
  color,
}: {
  size?: number;
  color: string;
}) => {
  return (
    <BeatLoader
      color={color}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export const PulseSpinner = ({
  size,
  color,
}: {
  size?: number;
  color: string;
}) => {
  return (
    <PulseLoader
      color={color}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export const ChatLoader = ({ size }: { size: string }) => {
  return (
    <Comment
      visible={true}
      height={size}
      width={size}
      ariaLabel="comment-loading"
      wrapperStyle={{}}
      wrapperClass="comment-wrapper"
      color="#fff"
      backgroundColor="#F4442E"
    />
  );
};

export const InfinityLoader = ({ size }: { size: string }) => {
  return <InfinitySpin width={size} color="#0B1B2B" />;
};
