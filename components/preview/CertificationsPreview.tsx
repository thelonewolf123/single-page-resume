"use client";

import type { ResumeData } from "@/lib/resume-schema";

interface Props {
  data: ResumeData;
}

export default function CertificationsPreview({ data }: Props) {
  if (!data.certifications?.some((cert) => cert.name)) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
        CERTIFICATION
      </h2>
      <div className="space-y-2">
        {data.certifications.map(
          (cert, index) =>
            cert.name && (
              <div key={index}>
                <p className="text-blue-600 text-sm">• {cert.name}</p>
                {cert.issuer && (
                  <p className="text-xs text-gray-600 ml-2">({cert.issuer})</p>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}
