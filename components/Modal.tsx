import React, { PropsWithChildren } from "react";

type Props = {
  text: string;
};

const Modal: React.FC<PropsWithChildren<Props>> = ({ text, children }) => {
  return (
    <>
      {/* // <!-- The button to open modal --> */}
      <label htmlFor="my-modal-4" className="btn modal-button">
        {text}
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative">{children}</label>
      </label>
    </>
  );
};

export default Modal;
