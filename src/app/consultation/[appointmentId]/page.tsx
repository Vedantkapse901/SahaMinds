import { Suspense } from "react";
import WaitingRoomClient from "./waiting-room-client";

export default function ConsultationWaitingRoomPage() {
  return (
    <Suspense>
      <WaitingRoomClient />
    </Suspense>
  );
}
