import type { ReactNode } from "react";
import { Text, type TextProps } from "react-native";

type Variant = "display" | "title" | "heading" | "body" | "label" | "caption";
type Tone =
  | "text"
  | "subtext"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "white";

const variantClasses: Record<Variant, string> = {
  display: "font-inter-bold text-xxl",
  title: "font-inter-semibold text-xl",
  heading: "font-inter-semibold text-lg",
  body: "font-inter text-md",
  label: "font-inter-medium text-md",
  caption: "font-inter text-sm",
};

const toneClasses: Record<Tone, string> = {
  text: "text-text",
  subtext: "text-subtext",
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  white: "text-white",
};

const defaultTone: Record<Variant, Tone> = {
  display: "text",
  title: "text",
  heading: "text",
  body: "text",
  label: "text",
  caption: "subtext",
};

type AppTextProps = TextProps & {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function AppText({
  variant = "body",
  tone,
  className = "",
  children,
  ...rest
}: AppTextProps) {
  const color = toneClasses[tone ?? defaultTone[variant]];

  return (
    <Text
      className={`${variantClasses[variant]} ${color} ${className}`}
      {...rest}
    >
      {children}
    </Text>
  );
}
