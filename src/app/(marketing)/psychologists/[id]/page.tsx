import { notFound } from "next/navigation";
import { getPsychologist, PSYCHOLOGISTS } from "@/lib/mock-data";
import { ProfileClient } from "./profile-client";

export function generateStaticParams() {
  return PSYCHOLOGISTS.map((p) => ({ id: p.id }));
}

export const instant = false;

export default async function PsychologistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const psychologist = getPsychologist(id);
  if (!psychologist) notFound();

  return <ProfileClient psychologist={psychologist} />;
}
