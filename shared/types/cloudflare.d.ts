import type { CfProperties, ExecutionContext, Request } from "@cloudflare/workers-types";

export {};

declare module "h3" {
  interface H3EventContext {
    cf: CfProperties;
    cloudflare?: {
      request: Request;
      context: ExecutionContext;
    };
  }
}
