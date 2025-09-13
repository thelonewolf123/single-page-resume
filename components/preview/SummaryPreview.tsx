"use client";

import type { ResumeData } from "@/lib/resume-schema";

interface Props {
  data: ResumeData;
}

export default function SummaryPreview({ data }: Props) {
  if (!data.summary) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
        SUMMARY
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
    </div>
  );
}
