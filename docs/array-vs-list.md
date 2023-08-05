# Array vs List

Linked Lists excel at fast adding and removing at either end. This makes them the perfect choice for queues and stacks, where Arrays may be slower due to needing to re-index every element. In a linked List every element points to the next element. Foxkit List is a doubly-linked list, so every element also links to the previous element. This allows for fast adding of elements at any point by merely updating these pointers.

The disadvantage of this datastructure lies in the same difference: Arrays are perfect for reading values at any point, while a linked list needs to traverse from either the first or last element to the targeted element.
