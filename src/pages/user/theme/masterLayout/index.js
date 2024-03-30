import { memo } from "react";
import Hearder from "../hearder";
import Footer from "../footer";
import Slider from "../slider";
import CategoryLayout from "pages/user/category";

const MasterLayout = ({ children, ...props }) => {
    return (
        <div {...props}>
            <Hearder />
            <CategoryLayout />
            <Slider />
            {children}
            <Footer />
        </div>
    );
};

export default memo(MasterLayout);