import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can find index by condition", () => {
  const list = List.fromArray(lorem);
  const test = (value: string) => value.endsWith("sum");

  assert.is(list.findIndex(test), lorem.findIndex(test));
  assert.is(
    list.findIndex(value => value.length > 50),
    -1
  );
});

test.run();
