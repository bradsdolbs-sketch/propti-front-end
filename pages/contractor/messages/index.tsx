import ContractorLayout from "../../../layouts/ContractorLayout";
import { useState } from "react";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

// Mock contractor message threads
const contractorThreads = [
  {
    id: "CT-001",
    jobId: "JOB-3021",
    property: "22 Anthony House, E5",
    participant: "Bradley (Landlord)",
    lastMessage: "Great, confirm once you've arrived.",
    timestamp: "Today · 11:15",
    messages: [
      {
        sender: "Landlord",
        text: "Great, confirm once you've arrived.",
        time: "11:15",
      },
      {
        sender: "Contractor",
        text: "On my way — ETA 20 mins.",
        time: "11:10",
      },
    ],
  },
  {
    id: "CT-002",
    jobId: "JOB-3019",
    property: "Silverstream House, W1",
    participant: "Claire (Landlord)",
    lastMessage: "Thanks, invoice received.",
    timestamp: "Yesterday · 17:30",
    messages: [
      {
        sender: "Contractor",
        text: "Uploaded the invoice for the extractor fan job.",
        time: "17:25",
      },
      {
        sender: "Landlord",
        text: "Thanks, invoice received.",
        time: "17:30",
      },
    ],
  },
];

export default function ContractorMessagesPage() {
  const [activeThread, setActiveThread] = useState(contractorThreads[0]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    activeThread.messages.push({
      sender: "Contractor",
      text: message,
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setMessage("");
  };

  return (
    <ContractorLayout>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Messages</h1>
      <p className="text-slate-500 text-sm mb-6">
        Communicate with landlords regarding your assigned jobs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[75vh]">
        {/* Sidebar Threads */}
        <Card className="md:col-span-4 overflow-hidden">
          <CardContent className="p-0">
            <div className="border-b p-3">
              <Input placeholder="Search conversations..." />
            </div>

            <div className="overflow-y-auto h-[calc(75vh-60px)]">
              {contractorThreads.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveThread(t)}
                  className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${
                    activeThread.id === t.id ? "bg-slate-100" : ""
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {t.property}
                  </p>
                  <p className="text-xs text-slate-500">
                    Job ID: {t.jobId}
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
                {activeThread.property} — Job {activeThread.jobId}
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
                    m.sender === "Contractor"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                      m.sender === "Contractor"
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

            {/* Input */}
            <div className="border-t p-4 flex gap-2">
              <Input
                placeholder="Send a message to the landlord..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContractorLayout>
  );
}
