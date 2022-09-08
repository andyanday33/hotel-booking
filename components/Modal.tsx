import React, { PropsWithChildren } from "react";

type Props = {
  text: string;
};

const Modal: React.FC<PropsWithChildren<Props>> = ({ text, children }) => {
  return (
    <>
      {/* // <!-- The button to open modal --> */}
      <label htmlFor="my-modal-6" className="btn modal-button">
        {text}
      </label>

      {/* // <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {children}
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
