export abstract class BaseModel<T> {
  abstract update: (data: T) => void;
}
