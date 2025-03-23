
import React from "react";
import { Send } from "lucide-react";

// Custom icon for Telegram (since lucide-react doesn't have BrandTelegram)
export const TelegramIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => {
  return (
    <Send className={`text-[#0088cc] ${className || ""}`} size={size} />
  );
};
