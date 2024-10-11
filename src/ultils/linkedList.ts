class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null = null;
    tail: ListNode<T> | null = null;

    constructor(head: T[]);
    constructor(head: ListNode<T>);
    constructor(head: T) {
        if (Array.isArray(head)) {
            this.head = new ListNode(head[0]);
            this.tail = this.head;
            this.fromArray(head.slice(1));
            this.tail.next = this.head;
        } else if (head instanceof ListNode) {
            this.head = head;
            this.tail = head;
            if (this.tail) {
                this.tail.next = this.head;
            }
        } else {
            this.head = new ListNode(head);
            this.tail = this.head;
            this.tail.next = this.head;
        }
    }

    add(value: T) {
        const newNode = new ListNode(value, this.head);
        this.tail!.next = newNode;
        this.tail = newNode;
    }

    fromArray(array: T[]) {
        array.forEach(value => this.add(value));
    }
}

export default LinkedList;
