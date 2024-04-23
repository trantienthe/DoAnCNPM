import React, { memo, useEffect } from "react";
import Hearder from "../hearder";
import Footer from "../footer";
import Slider from "../slider";
import CategoryLayout from "pages/user/category";

const MasterLayout = ({ children, ...props }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      window.tensorChatbotConfig = {
        chatbotId: "aa4221a5-571c-48d4-ab04-72a56ba4a8fb"
      };
    `;
    document.body.appendChild(script);

    const chatbotScript = document.createElement("script");
    chatbotScript.src =
      "https://server.chatbot.tensor.vn/api/public/chatbot/file/embed.min.js";
    chatbotScript.defer = true;
    document.body.appendChild(chatbotScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(chatbotScript);
    };
  }, []);

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
