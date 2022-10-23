export class Person {

  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number
  ){}

  calcIMC(): string {
    const IMC = Math.round(this.weight / (this.height**2));

    if (IMC >= 40) {
      return  'overweight level 3';
    }
    else if (IMC >= 30) {
      return 'overweight level 2';
    }
    else if (IMC >= 27) {
      return 'overweight level 1';
    }
    else if (IMC >= 25) {
      return 'overweight';
    }
    else if (IMC >= 18) {
      return 'normal';
    }
    else if (IMC >= 0) {
      return 'down';
    }
    else{
      return 'not found'
    }
  }
}
