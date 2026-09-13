import test from "node:test";
import assert from "node:assert/strict";
import {
  initialInbox,
  defaultFilters,
  filterInbox,
  readEntry,
  unreadChatCount,
} from "../src/data/inbox.ts";

test("default inbox keeps resolved chats with unread messages but hides read resolved chats", () => {
  const ids = filterInbox(initialInbox, defaultFilters).map(
    (entry) => entry.id,
  );
  assert.equal(ids.includes("key"), true);
  assert.equal(ids.includes("delivery"), false);
  assert.equal(ids.includes("move-in"), true);
});
test("reading a resolved chat removes it from inbox but include-resolved restores access", () => {
  const read = readEntry(initialInbox, "key");
  assert.equal(
    filterInbox(read, defaultFilters).some((entry) => entry.id === "key"),
    false,
  );
  assert.equal(
    filterInbox(read, { ...defaultFilters, includeResolved: true }).some(
      (entry) => entry.id === "key",
    ),
    true,
  );
  assert.equal(initialInbox.find((entry) => entry.id === "key").unread, 1);
});
test("type and unread filters combine without exposing read entries", () => {
  assert.deepEqual(
    filterInbox(initialInbox, {
      ...defaultFilters,
      type: "update",
      unreadOnly: true,
    }).map((entry) => entry.id),
    ["receipt"],
  );
  assert.deepEqual(
    filterInbox(initialInbox, {
      ...defaultFilters,
      type: "chat",
      unreadOnly: true,
    }).map((entry) => entry.id),
    ["technician", "key"],
  );
});
test("tab counts unread chat messages, excludes update dots, and decreases on reading", () => {
  assert.equal(unreadChatCount(initialInbox), 3);
  assert.equal(unreadChatCount(readEntry(initialInbox, "technician")), 1);
  assert.equal(
    unreadChatCount(readEntry(readEntry(initialInbox, "technician"), "key")),
    0,
  );
});
test("reading an update clears its dot without removing it from the normal inbox", () => {
  const read = readEntry(initialInbox, "receipt");
  assert.equal(
    filterInbox(read, defaultFilters).find((entry) => entry.id === "receipt")
      .unread,
    0,
  );
  assert.equal(
    filterInbox(read, { ...defaultFilters, type: "update", unreadOnly: true })
      .length,
    0,
  );
});
