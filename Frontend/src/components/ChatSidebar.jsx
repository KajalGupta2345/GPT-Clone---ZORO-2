import { useForm } from "react-hook-form";
import { useEffect, useState,useRef } from "react";
import axios from "axios";

const ChatSidebar = ({
  handleChatSelect,
  activeChatId,
  onClose,
  setArr,
  setActiveChatId,
  setChatId,
}) => {
  const { register, reset, handleSubmit } = useForm();
  const menuRef = useRef(null);

  const [showInput, setshowInput] = useState(false);
  const [chats, setChats] = useState([]);
  const [menuid, setmenuid] = useState(null);

  const toggleMenu = (id) => {
    setmenuid((prev) => (prev === id ? null : id));
  };
  const handleDeleteChat = (id) => {
    axios
      .delete(`https://gpt-clone-zoro.onrender.com/api/chat/${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setChats((prev) => prev.filter((chat) => chat._id != id));
        setArr([]);
        setActiveChatId(null);
        setChatId(null);
        setmenuid(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNewChat = () => {
    setshowInput(true);
  };
  const createNewChat = async (data) => {
    // console.log(data);
    setshowInput(false);
    try {
      const response = await axios.post(
        "https://gpt-clone-zoro.onrender.com/api/chat/",
        { title: data.title },
        { withCredentials: true }
      );
      console.log(response);

      const newChat = {
        ...response.data.chat,
        _id: response.data.chat.id,
      };

      setChats((prev) => [...prev, newChat]);
      handleChatSelect(newChat._id);
    } catch (err) {
      console.log(err);
    }
    reset();
  };
  useEffect(() => {
    axios
      .get("https://gpt-clone-zoro.onrender.com/api/chat/", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setChats(response.data.chats.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
      const handleCloseMenu=(event)=>{
          if(menuRef.current && !menuRef.current.contains(event.target)){
            setmenuid(null);
          }
      }
      document.addEventListener("mousedown",handleCloseMenu);
      return ()=>  document.removeEventListener("mousedown",handleCloseMenu);
  },[]);

  return (
    <div
      className=" bg-[#171717] text-[#b4b4b4]
       w-[260px]
      p-4 flex flex-col justify-between  relative h-full z-50 "
    >
      <button
        className="md:hidden absolute top-3 right-4 text-white text-2xl"
        onClick={onClose}
      >
        <i className="ri-close-line"></i>
      </button>
      <div className="flex flex-col gap-10">
        <img
          src="/icon.png"
          alt="GPT Logo"
          className="
     w-7 h-7
    rounded-full
    p-[2px]
    ml-2
    bg-[#fff]
    cursor-pointer
    transition-all
    duration-200
    hover:shadow-[0_0_8px_rgba(255,255,255,0.45)]
  "
        />

        <div className="flex flex-col gap-2">
          <div className="relative">
            <div
              className=" flex gap-2 items-center text-white rounded-md px-3 py-2 transition
            duration-200 hover:bg-[rgba(255,255,255,0.08)] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleNewChat();
              }}
            >
              <i className="fa-solid fa-pen-to-square text-lg"></i>
              <p className="text-sm  ">New chat</p>
            </div>
            {showInput && (
              <form
                onSubmit={handleSubmit(createNewChat)}
                onClick={(e) => e.stopPropagation()}
                className="absolute left-1/2
          top-0
        
        flex items-center gap-3 w-50 mt-4"
              >
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Enter chat title"
                  className="
        flex-1
        px-2 py-2.5
        text-sm
        rounded-md
        bg-[rgba(255,255,255,0.10)]
        text-white
        placeholder:text-[#b4b4b4]
        border border-[rgba(255,255,255,0.2)]
        focus:outline-none
        focus:ring-2 focus:ring-[#b4b4b4]
      "
                />

                <button
                  type="submit"
                  className="
        px-3 py-2.5
        rounded-md
        bg-[#eaeaea]
        text-black
        text-sm
        font-semibold
        hover:bg-white
        transition
      "
                >
                  Create
                </button>
              </form>
            )}
          </div>
          <div
            className="flex gap-2 items-center text-white rounded-md px-3 py-2 transition
    duration-200 hover:bg-[rgba(255,255,255,0.08)] cursor-pointer`}"
          >
            <i class="ri-search-line text-lg"></i>
            <p className="text-sm  ">Search chats</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-15 gap-2 flex-1 overflow-y-auto ">
        <h1 className="text-gray-300 font-semibold text-sm">Your Chats</h1>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
               onClick={(e) =>{
                e.stopPropagation();
               handleChatSelect(chat._id)}
               } 
              className={`bg-[rgba(180,180,180,0.08)]
  ${
    activeChatId == chat._id
      ? "border border-2 border-[#b4b4b4]"
      : "border-transparent"
  }
           text-sm relative cursor-pointer px-4 py-2
         flex justify-between whitespace-nowrap
            rounded-md text-white group hover:bg-[rgba(180,180,180,0.10)]`}
            >
              <span>
                {chat.title}
              </span>

              <i
                className="ri-more-2-fill opacity-0 group-hover:opacity-90
                  transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation(); //click event parent elements ko propagate nahi hone deta.ye icon click se parent div  trigger nahi honge.
                  toggleMenu(chat._id);
                }}
              ></i>
              {menuid == chat._id && (
                <div
                  ref={menuRef}
                  className=" bg-[rgba(255,255,255,0.05)]  backdrop-blur-md
                    border border-[rgba(255,255,255,0.12)]
                  shadow-lg
                   w-36 rounded-md absolute top-full right-0  mt-1 z-50"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat._id);
                    }}
                    className="px-4 py-2 text-red-400 text-sm hover:bg-[rgba(255,255,255,0.08)] cursor-pointer flex gap-2 items-center"
                  >
                    <i className="ri-delete-bin-6-line"></i>Delete
                  </div>
                  <div className="px-4 py-2 text-[#b4b4b4] text-sm hover:bg-[rgba(255,255,255,0.08)] cursor-pointer flex gap-2 items-center">
                    <i className="ri-pencil-line"></i>Rename
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="mt-5 text-xs text-gray-300">No chat yet</p>
        )}
      </div>

      <div className=" text-center border-t-1 border-t-[rgba(255,255,255,0.5)]">
        <p className="mt-2 text-[#b4b4b4]">Built with ❤️ using Zoro</p>
      </div>
    </div>
  );
};

export default ChatSidebar;
