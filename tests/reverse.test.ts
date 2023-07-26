import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can reverse List", () => {
  const list = List.fromArray(lorem).reverse();
  assert.equal(list.toArray(), [...lorem].reverse());
});

test.run();
