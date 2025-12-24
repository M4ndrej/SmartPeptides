import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import AnimateHeight from "react-animate-height";
import { ChatOption } from "@/types/chat";
import MessageList from "./MessageList";
import Input from "@/components/Input/Input";
import OrderInputFields from "./OrderInputFields";
import ChatHeader from "./ChatHeader";
import { useChatLogic } from "@/hooks/useChatLogic";

interface ChatWithUsSectionProps {
  selectedChatOption: ChatOption | null;
  setSelectedChatOption: (option: ChatOption) => void;
  isFaqSelected: boolean;
  isChatWidgetOpen: boolean;
}

const ChatWithUsSection: FC<ChatWithUsSectionProps> = ({
  selectedChatOption,
  setSelectedChatOption,
  isFaqSelected,
  isChatWidgetOpen,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    chatMessages,
    orderMessages,
    chatInput,
    orderInput,
    handleInput,
    handleSendMessage,
    handleSendImage,
    fieldErrors,
    setFieldErrors,
  } = useChatLogic({
    selectedChatOption,
    isChatWidgetOpen,
    selectedFile,
    setSelectedFile,
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        const offset = 50;
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        const scrollContainer = messagesEndRef.current?.parentElement;
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollTop - offset;
        }
      });
    }
  }, [chatMessages, orderMessages]);

  const chatIsOpen = selectedChatOption?.name === "chat";
  const orderIsOpen = selectedChatOption?.name === "order";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        await handleSendImage(selectedFile);
        setSelectedFile(null);
      } catch (error) {
        console.error("Error sending file:", error);
      }
    } else {
      await handleSendMessage();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFieldErrors({ ...fieldErrors, message: "" });
      event.target.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!selectedFile) {
        handleSubmit(event);
      }
    }
  };

  const containerClasses = classNames({
    "rounded-[8px] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] transition-all duration-300":
      true,
    "scrollbar h-[391px] overflow-auto sm:h-full": selectedChatOption,
    "h-[181px] overflow-hidden": !selectedChatOption && !isFaqSelected,
    "h-0 overflow-hidden": isFaqSelected,
  });

  const inputContainerClass = classNames({
    "relative top-[-12px] w-full overflow-hidden transition-all duration-300":
      true,
    block: selectedChatOption,
    hidden: !selectedChatOption,
  });

  return (
    <>
      <div className={`${containerClasses} mx-4`}>
        {!selectedChatOption && !isFaqSelected && (
          <ChatHeader setSelectedChatOption={setSelectedChatOption} />
        )}
        <AnimateHeight height={selectedChatOption ? "auto" : 0}>
          {selectedChatOption &&
            ["chat", "order"].includes(selectedChatOption.name) &&
            (selectedChatOption.name === "chat"
              ? chatMessages
              : orderMessages
            ).map((message, i) => (
              <MessageList
                key={i}
                chatMessage={message}
                alignRight={message.userName === "Me"}
              />
            ))}
          <div ref={messagesEndRef} />
          {orderIsOpen && orderMessages.length < 2 && (
            <div className="px-4 py-6">
              <OrderInputFields
                orderInput={orderInput}
                fieldErrors={fieldErrors}
                handleInput={handleInput}
              />
            </div>
          )}
        </AnimateHeight>
      </div>
      <div className={`mt-6 h-[53px] ${inputContainerClass}`}>
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <Input
            name="message"
            label={!selectedFile ? "Reply here ..." : ""}
            value={chatIsOpen ? chatInput : orderInput.message}
            required={false}
            errorInput={!!fieldErrors.message}
            customErrorText={fieldErrors.message || undefined}
            customLabelClass="!pt-[15px]"
            customClass="h-[53px] border-0 !rounded-[8px] focus:outline-none focus:bg-transparent focus:border-none "
            onChange={handleInput}
          />
          {selectedFile && (
            <div className="absolute right-[174px] top-1/2 -translate-y-1/2 transform cursor-pointer">
              <span className="mr-[5px] text-[12px] font-medium text-[#333333]">
                {selectedFile.name}
              </span>
              <button
                type="button"
                className="text-red-500 rounded-full bg-[#999999] px-1 text-[10px] text-white "
                onClick={removeSelectedFile}
              >
                X
              </button>
            </div>
          )}
          <button
            className="absolute right-14 top-1/2 -translate-y-1/2 transform cursor-pointer hover:text-[#E7461E]"
            onClick={triggerFileInput}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#999999] hover:text-[#E7461E]"
            >
              <path
                d="M10.129 8.99994V15.7288C10.1368 16.2219 10.3381 16.6922 10.6895 17.0381C11.041 17.384 11.5143 17.5779 12.0075 17.5779C12.5006 17.5779 12.974 17.384 13.3254 17.0381C13.6769 16.6922 13.8782 16.2219 13.886 15.7288L13.8921 6.89056C13.8972 6.46912 13.8186 6.05086 13.6609 5.66002C13.5031 5.26918 13.2694 4.91354 12.9732 4.61371C12.677 4.31388 12.3242 4.07584 11.9353 3.91337C11.5464 3.7509 11.1291 3.66724 10.7076 3.66724C10.2862 3.66724 9.86889 3.7509 9.47999 3.91337C9.09109 4.07584 8.73831 4.31388 8.4421 4.61371C8.14589 4.91354 7.91214 5.26918 7.7544 5.66002C7.59666 6.05086 7.51807 6.46912 7.52318 6.89056V15.7884C7.5402 16.9644 8.01933 18.0865 8.85699 18.9121C9.69466 19.7378 10.8236 20.2006 11.9997 20.2006C13.1759 20.2006 14.3048 19.7378 15.1425 18.9121C15.9802 18.0865 16.4593 16.9644 16.4763 15.7884V7.47369"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="hover:bg-[#E7461E]2 absolute right-4 top-1/2 flex h-[32px] w-[32px] -translate-y-1/2 transform items-center justify-center gap-0 rounded-[5px] bg-[#E7461E] text-white opacity-100 transition-all duration-300"
          >
            <svg
              width="7"
              height="13"
              viewBox="0 0 7 13"
              fill="none"
              className="mr-[2px]"
            >
              <path
                d="M1 1L6 6.5L1 12"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWithUsSection;
