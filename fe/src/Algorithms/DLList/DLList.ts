type Node<T> = {
  data: T;
  next: Node<T> | null;
  prev: Node<T> | null;
}


class DLList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private length: number = 0;

  private newNode(data: T): Node<T> {
    return {
      data,
      next: null,
      prev: null,
    }
  }

  public get size() {
    return this.length;
  }

  public clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public pushBack(data: T) {
    const node = this.newNode(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
  }

  public pushFront(data: T) {
    const node = this.newNode(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }

  public popBack() {
    if (this.tail === null) {
      return null;
    }
    const data = this.tail.data;
    if (this.tail.prev === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length--;
    return data;
  }

  public popFront() {
    if (this.head === null) {
      return null;
    }
    const data = this.head.data;
    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.length--;
    return data;
  }

  public remove(data: T) {
    let current = this.head;
    while (current !== null) {
      if (current.data === data) {
        if (current.prev === null) {
          this.head = current.next;
          if (this.head !== null) {
            this.head.prev = null;
          }
        } else {
          current.prev.next = current.next;
        }
        if (current.next === null) {
          this.tail = current.prev;
          if (this.tail !== null) {
            this.tail.next = null;
          }
        } else {
          current.next.prev = current.prev;
        }
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  public map<U>(callback: (data: T) => U) {
    let current = this.head;
    const result = new DLList<U>();
    while (current !== null) {
      result.pushBack(callback(current.data));
      current = current.next;
    }
    return result;
  }

  public forEach(callback: (data: T) => void) {
    let current = this.head;
    while (current !== null) {
      callback(current.data);
      current = current.next;
    }
  }

  public where(callback: (data: T) => boolean) {
    let current = this.head;
    const result = new DLList<T>();
    while (current !== null) {
      if (callback(current.data)) {
        result.pushBack(current.data);
      }
      current = current.next;
    }
    return result;
  }

  public first(callback: (data: T) => boolean) {
    let current = this.head;
    while (current !== null) {
      if (callback(current.data)) {
        return current.data;
      }
      current = current.next;
    }
    return null;
  }

  public min(callback: (data: T) => number) {
    let current = this.head;
    let min = Number.MAX_VALUE;
    let result: T | null = null;
    while (current !== null) {
      const value = callback(current.data);
      if (value < min) {
        min = value;
        result = current.data;
      }
      current = current.next;
    }
    return result;
  }

  public filter(callback: (data: T) => boolean) {
    let current = this.head;
    const result = new DLList<T>();
    while (current !== null) {
      if (callback(current.data)) {
        result.pushBack(current.data);
      }
      current = current.next;
    }
    return result;
  }

  public toList() {
    const result: T[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  public get(index: number) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.data;
  }
}

export default DLList;