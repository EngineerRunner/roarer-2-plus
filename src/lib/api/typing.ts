import { z } from "zod";
import { StateCreator } from "zustand";
import { Store } from ".";
import { getCloudlink } from "./cloudlink";

const TYPING_SCHEMA = z.object({
  cmd: z.literal("direct"),
  val: z.object({
    chatid: z.string(),
    u: z.string(),
    state: z.literal(101),
  }),
});

export type TypingSlice = {
  typingUsers: Record<string, string[]>;
  sendTyping: (chat: string) => void;
};
export const createTypingSlice: StateCreator<Store, [], [], TypingSlice> = (
  set,
  get,
) => {
  const userDates: Record<string, Record<string, number>> = {};
  let lastSentIndicator = 0;
  getCloudlink().then((cloudlink) => {
    cloudlink.on("packet", (packet: unknown) => {
      const parsed = TYPING_SCHEMA.safeParse(packet);
      if (!parsed.success) {
        return;
      }
      const id =
        parsed.data.val.chatid === "livechat" ? "home" : parsed.data.val.chatid;
      const user = parsed.data.val.u;
      set((state) => {
        const current = state.typingUsers[id] ?? [];
        return {
          typingUsers: {
            ...state.typingUsers,
            [id]: current.includes(user) ? current : [...current, user],
          },
        };
      });
      const time = Date.now();
      userDates[id] ??= {};
      userDates[id]![user] = time;
      setTimeout(() => {
        if (userDates[id]?.[user] !== time) {
          return;
        }
        set((state) => ({
          typingUsers: {
            ...state.typingUsers,
            [id]: (state.typingUsers[id] ?? []).filter((u) => u !== user),
          },
        }));
      }, 3000);
    });
  });
  return {
    typingUsers: {},
    sendTyping: (chat) => {
      const state = get();
      if (lastSentIndicator > Date.now() - 2500) {
        return;
      }
      lastSentIndicator = Date.now();
      fetch(
        `https://api.meower.org/${chat === "home" ? "home" : `chats/${chat}`}/typing`,
        {
          method: "POST",
          headers: state.credentials ? { Token: state.credentials.token } : {},
        },
      );
      lastSentIndicator = Date.now();
    },
  };
};