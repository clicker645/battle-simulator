export abstract class Creator<T> {
  protected item: T;

  protected constructor(item: T) {
    this.item = item;
  }

  public abstract factory(): T;
}
