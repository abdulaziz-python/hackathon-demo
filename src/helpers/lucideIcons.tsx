
import React from 'react';
import { Send } from 'lucide-react';

// Create a custom Telegram icon based on Send icon
export const BrandTelegram = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Send
      {...props}
      className={`${props.className || ''}`}
    />
  );
};

// Make it available on the lucide-react object
// This is a hack but works for our demo purposes
import * as LucideReact from 'lucide-react';
(LucideReact as any).BrandTelegram = BrandTelegram;
