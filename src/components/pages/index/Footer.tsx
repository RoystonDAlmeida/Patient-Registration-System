// src/components/pages/index/Footer - Footer component

import { Heart } from "lucide-react";

interface FooterProps {
  borderColor?: string;
}

export const Footer = ({ borderColor = "border-gray-200" }: FooterProps) => {
  return (
    <footer className={`mt-8 pt-4 border-t ${borderColor} w-fit mx-auto`}>
      <div className="flex items-center justify-center text-sm text-gray-500">
        <span>Made with</span>
        <Heart className="w-4 h-4 text-red-500 mx-1" />
        <span>by Royston D'Almeida</span>
      </div>
      <div className="mt-1 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Patient Pocket Ledger. All rights reserved.
      </div>
    </footer>
  );
}; 