import type { IronSessionOptions } from "iron-session";

export const ironOptions: IronSessionOptions = {
  password: process.env.SESSION_PASSWORD || "CeZVvNMJz8mPHYjFo2oyWHaqpanwFYq5",
  cookieName: "aim_at_fingertips",
};
