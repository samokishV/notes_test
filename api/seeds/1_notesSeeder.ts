const faker = require('faker');

const createFakeText = () => ({
  text: faker.hacker.phrase(),
});

exports.seed = async function (knex: any, Promise: any) {
  let fakeTexts = [];
  let fakeText;
  const desiredFakeText = 100;
  for (let i = 0; i < desiredFakeText; i++) {
    fakeText = createFakeText();
    fakeTexts.push(fakeText);
  }

  await knex('notes')
    .insert(fakeTexts);
};
