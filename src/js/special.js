export default function getSpecials({ special } = {}) {
  if (arguments.length === 0) {
    throw new Error('Персонаж не передан!');
  }

  // eslint-disable-next-line prefer-rest-params
  if (arguments[0].constructor.name !== 'Object') {
    throw new Error('Передан неправильный формат!');
  }

  // eslint-disable-next-line prefer-rest-params
  if (Object.keys(arguments[0]).length === 0) {
    throw new Error('Передан пустой объект!');
  }

  const specialAttacks = [];

  if (special && special.length !== 0) {
    for (const {
      id, name, icon, description = 'Описание недоступно',
    } of special) {
      specialAttacks.push({
        id, name, icon, description,
      });
    }
  } else {
    specialAttacks.push('Специальные атаки отсутствуют!');
  }

  return specialAttacks;
}
