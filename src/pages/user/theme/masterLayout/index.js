import { memo } from "react";
import Hearder from "../hearder";
import Footer from "../footer";

const MasterLayout = ({ children, ...props }) => {
    return (
        <div {...props}>
            <Hearder />
            {children}
            <Footer />
        </div>
    );
};

export default memo(MasterLayout);