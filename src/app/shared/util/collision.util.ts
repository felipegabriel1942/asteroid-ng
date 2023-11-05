import { GameObject } from '../model/game-object';

export class CollisionUtil {
  public static isColliding(obj1: GameObject, obj2: GameObject): boolean {
    return (
      obj1.x > obj2.x &&
      obj1.x < obj2.x + obj2.width &&
      obj1.y > obj2.y &&
      obj1.y < obj2.y + obj2.height
    );
  }
}
