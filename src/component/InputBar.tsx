// InputBar.tsx
import React, { ChangeEvent, FocusEvent, useState } from "react";
import "../style/inputBar.scss";

interface InputBarProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  button?: boolean; // 버튼 여부를 추가
  buttonId?: string;
  buttonText?: string;
  onButtonClick?: () => void; // 버튼 클릭 핸들러
  autoFocus?: boolean;
}
const InputBar: React.FC<InputBarProps> = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  button,
  buttonId,
  buttonText,
  onButtonClick,
  autoFocus,
}: InputBarProps) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <div className={id}>
        <input
          autoFocus={autoFocus}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onBlur={onBlur}
        />
        {button && (
          <button type="button" id={buttonId} onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputBar;
