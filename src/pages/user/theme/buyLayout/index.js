import { memo } from "react";
import Footer from "../footer";
import Hearder from "../hearder";

const BuyLayout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Hearder />
      {children}
      <Footer />
    </div>
  );
};

export default memo(BuyLayout);
