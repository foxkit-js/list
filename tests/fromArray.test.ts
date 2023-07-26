import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can create List from Array", () => {
  const list = List.fromArray(lorem as string[]);

  for (let i = 0; i < lorem.length; i++) {
    assert.is(list.get(i), lorem[i], "created list is equal to input array");
  }
});

test.run();
