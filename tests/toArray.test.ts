import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can convert List to Array", () => {
  const list = new List();

  assert.equal(list.toArray(), [], "return empty array for empty list");

  list.insertMany(0, lorem);
  assert.equal(list.toArray(), lorem, "return equal array to input");
});

test.run();
