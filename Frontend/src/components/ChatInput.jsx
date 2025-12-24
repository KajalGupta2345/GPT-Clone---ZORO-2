import { useForm } from "react-hook-form";

const ChatInput = ({ setArr, socketInstance, chatId }) => {
  const { register, reset, handleSubmit } = useForm();
  const submitHandler = (data) => {
    if (!data.message.trim()) return;
    const msg = {
      role: "user",
      content: data.message,
    };
    setArr((prev) => [...prev, msg]);

    socketInstance.emit("ai-message", {
      chat: chatId,
      content: data.message,
    });
    // console.log(arr);
    reset();
  };
  return (
    <div className=" w-full px-4 py-3 flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="
    flex items-center gap-3
    w-full max-w-3xl
    px-4 py-2
    rounded-full
    bg-[rgba(255,255,255,0.05)]
    border border-[rgba(255,255,255,0.15)]
    shadow-[0_10px_35px_rgba(0,0,0,0.45)]
    backdrop-blur-md
    focus-within:ring-2 focus-within:ring-[#b4b4b4]
    transition-all
  "
      >
        <i className="ri-add-line text-white text-2xl"></i>

        <input
          className="
      flex-1
      px-2 py-3
      bg-transparent
      text-white
      placeholder:text-[#b4b4b4]
      focus:outline-none
    "
          placeholder="Ask anything"
          autoComplete="off"
          {...register("message")}
        />

        <button
          type="submit"
          className="
      bg-[#eaeaea]
      rounded-full
      px-2 py-1
      hover:bg-white
      transition
    "
        >
          <i className="ri-arrow-up-line text-black text-xl"></i>
        </button>
      </form>
      <p className="text-white text-xs mt-1 leading-relaxed tracking-wide">
        ZORO can make mistakes. Check important info. See Cookie Preferences.
      </p>
    </div>
  );
};

export default ChatInput;
