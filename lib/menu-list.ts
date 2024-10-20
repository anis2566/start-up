import {
  Users,
  LayoutGrid,
  LucideIcon,
  List,
  Layers3,
  UserCog,
  BookOpen,
  Headset,
  MessageCircleQuestion,
  MessagesSquare,
  PlusCircle,
  BookOpenCheck,
  FileText,
  Bell,
  ScanSearch,
  MessageCircleWarning,
  UserPen,
  Book,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getAdminMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "",
          label: "Authors",
          active: pathname.includes("/dashboard/authors"),
          icon: UserPen,
          submenus: [
            {
              href: "/dashboard/authors/new",
              label: "New",
              active: pathname === "/dashboard/authors/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/authors",
              label: "List",
              active: pathname === "/dashboard/authors",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Categories",
          active: pathname.includes("/dashboard/categories"),
          icon: Layers3,
          submenus: [
            {
              href: "/dashboard/categories/new",
              label: "New",
              active: pathname === "/dashboard/categories/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/categories",
              label: "List",
              active: pathname === "/dashboard/categories",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Publications",
          active: pathname.includes("/dashboard/publications"),
          icon: BookOpenCheck,
          submenus: [
            {
              href: "/dashboard/publications/new",
              label: "New",
              active: pathname === "/dashboard/publications/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/publications",
              label: "List",
              active: pathname === "/dashboard/publications",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Books",
          active: pathname.includes("/dashboard/books"),
          icon: Book,
          submenus: [
            {
              href: "/dashboard/books/new",
              label: "New",
              active: pathname === "/dashboard/books/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/books",
              label: "List",
              active: pathname === "/dashboard/books",
              icon: List,
            },
          ],
        },
      ],
    },
    //   {
    //     groupLabel: "Support",
    //     menus: [
    //       {
    //         href: "/admin/chat",
    //         label: "Chat",
    //         active: pathname.includes("/admin/chat"),
    //         icon: MessagesSquare,
    //         submenus: [],
    //       },
    //     ],
    //   },
    //   {
    //     groupLabel: "Notice",
    //     menus: [
    //       {
    //         href: "/admin/notice",
    //         label: "Notice",
    //         active: pathname.includes("/admin/notice"),
    //         icon: Bell,
    //         submenus: [],
    //       },
    //     ],
    //   },
  ];
}
