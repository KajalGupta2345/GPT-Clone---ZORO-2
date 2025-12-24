import ChatSidebar from "../components/ChatSidebar";
import ChatBody from "../components/ChatBody";
import ChatInput from "../components/ChatInput";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Home = ({setAuth}) => {
  const [arr, setArr] = useState([]);
  const [socket, setsocket] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  

  const handleChatSelect = async (chatId) => {
    if (!chatId) return;
    setActiveChatId(chatId);
    setChatId(chatId);
    setArr([]);

    const res = await axios.get(
      `http://localhost:3000/api/messages/${chatId}`,
      { withCredentials: true }
    );
    console.log(res.data.messages);

    setArr(res.data.messages);
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000/", {
      withCredentials: true,
    });
    setsocket(socketInstance);

    socketInstance.on("ai-start", () => {
      setIsTyping(true);
    });

    socketInstance.on("ai-response", (response) => {
      setIsTyping(false);
        const aiMsg = {
        role: "model",
        content: response.content,
      };
      setArr((prev) => [...prev, aiMsg]);
    });
    return () => socketInstance.disconnect();
  }, []);

  return (
    <div
      className="
      w-full flex  h-screen relative  bg-[#212121]"
    >
      <button
        className="md:hidden p-2 text-white text-2xl absolute top-3 left-3 z-40"
        onClick={() => setShowSidebar(true)}
      >
        <i class="ri-menu-line"></i>
      </button>
      {/* Mobile Sidebar */}

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setShowSidebar(false)}
        >
            <ChatSidebar
              handleChatSelect={handleChatSelect}
              activeChatId={activeChatId}
              onClose={() => setShowSidebar(false)}
              setArr={setArr}
              setActiveChatId={setActiveChatId}
              setChatId={setChatId}
            />
        </div>
      )}

       {/* 💻 Desktop Sidebar */}
      <div className="hidden md:flex">
        <ChatSidebar
          handleChatSelect={handleChatSelect}
          activeChatId={activeChatId}
          setArr={setArr}
          setActiveChatId={setActiveChatId}
          setChatId={setChatId}
        />
      </div> 

      <div className="flex flex-col justify-between w-full bg-[#212121] backdrop-blur-lg">
        <ChatBody arr={arr} activeChatId={activeChatId} isTyping={isTyping} setAuth={setAuth} />
        <ChatInput setArr={setArr} socketInstance={socket} chatId={chatId} />
      </div>
    </div>
  );
};

export default Home;
