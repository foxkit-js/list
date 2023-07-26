import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";

test("Can determine if a value is a List", () => {
  assert.ok(List.isList(new List()), "returns true for new List");
  assert.not(List.isList(null));
  assert.not(List.isList(new Array<unknown>()));
});

test.run();
