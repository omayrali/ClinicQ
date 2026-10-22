export const colors = {
  background: "#FBFBFB",
  surface: "#FFFFFF",
  border: "#E2E2E2",
  text: "#151515",
  subtext: "#4D4D4D",
  muted: "#7D7D7D",
  placeholder: "#A4A4A4",
  primary: "#2D59F0",
  primaryDark: "#172D78",
  success: "#43A047",
  warning: "#FBC02D",
  danger: "#E53935",
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radius = { sm: 8, md: 16, pill: 999 } as const;

export const fontSize = { sm: 12, md: 14, lg: 16, xl: 20, xxl: 24 } as const;

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
} as const;
