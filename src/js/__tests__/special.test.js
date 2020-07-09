import getSpecials from '../special';

describe('Начинаем тестирование функции getSpecials()', () => {
  describe('Тестируем проброс исключений:', () => {
    test('Должен выбросить исключение на вызов без аргументов', () => {
      expect(() => getSpecials()).toThrow('Персонаж не передан!');
    });

    test.each([
      ['', 'Передан неправильный формат!'],
      [123, 'Передан неправильный формат!'],
      ['1', 'Передан неправильный формат!'],
      [[], 'Передан неправильный формат!'],
      [{}, 'Передан пустой объект!'],
    ])(
      ('Должен выбросить соответствующее исключения'),
      (character, expected) => {
        expect(() => getSpecials(character)).toThrow(expected);
      },
    );
  });

  describe('Тестируем наличие спецатак:', () => {
    test('Должен выбросить массив с сообщением при отсутствиии поля special', () => {
      const character = { name: '123' };

      expect(getSpecials(character)).toEqual(['Специальные атаки отсутствуют!']);
    });

    test('Должен выбросить массив с сообщением при gecnjv массиве в поле special', () => {
      const character = { name: '123', special: [] };

      expect(getSpecials(character)).toEqual(['Специальные атаки отсутствуют!']);
    });
  });

  describe('Тестируем полученный список спецатак:', () => {
    test('Должны получить массив со спецатаками', () => {
      const character = {
        name: 'Лучник',
        special: [
          {
            id: 8,
            name: 'Двойной выстрел',
            icon: 'http://...',
            description: 'Двойной выстрел наносит двойной урон',
          },
        ],
      };

      const expected = [{
        id: 8,
        name: 'Двойной выстрел',
        icon: 'http://...',
        description: 'Двойной выстрел наносит двойной урон',
      }];

      expect(getSpecials(character)).toEqual(expected);
    });

    test('В итоговом массиве дефолтное значение description', () => {
      const character = {
        name: 'Лучник',
        special: [
          {
            id: 9,
            name: 'Нокаутирующий удар',
            icon: 'http://...',
          },
        ],
      };

      const expected = [{
        id: 9,
        name: 'Нокаутирующий удар',
        icon: 'http://...',
        description: 'Описание недоступно',
      }];

      expect(getSpecials(character)).toEqual(expected);
    });
  });
});
