import Image from "next/image";

export const EmptyState1 = ({message}: {message:string}) => {
  return (
    <div className="w-full h-full flex items-center justify-center text-center">
      <div>
      <Image
        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689809234/globfolio/5980393_e38ley.webp"
        alt="empty"
        width={200}
        height={200}
        className="w-6/12 mx-auto"
      />
      <p className="fw-500">{message}</p>
      </div>
    </div>
  );
};
