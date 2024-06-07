import React, {
  forwardRef,
  ComponentPropsWithoutRef,
  KeyboardEventHandler,
  FormEventHandler,
} from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = ComponentPropsWithoutRef<"input"> & { label: string };
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const inputProps: Omit<InputProps, "label"> & { label?: string } = {
      ...props,
    };
    delete inputProps.label;
    return (
      <label className="flex flex-col">
        <span className="text-sm font-bold">{props.label}</span>
        <input
          {...inputProps}
          ref={ref}
          className={twMerge(
            "rounded-xl border border-gray-200 bg-transparent px-2 py-1 transition-colors focus:border-transparent focus:shadow-sm focus:outline-0 focus:[box-shadow:0_0_0.25rem_theme(colors.lime.600)] disabled:opacity-70 dark:border-gray-700 dark:focus:[box-shadow:0_0_0.25rem_theme(colors.lime.300)]",
            props.className,
          )}
        />
      </label>
    );
  },
);

export type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  before?: React.ReactNode;
  after?: React.ReactNode;
  above?: React.ReactNode;
  below?: React.ReactNode;
  onEnter?: () => void;
};
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props: TextareaProps, ref) => {
    const textareaProps = { ...props };
    delete textareaProps.before;
    delete textareaProps.after;
    delete textareaProps.above;
    delete textareaProps.below;
    delete textareaProps.onEnter;

    const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
      e.currentTarget.style.height = "auto";
      e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
      props.onInput?.(e);
    };
    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        props.onEnter?.();
      }
      props.onKeyDown?.(e);
    };

    return (
      <div
        className={twMerge(
          "flex flex-col rounded-xl border border-gray-200 px-2 py-1 transition-colors has-[textarea:focus]:border-transparent has-[textarea:disabled]:opacity-70 has-[textarea:focus]:shadow-sm has-[textarea:focus]:[box-shadow:0_0_0.25rem_theme(colors.lime.600)] dark:border-gray-700 dark:has-[textarea:focus]:[box-shadow:0_0_0.25rem_theme(colors.lime.300)]",
          props.className,
        )}
      >
        {props.above}
        <div className="flex">
          {props.before}
          <textarea
            {...{ ...textareaProps, className: undefined }}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="mx-2 h-full grow resize-none bg-transparent py-1 outline-0"
            rows={1}
            ref={ref}
          />
          {props.after}
        </div>
        {props.below}
      </div>
    );
  },
);
