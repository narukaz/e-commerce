import {
  ChartArea,
  LayoutDashboard,
  Package,
  ShoppingBasket,
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "orders",
    icon: <Package />,
  },
];



function Menuitems({setOpen}) {
  const navigate = useNavigate();




  return (
    <nav className="mt-4">
     {adminSidebarMenuItems.map((menuItem) => {
        return (
          <div
            onClick={() =>{
              navigate(menuItem.path);
              setOpen ? setOpen(false): null;
            }}
             
            className="flex text-xl items-center gap-10 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
            key={menuItem.id}
          >
            {menuItem.icon}
            <span> {menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}




function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5 text-2xl font-extrabold">
              <SheetDescription>
               
              </SheetDescription>
                <ChartArea size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <Menuitems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartArea size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <Menuitems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
