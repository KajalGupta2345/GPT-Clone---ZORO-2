import TypingDots from "./TypingDots";
import { useState,useEffect,useRef } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import axios from "axios";

const ChatBody = ({ arr, activeChatId, isTyping,setAuth }) => {
  const [isopen, setisopen] = useState(false);
  const profileRef = useRef(null);

  const handleProfile = ()=>{ 
    setisopen(!isopen);
  }
  const handleLogout = async() =>{
    try {
      const response = await axios.post(
        "https://gpt-clone-zoro.onrender.com/api/auth/logout",
        { withCredentials: true } 
      );

      if (response.status === 200) {
        setAuth(false); 
        toast.success("Logged out successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Logout failed!");
    }
  }

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setisopen(false); // menu close
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <>
      <nav className="w-full sticky top-0 z-50  py-4 px-8 border-b-2 border-b-[rgba(255,255,255,0.1)] flex justify-between text-[#fff] text-lg">
        <span className="flex items-center gap-2 mt-1">
         <p className="md:text-xl  ml-20 md:ml-0">Zoro</p>
          <i className="fa-solid fa-chevron-down text-xs text-[#b4b4b4]"></i>
        </span>
        <div>
          <span onClick={handleProfile}>
            <i className="fa-solid fa-circle-user text-[#339cff] text-3xl cursor-pointer"></i>
          </span>
        </div>
        {isopen && (
          <div
           ref={profileRef}
            className="absolute top-full right-8 mt-2 bg-[rgba(255,255,255,0.06)]  backdrop-blur-md
      border border-[rgba(255,255,255,0.15)]
      shadow-[0_10px_30px_rgba(0,0,0,0.4)]
      text-sm w-48 rounded-md"
          >
            <div className="px-4 py-2 hover:bg-[rgba(255,255,255,0.08)] cursor-pointer flex gap-2 items-center">
              <i className="fa-solid fa-gear"></i>Settings
            </div>
            <div className="px-4 py-2 hover:bg-[rgba(255,255,255,0.08)] cursor-pointer flex gap-2 items-center">
              <i className="fa-solid fa-arrow-up-right-from-square"></i>Upgrade
              plan
            </div>
            <div onClick={handleLogout} className="px-4 py-2 hover:bg-[rgba(255,255,255,0.08)] cursor-pointer flex gap-2 items-center">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>Log out
            </div>
          </div>
        )}
      </nav>
      <div className="flex-1 p-5 overflow-y-auto max-w-3xl w-full mx-auto scrollbar-none">
        {!activeChatId ? (
          <h1 className="text-4xl text-[#b4b4b4] font-bold mt-70 text-center">
            What can I help you ?
          </h1>
        ) : arr?.length > 0 ? (
          <>
            {arr.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                  px-5 py-4
                  rounded-[14px]
                  leading-relaxed
                  whitespace-pre-wrap
                  break-words
                  text-sm
                  text-[#fafafa]
                  ${
                    msg.role === "user"
                      ? "bg-gradient-to-b from-[#1f1f1f] to-[#161616]"
                      : "bg-[#0d0d0d] border border-[#1e1e1e]"
                  }
                `}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {/* ✅ TYPING DOTS — AI SIDE */}
            {isTyping && <TypingDots />}
          </>
        ) : (
          <p className="text-3xl font-semibold text-gray-500 mt-70 text-center">
            No messages yet, start the conversation.
          </p>
        )}
      </div>
    </>
  );
};

export default ChatBody;
