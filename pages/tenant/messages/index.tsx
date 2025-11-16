import TenantLayout from "../../../layouts/TenantLayout";
import { useState } from "react";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

// Mock tenant conversation threads
const tenantThreads = [
  {
    id: "TH-T-001",
    participant: "Your Landlord (James)",
    property: "22 Anthony House, E5",
    lastMessage: "Hi, I’ve approved the contractor. He'll contact you shortly.",
    timestamp: "Today · 10:22",
    messages: [
      {
        sender: "Landlord",
        text: "Hi, I’ve approved the contractor. He'll contact you shortly.",
        time: "10:22",
      },
      {
        sender: "Tenant",
        text: "Thanks, just wanted to ensure it was progressing.",
        time: "10:25",
      },
    ],
  },
  {
    id: "TH-T-002",
    participant: "Your Landlord (James)",
    property: "22 Anthony House, E5",
    lastMessage: "Sure, you can send photos here.",
    timestamp: "Yesterday · 18:40",
    messages: [
      {
        sender: "Tenant",
        text: "Hi, the extractor fan is making noise again.",
        time: "18:35",
      },
      {
        sender: "Landlord",
        text: "Sure, you can send photos here.",
        time: "18:40",
      },
    ],
  },
];

export default function TenantMessagesPage() {
  const [activeThread, setActiveThread] = useState(tenantThreads[0]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    activeThread.messages.push({
      sender: "Tenant",
      text: message,
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setMessage("");
  };

  return (
    <TenantLayout>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Messages</h1>
      <p className="text-slate-500 text-sm mb-6">
        Contact your landlord regarding your property or maintenance requests.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[75vh]">
        {/* Sidebar Threads */}
        <Card className="md:col-span-4 overflow-hidden">
          <CardContent className="p-0">
            <div className="border-b p-3">
              <Input placeholder="Search conversations..." />
            </div>

            <div className="overflow-y-auto h-[calc(75vh-60px)]">
              {tenantThreads.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveThread(t)}
                  className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${
                    activeThread.id === t.id ? "bg-slate-100" : ""
                  }`}
                >
                  <p className="text-sm font-medium text-slate-900">
                    {t.participant}
                  </p>
                  <p className="text-xs text-slate-500">{t.property}</p>
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
                    m.sender === "Tenant" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                      m.sender === "Tenant"
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
                placeholder="Type a message to your landlord..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
