export class ListNode<T> {
  /**
   * Next node in the linked list
   */
  next?: ListNode<T>;
  /**
   * Previous node in the linked list
   */
  prev?: ListNode<T>;
  /**
   * Current value of this node
   */
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}
