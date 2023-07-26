import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can clone list", () => {
  const list = List.fromArray(lorem);
  const clone = list.clone();

  assert.equal(clone.toArray(), list.toArray(), "lists are equal");
  assert.equal(clone.length, list.length, "lists have the same length");

  // modify original
  list.push("foobar");
  assert.is(list.length, clone.length + 1, "clone did not get larger");
  assert.not(clone.tail === list.tail, "clone did not change");
  list.pop();

  // modify clone
  clone.push("foobar");
  assert.is(clone.length, list.length + 1, "original did not get larger");
  assert.not(list.tail === clone.tail, "original did not change");
});

test.run();
