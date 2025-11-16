import type { NextApiRequest, NextApiResponse } from "next";

type Priority = "Urgent" | "Standard";

interface TriageResponse {
  category: string;
  priority: Priority;
  estimatedFee: string;
  explanation: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TriageResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, description } = req.body as {
    title?: string;
    description?: string;
  };

  const combined = `${title ?? ""} ${description ?? ""}`.toLowerCase();

  let category = "General maintenance";
  let priority: Priority = "Standard";
  let estimatedFee = "£90";

  if (
    combined.includes("boiler") ||
    combined.includes("heating") ||
    combined.includes("hot water")
  ) {
    category = "Boiler / Heating";
    priority = "Urgent";
    estimatedFee = "£140";
  } else if (combined.includes("leak") || combined.includes("water")) {
    category = "Plumbing / Leak";
    priority = "Urgent";
    estimatedFee = "£120";
  } else if (combined.includes("extractor") || combined.includes("fan")) {
    category = "Electrical / Ventilation";
    priority = "Standard";
    estimatedFee = "£110";
  }

  const explanation =
    "This is a mock triage result generated on the server. In production this endpoint would call your AI model based on the title and description.";

  return res.status(200).json({
    category,
    priority,
    estimatedFee,
    explanation,
  });
}
