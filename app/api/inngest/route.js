import { createUserOrder, inngest, syncUserCreated, syncUserDeleted, syncUserUpdated } from "@/config/inngest";
import { serve } from "inngest/next";


export const maxDuration = 300;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreated,
    syncUserDeleted,
    syncUserUpdated,
    createUserOrder,
  ],
});