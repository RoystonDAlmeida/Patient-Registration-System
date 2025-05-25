// src/components/pages/index/TabNavigation - Component for managing tab navigation in case of desktop/mobile views
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabConfig } from "./types";

interface TabNavigationProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <>
      {/* Mobile Dropdown */}
      <div className="sm:hidden mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between bg-white hover:bg-gray-50"
            >
              <span className="flex items-center gap-2 truncate">
                <Menu className="h-4 w-4 flex-shrink-0" />
                {tabs.find(tab => tab.id === activeTab)?.label}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-2rem)]">
            {tabs.map((tab) => (
              <DropdownMenuItem 
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex items-center gap-2"
              >
                <span className="flex-1 truncate">
                  {tab.label}
                  {tab.count !== undefined && ` (${tab.count})`}
                </span>
                {activeTab === tab.id && (
                  <span className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Tabs */}
      <TabsList className="hidden sm:grid w-full grid-cols-3 mb-8 p-1 sticky top-0 bg-white/80 backdrop-blur-sm shadow-md rounded-lg border border-gray-100 z-10">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id}
            className="bg-white text-gray-700 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm hover:bg-gray-50 transition-colors duration-200 rounded-md truncate"
          >
            {tab.label}
            {tab.count !== undefined && ` (${tab.count})`}
          </TabsTrigger>
        ))}
      </TabsList>
    </>
  );
}; 