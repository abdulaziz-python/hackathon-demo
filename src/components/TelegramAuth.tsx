
import React, { useEffect, useRef } from "react";
import { TelegramIcon } from "@/components/ui/Icons";

interface TelegramAuthProps {
  onSuccess: (userData: any) => void;
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ onSuccess }) => {
  const telegramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulating Telegram auth since we can't integrate the real thing
    const timer = setTimeout(() => {
      const mockTelegramUser = {
        id: 12345678,
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        photo_url: "https://t.me/i/userpic/320/johndoe.jpg",
        auth_date: Math.floor(Date.now() / 1000),
        hash: "mock_hash_value"
      };
      
      if (onSuccess) {
        onSuccess(mockTelegramUser);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div ref={telegramRef} className="w-full flex flex-col items-center space-y-4 p-4">
      <div className="w-16 h-16 rounded-full bg-[#0088cc]/10 flex items-center justify-center">
        <TelegramIcon size={28} />
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Telegram Authentication</h3>
        <p className="text-muted-foreground mb-4">
          We're connecting to Telegram. This will only take a moment...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default TelegramAuth;
