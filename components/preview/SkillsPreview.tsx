"use client";

import type { ResumeData } from "@/lib/resume-schema";

interface Props {
  data: ResumeData;
}

export default function SkillsPreview({ data }: Props) {
  if (!data.skills?.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
        SKILLS
      </h2>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
