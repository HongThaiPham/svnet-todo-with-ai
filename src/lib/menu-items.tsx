import { Calendar, CalendarDays, Inbox, Tag } from "lucide-react";

export const primaryNavItems = [
  {
    id: "primary",
    name: "Inbox",
    link: "/my-board",
    icon: <Inbox className="w-4 h-4" />,
  },
  {
    name: "Today",
    link: "/my-board/today",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    name: "Upcoming",
    link: "/my-board/upcoming",
    icon: <CalendarDays className="w-4 h-4" />,
  },
  {
    id: "filters",
    name: "Filters & Labels",
    link: "/my-board/filter-labels",
    icon: <Tag className="w-4 h-4" />,
  },
];
