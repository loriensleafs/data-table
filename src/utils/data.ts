import { faker } from "@faker-js/faker";

//
// ─── Types ──────────────────────────────────────────────────────────────────────
//

export type Person = {
  age: number;
  firstName: string;
  lastName: string;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
  visits: number;
};

//
// ─── Functions ──────────────────────────────────────────────────────────────────
//

const range = (len: number) => {
  const arr: number[] = [];

  for (let i = 0; i < len; i++) {
    arr.push(i);
  }

  return arr;
};

const makePerson = (): Person => ({
  age: faker.number.int(40),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  progress: faker.number.int(100),
  status: faker.helpers.shuffle<Person["status"]>([
    "relationship",
    "complicated",
    "single",
  ])[0]!,
  visits: faker.number.int(1000),
});

export const makeData = (...numOfItems: number[]) => {
  const makeDataItem = (item = 0): Person[] =>
    range(numOfItems[item]!).map(
      (): Person => ({
        ...makePerson(),
        subRows: numOfItems[item + 1] ? makeDataItem(item + 1) : undefined,
      }),
    );

  return makeDataItem();
};
