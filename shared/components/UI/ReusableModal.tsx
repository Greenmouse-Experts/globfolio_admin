import React, {FC} from "react";
import Button from "./Button";
import { FadeSpinner } from "./Loading";

interface Props {
    title: string
    closeModal: () => void
    action: () => void
    cancelTitle: string
    actionTitle: string
    isBusy?: boolean
}
const ReusableModal:FC<Props> = ({
  title,
  closeModal,
  action,
  cancelTitle,
  actionTitle,
  isBusy
}) => {
  return (
    <div>
      <div className="px-6">{title}</div>
      <div className="w-full mt-8 flex justify-between">
        <Button altClassName='py-2 px-3 lg:px-6 rounded  bg-red-600 text-white' title={cancelTitle} onClick={closeModal} />
        <Button altClassName='py-2 px-3 lg:px-6 rounded bg-primary text-white' title={isBusy? <FadeSpinner size={10} color="white" /> : actionTitle} onClick={action} />
      </div>
    </div>
  );
};

export default ReusableModal;