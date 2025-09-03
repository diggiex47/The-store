import "tailwindcss/types/config";

declare module "tailwindcss/types/config" {
  interface DefaultConfig {
    daisyui?: unknown;
  }
}
