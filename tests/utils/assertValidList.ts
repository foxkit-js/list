/* eslint-disable @typescript-eslint/dot-notation */
import * as assert from "uvu/assert";
import type { List } from "../../src";

export function assertValidList<T>(list: List<T>) {
  switch (list.length) {
    case 0: {
      assert.is(list.head, undefined, "no head value for empty list");
      assert.is(list.tail, undefined, "no tail value for empty list");
      assert.not(list["getNode"](0), "no node returned for empty list");
      return;
    }

    case 1: {
      const head = list["getNode"](0);
      assert.ok(head, "find head node of list");
      assert.not(head.next, "head node has no next node for length of 1");
      assert.not(head.prev, "head node has no prev node");

      assert.is(
        head.value,
        list.head,
        "head node has the same value as list.head"
      );
      assert.is(
        head.value,
        list.tail,
        "head node has the same value as list.tail"
      );

      const next = list["getNode"](1);
      assert.not(
        next,
        "no node found at index 1 for lenght of 1 (should only have index of 0"
      );
      return;
    }

    default: {
      // test head to tail
      const head = list["getNode"](0);
      assert.ok(head, "find head node of list");
      assert.not(head.prev, "head node has no prev node");
      assert.is(
        head.value,
        list.head,
        "head node has the same value as list.head"
      );

      let prev = head;
      let idx = 1;
      while (idx < list.length) {
        // get next node
        const node = prev.next;
        assert.ok(node, `finds node index ${idx}`);
        // check that it's connected backwards
        assert.ok(node.prev === prev, "node is connected backwards to prev");
        // iterate
        prev = node;
        idx++;
      }

      // check that final node has no next,
      // gets returned by list.getNode and
      // has the same value as list.tail
      assert.not(prev.next, "final node has no next linked node");
      assert.ok(
        prev === list["getNode"](idx - 1),
        "can find final node by index"
      );
      assert.is(
        prev.value,
        list.tail,
        "final node value matches list.tail value"
      );
    }
  }
}
