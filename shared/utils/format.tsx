import Image from "next/image";
import { FaSun } from "react-icons/fa";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatName = (string: string, number: number) => {
  if (string.length > number) {
    return string.substring(0, number).concat("...");
  } else return string;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const formatAsNgnMoney = (value: number | string) => {
  if (!value) return "";
  return `₦${value
    .toLocaleString("en-US")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const FormatStatus=  {
  "Active": <p className="w-28 text-center py-1 text-green-800 bg-green-100 border border-green-800 rounded">Active</p>,
  "active": <div className="flex items-center gap-x-2"><span className="bg-green-600 w-4 h-4 circle"></span> <span className="fw-500 text-green-600">Active</span></div>,
  "inactive": <div className="flex items-center gap-x-2"><span className="bg-orange-600 w-4 h-4 circle"></span> <span className="fw-500 text-orange-600">Inctive</span></div>,
  "Deactivate": <p className="w-28 text-center py-1 text-orange-800 bg-orange-100 border border-orange-800 rounded">Inactive</p>,
  "Inactive": <p className="w-28 text-center py-1 fw-500 text-orange-800 bg-orange-100 border border-orange-800 rounded">Inactive</p>,
  "Flag": <p className="w-28 text-center py-1 text-red-800 bg-red-100 border border-red-800 rounded">Flagged</p>,
  "pending": <p className="w-28 text-center py-1 text-orange-800 bg-orange-100 border border-orange-800 rounded">Pending</p>,
  "accepted": <p className="w-28 text-center py-1 text-green-800 bg-green-100 border border-green-800 rounded">Accepted</p>,
  "cleared": <p className="w-28 text-center py-1 text-blue-800 bg-blue-100 border border-blue-800 rounded">Cleared</p>,
  "PENDING": <div className="flex items-center gap-x-2"><span className="bg-orange-600 w-4 h-4 circle"></span> <span className="fw-500 text-orange-600">Pending</span></div>,
  "paid": <div className="flex items-center gap-x-2"><span className="bg-green-600 w-4 h-4 circle"></span> <span className="fw-500 text-green-600">Paid</span></div>,
  "PAID": <div className="flex items-center gap-x-2"><span className="bg-green-600 w-4 h-4 circle"></span> <span className="fw-500 text-green-600">Paid</span></div>,
  "approved": <div className="flex items-center gap-x-2"><span className="bg-green-600 w-4 h-4 circle"></span> <span className="fw-500 text-green-600">Paid</span></div>,
  "declined": <div className="flex items-center gap-x-2"><span className="bg-red-600 w-4 h-4 circle"></span> <span className="fw-500 text-red-600">Declined</span></div>,
}

export const formatRating = (rate:number, size: string) => {
  return (
    <div className="flex gap-x-2">
      <FaSun className={`${rate >= 1 ? "text-[#FFDF00]" : "text-gray-400"}`} style={{ fontSize: size}}/>
      <FaSun className={`${rate > 1 ? "text-[#FFDF00]" : "text-gray-400"}`} style={{ fontSize: size}}/>
      <FaSun className={`${rate > 2 ? "text-[#FFDF00]" : "text-gray-400"}`} style={{ fontSize: size}}/>
      <FaSun className={`${rate > 3 ? "text-[#FFDF00]" : "text-gray-400"}`} style={{ fontSize: size}}/>
      <FaSun className={`${rate > 4 ? "text-[#FFDF00]" : "text-gray-400"}`} style={{ fontSize: size}}/>
    </div>
  )
}

export const isImage = (url:string) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
export const isFile = (url:string) => {
  return /\.(pdf|docx|xml|xls)$/.test(url);
}
export const isLink = (url: string) => {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(url);
}

export const parseData = (value:string) => {
  if (!value) return "";

  return JSON.parse(value)
}

export const formatFile = (url:any) => {
 const file = parseData(url)
 console.log(file);
 
 return file[0]
}