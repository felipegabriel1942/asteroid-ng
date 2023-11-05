export class Control {
  public right: boolean = false;
  public left: boolean = false;
  public shoot: boolean = false;

  private static instance: Control;

  private constructor() {}

  public static getInstance(): Control {
    if (!Control.instance) {
      Control.instance = new Control();
    }

    return Control.instance;
  }
}
