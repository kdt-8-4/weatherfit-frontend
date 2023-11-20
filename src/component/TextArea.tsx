import { useEffect, useRef, useState } from "react";
import "../style/textArea.scss";

//TODO 수정 필요 ..
interface TextAreaProps {
  content: string;
  placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({ content, placeholder }) => {
  const [text, setText] = useState<string>(content);
  const textAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handlePlaceholder();
  }, []);

  const handleInputChange = () => {
    if (textAreaRef.current) {
      const content = textAreaRef.current.textContent || "";
      const newText = content.replace(
        /#(\w+)/g,
        '<span class="hashtag">#$1</span>',
      );
      setText(newText);
      // handlePlaceholder();
    }
  };

  const handlePlaceholder = () => {
    if (textAreaRef.current && !textAreaRef.current.textContent?.trim().length)
      textAreaRef.current.textContent = placeholder;
  };

  const handleFocus = () => {
    if (
      textAreaRef.current &&
      textAreaRef.current.textContent === placeholder
    ) {
      textAreaRef.current.textContent = "";
    }
  };

  const handleBlur = () => {
    // if (!textAreaRef.current.textContent) {
    //   handlePlaceholder();
    // }
    handleInputChange();
  };

  return (
    <>
      <div
        ref={textAreaRef}
        contentEditable
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="text-area"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </>
  );
};

export default TextArea;
