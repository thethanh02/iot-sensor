import {
  HomeIcon,
  UserCircleIcon,
  CpuChipIcon,
  TableCellsIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@tremor/react";
import React from "react";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Sensor Log",
    href: "/sensorlogs",
    icon: CpuChipIcon,
  },
  {
    name: "Action Log",
    href: "/actionlogs",
    icon: TableCellsIcon,
  },
];

function Sidebar({ isOpenSidebar, setIsOpenSidebar }) {
  return (
    <div className="sticky top-0 flex h-screen w-full flex-col justify-between border-r border-gray-200 bg-white px-1 py-5 xl:py-12 xl:px-2">
      <div className="px-3 py-0 text-center xl:text-right">
        <Button variant="light" size="xl" icon={isOpenSidebar ? ArrowLeftCircleIcon : ArrowRightCircleIcon} onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
      </div>
      <div className={`ie-logo px-3 py-0 text-center ${isOpenSidebar && 'xl:text-left'}`}>
        <div className={`text-xl font-medium text-gray-900 ${isOpenSidebar && 'xl:px-3 xl:text-2xl'}`}>
          <span className={`block ${isOpenSidebar && 'xl:hidden'}`}>IoT</span>
          <span className={`hidden ${isOpenSidebar && 'xl:block'}`}>IoT Sensor</span>
        </div>
      </div>
      <div className="ie-menu mt-8 h-full">
        <div className={`flex flex-col items-center gap-3 p-1 ${isOpenSidebar && 'xl:items-stretch xl:px-3'}`}>
          {sidebarLinks.map((item) => {
            return (
              <NavLink to={item.href} key={item.name} className="group">
                {({ isActive }) => {
                  return (
                    <span
                      className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all ${isActive ? "bg-gray-100" : "group-hover:bg-gray-50"
                        }`}
                    >
                      <item.icon
                        className={`h-5 stroke-2 ${isActive
                            ? "stroke-blue-700"
                            : "stroke-gray-500 group-hover:stroke-blue-700"
                          }`}
                      />
                      <span
                        className={`hidden text-base font-semibold ${isOpenSidebar && 'xl:block'} ${isActive
                            ? "text-gray-900"
                            : "text-gray-500 group-hover:text-gray-900"
                          }`}
                      >
                        {item.name}
                      </span>
                    </span>
                  );
                }}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className={`ie-user hidden items-center gap-2 px-3 ${isOpenSidebar && 'xl:flex'}`}>
        <UserCircleIcon className="h-12 stroke-gray-700 stroke-1 group-hover:stroke-blue-700" />
        <div className="ie-userDetails">
          <div className="flex justify-between gap-2">
            <span className="text-base font-semibold text-gray-700">Nguyễn Văn A</span>
          </div>
          <span className="mt-1 block text-sm font-medium text-gray-700">
            anv@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
