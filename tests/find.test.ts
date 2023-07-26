import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can find value by condition", () => {
  const list = List.fromArray(lorem);
  const test = (value: string) => value.endsWith("sum");

  assert.is(list.find(test), lorem.find(test));
  assert.is(
    list.find(value => value.length > 50),
    undefined
  );
});

test.run();
