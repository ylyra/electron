import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export function Default(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Collapsible.Root
      defaultOpen
      className="flex w-screen h-screen bg-rotion-900 text-rotion-100"
      onOpenChange={(open) => setIsSidebarOpen(open)}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />

        <Outlet />
      </div>
    </Collapsible.Root>
  );
}
