export interface NotificationItem {
  id: string;
  role: "tenant" | "landlord" | "contractor";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const notifications: NotificationItem[] = [
  {
    id: "N-3001",
    role: "tenant",
    title: "Update on your maintenance request",
    message: "Your landlord has approved your boiler repair.",
    time: "2h ago",
    read: false,
  },
  {
    id: "N-3002",
    role: "landlord",
    title: "New maintenance request",
    message: "Danise Fang reported an issue: Boiler not working.",
    time: "4h ago",
    read: false,
  },
  {
    id: "N-3003",
    role: "contractor",
    title: "New job offer",
    message: "A new job is available in E1 — Kitchen sink leak.",
    time: "1d ago",
    read: true,
  },
];
