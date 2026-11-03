import { serve } from "inngest/next";
import { inngest, syncUserCreated, syncUserDeleted, syncUserUpdated, createUserOrder } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreated,
    syncUserDeleted,
    syncUserUpdated,
    createUserOrder,
  ],
});