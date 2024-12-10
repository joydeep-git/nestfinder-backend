import { randomUUID } from "crypto";

export const randomUsernameGenerator = (name: string): string => {
  return name.toLowerCase() + randomUUID().split("-")[0];
}