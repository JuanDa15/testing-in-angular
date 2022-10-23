import { Person } from "./person.model";

describe('Tests for Person model', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('jhon','ramirez',21,70,1.80);
  });

  it('should have all the attributes', () => {
    expect(person.name).toEqual('jhon');
    expect(person.lastName).toEqual('ramirez');
    expect(person.age).toEqual(21);
    expect(person.weight).toEqual(70);
    expect(person.height).toEqual(1.80);
  });

  describe('test for calcIMC', () => {
    it("should return a string: 'down'", () => {
      // Arrange
      person.weight = 50;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toEqual('down');
    });
    it("should return a string: 'normal'", () => {
      // Arrange
      person.weight = 70;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toEqual('normal');
    });
    it("should return a string: 'overweight'", () => {
      // Arrange
      person.weight = 78;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toEqual('overweight');
    });
    it("should return a string: 'overweight level 1'", () => {
      // Arrange
      person.weight = 81;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toEqual('overweight level 1');
    });
    it("should return a string: 'overweight level 2'", () => {
      // Arrange
      person.weight = 90;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toEqual('overweight level 2');
    });
    it("should return a string: 'overweight level 3'", () => {
      // Arrange
      person.weight = 120;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toEqual('overweight level 3');
    });
    it("should return a string: 'not found'", () => {
      // Arrange
      person.weight = NaN;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toEqual('not found');
    });
  });
});
