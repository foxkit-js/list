import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem } from "./utils/lorem";

test("Can reverse List", () => {
  const list = new List(lorem).reverse();
  assert.equal(list.toArray(), [...lorem].reverse());
  assertValidList(list);
});

test.run();
