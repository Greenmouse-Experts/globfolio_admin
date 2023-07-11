import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { classNames } from "@/shared/utils/format";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

// TODO: Extend input type to include all possible input types
export enum InputType {
  email = "email",
  password = "password",
  radio = "radio",
  tel = "tel",
  text = "text",
  textarea = "textarea",
  number = "number",
  checkbox = "checkbox",
  search= "search"
}

interface Props {
  type: InputType;
  name?: string;
  onChange?:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | any;
  label?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  required?: boolean;
  labelClassName?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  fullWidth?: boolean;
  inputRef?: any;
  onKeyPress?: () => void;
  onBlur?: Function;
  autoComplete?: string;
  autoCapitalize?: string;
  onFocus?: () => void;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  min?: number;
  max?: number;
  customRightElement?: React.ReactNode;
  altClassName?: string;
  icon?:JSX.Element;
  [key: string]: any;
  readonly?: any
}

const TextInput: React.FC<Props> = ({
  type,
  name,
  onChange,
  label,
  error,
  required = false,
  className = "w-full border-0  outline-none py-2 px-2 rounded",
  labelClassName,
  placeholder,
  disabled = false,
  maxLength,
  autoFocus,
  fullWidth,
  inputRef,
  onKeyPress,
  onBlur,
  autoComplete,
  autoCapitalize,
  onFocus,
  onKeyUp,
  onKeyDown,
  min,
  max,
  customRightElement,
  altClassName,
  icon,
  readonly,
  ...rest
}) => {
  const [isPasswordType, setIsPasswordType] = useState<boolean>(false);
  const [inputType, setInputType] = useState<InputType>(type);

  const togglePassword = (state: boolean) => {
    setIsPasswordType(state);
    setInputType(!state ? InputType.password : InputType.text);
  };

  const renderInputType = () => {
    switch (type) {
      case InputType.textarea:
        return (
          <textarea
            id={name}
            className={
              altClassName ||
              classNames(fullWidth ? "w-full p-2" : "p-2 h-24", className)
            }
            name={name}
            required={required}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoFocus={autoFocus}
            onFocus={onFocus}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            ref={inputRef}
            {...rest}
          />
        );
        case InputType.checkbox:
          return (
            <input type="checkbox"
            className={
              altClassName ||
              classNames(fullWidth ? "" : "p-2", className)
            }
            name={name}
            required={required}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoFocus={autoFocus}
            onFocus={onFocus}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            ref={inputRef}
            {...rest}/>
          )

      default:
        return (
          <input
            id={name}
            type={inputType}
            className={
              altClassName || classNames(fullWidth ? "w-full" : "", className)
            }
            name={name}
            required={required}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoFocus={autoFocus}
            onFocus={onFocus}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            ref={inputRef}
            min={min}
            max={max}
            {...rest}
          />
        );
    }
  };

  return (
    <div className="mt-3">
      <div>
        <>
          {label && (
            <label className={labelClassName ? labelClassName : ""}>
              {label}
            </label>
          )}
        </>
      </div>
      <div
        className={classNames(type === InputType.checkbox? "" :
          error ? "border-red-400 border" : "border border-gray-400",
          "flex items-center bg-input  mt-1 rounded"
        )}
      >
        {
          icon && icon
        }
        {renderInputType()}
        {customRightElement && customRightElement}
        {type === InputType.password && (
          <div onClick={() => togglePassword(!isPasswordType)} className="px-3">
            {!isPasswordType ? (
              <FaRegEyeSlash className="text-xl" />
            ) : (
              <FaRegEye className="text-xl" />
            )}
          </div>
        )}
      </div>
      
      <>
          {error && (
            <span className="fs-500 fw-500 text-red-500">
              {error.toString()}
            </span>
          )}
        </>
    </div>
  );
};

export default TextInput;
