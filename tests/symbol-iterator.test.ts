import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";

test("it iterates over basic list", () => {
  const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let i = 1;
  for (const val of list) {
    assert.is(val, i);
    i++;
  }
});

test("it continues to iterate after splice", () => {
  const subjectArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const subjectList = new List(subjectArray);
  const outputArray = new Array<number>();
  const outputList = new Array<number>();

  // array
  for (const v of subjectArray) {
    if (v == 4) subjectArray.splice(3, 3);
    outputArray.push(v);
  }

  // list
  for (const v of subjectList) {
    if (v == 4) subjectList.remove(3, 3);
    outputList.push(v);
  }

  try {
    assert.equal(outputList, outputArray);
  } catch (e) {
    console.log({
      subjectArray: subjectArray.join(", "),
      subjectList: subjectList.join(", "),
      outputArray: outputArray.join(", "),
      outputList: outputList.join(", ")
    });
    throw e;
  }
});

test.run();
