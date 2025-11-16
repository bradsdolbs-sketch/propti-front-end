import LandlordLayout from "../../../layouts/LandlordLayout";
import { useState } from "react";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

// Mock message threads
const threads = [
  {
    id: "TH-001",
    property: "22 Anthony House, E5",
    participant: "Danise Fang (Tenant)",
    lastMessage: "Hi, just checking if a contractor has been booked yet?",
    timestamp: "Today · 09:14",
    messages: [
      {
        sender: "Tenant",
        text: "Hi, just checking if a contractor has been booked yet?",
        time: "09:14",
      },
      {
        sender: "Landlord",
        text: "Hi Danise — I’ve approved it, contractor will be assigned shortly.",
        time: "09:20",
      },
    ],
  },
  {
    id: "TH-002",
    property: "Central Gate, E1",
    participant: "Dave FixIt (Contractor)",
    lastMessage: "Job completed. Uploaded invoice as requested.",
    timestamp: "Yesterday · 17:40",
    messages: [
      {
        sender: "Contractor",
        text: "Job completed. Uploaded invoice as requested.",
        time: "17:40",
      },
      {
        sender: "Landlord",
        text: "Thanks Dave, confirming payment this week.",
        time: "17:45",
      },
    ],
  },
];

export default function LandlordMessagesPage() {
  const [activeThread, setActiveThread] = useState(threads[0]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    activeThread.messages.push({
      sender: "Landlord",
      text: message,
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setMessage("");
  };

  return (
    <LandlordLayout>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Messages</h1>
      <p className="text-slate-500 text-sm mb-6">
        Communicate with tenants and contractors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[75vh]">
        {/* Sidebar Threads */}
        <Card className="md:col-span-4 overflow-hidden">
          <CardContent className="p-0">
            <div className="border-b p-3">
              <Input placeholder="Search conversations..." />
            </div>

            <div className="overflow-y-auto h-[calc(75vh-60px)]">
              {threads.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveThread(t)}
                  className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${
                    activeThread.id === t.id ? "bg-slate-100" : ""
                  }`}
                >
                  <p className="text-sm font-medium text-slate-900">
                    {t.property}
                  </p>
                  <p className="text-xs text-slate-500">{t.participant}</p>
                  <p className="text-sm mt-1 truncate text-slate-700">
                    {t.lastMessage}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{t.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Conversation */}
        <Card className="md:col-span-8 flex flex-col">
          <CardContent className="flex flex-col h-full p-0">
            {/* Header */}
            <div className="border-b p-4">
              <p className="text-sm text-slate-500">
                {activeThread.property}
              </p>
              <h2 className="text-lg font-semibold">
                {activeThread.participant}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeThread.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.sender === "Landlord" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                      m.sender === "Landlord"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-200"
                    }`}
                  >
                    <p>{m.text}</p>
                    <p className="text-[10px] mt-1 opacity-70">{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4 flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </LandlordLayout>
  );
}
