import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem, loremList } from "./utils/lorem";

test("it rejects negative index", () => {
  const list = new List<string>();
  assert.not(
    list.insertMany(-7, loremList),
    "reject negative index with false"
  );
});

test.run();
