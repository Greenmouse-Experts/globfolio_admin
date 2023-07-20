import React, {FC} from "react";
import Button from "./Button";

interface Props {
    title: string
    closeModal: () => void
    action: () => void
    cancelTitle: string
    actionTitle: string
}
const ReusableModal:FC<Props> = ({
  title,
  closeModal,
  action,
  cancelTitle,
  actionTitle,
}) => {
  return (
    <div>
      <div className="px-6">{title}</div>
      <div className="w-full mt-8 flex justify-between">
        <Button altClassName='py-2 px-3 lg:px-6 rounded  bg-red-600 text-white' title={cancelTitle} onClick={closeModal} />
        <Button altClassName='py-2 px-3 lg:px-6 rounded bg-primary text-white' title={actionTitle} onClick={action} />
      </div>
    </div>
  );
};

export default ReusableModal;