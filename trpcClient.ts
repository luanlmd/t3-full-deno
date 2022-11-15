import { createTRPCClient } from "https://esm.sh/@trpc/client@9.27.2";
import { AppRouter } from "./trpcServer.ts";

export const client = createTRPCClient<AppRouter>({
  url: "http://localhost:5005/trpc",
});
