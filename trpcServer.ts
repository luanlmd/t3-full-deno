import { opine } from "https://deno.land/x/opine@2.3.3/mod.ts";
import * as trpc from "https://esm.sh/@trpc/server@9.27.2";
import * as trpcExpress from "https://esm.sh/@trpc/server@9.27.2/adapters/express";
import { opineCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = opine(); // opine is express ported to deno

// setup tRPC router
const appRouter = trpc.router().query("hw", {
  resolve() {
    const data = { hello: "world" };
    return data;
  },
});

app.use(opineCors()); // uncomment to use cors

// apply tRPC router as a middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  }),
);

export const createTRPCServer = () => {
  app.listen(5005); // start server
  console.log("Server started on port 5005");
};

export type AppRouter = typeof appRouter; // tRPC type-only export
