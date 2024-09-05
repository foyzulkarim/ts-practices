import * as readline from 'readline';

import { AppDataSource } from './data-source';
import { Person } from './person.entity';
import { PersonService, PersonData } from './person.service';

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let personService: PersonService;

const askQuestion = async <T = string>(
  prompt: string,
  parser?: (input: string) => T
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    if (parser === undefined && typeof {} as T !== 'string') {
      reject(new Error('Parser must be provided for non-string types'));
      return;
    }

    const finalParser = parser ?? ((input: string) => input as unknown as T);

    rl.question(prompt, (answer: string) => {
      resolve(finalParser(answer));
    });
  });
};


const savePerson = async () => {
  const name = await askQuestion('Enter the name of the person: ');
  const email = await askQuestion('Enter the email of the person: ');
  const phone = await askQuestion('Enter the phone of the person: ');
  const dateOfBirth = await askQuestion<Date>('Enter the date of birth of the person (YYYY-MM-DD): ', (input) => new Date(input));

  // create a new person object using the input
  const person = new Person(name, email, phone, dateOfBirth);

  // call the save method of the person service and pass the person object
  const newPerson = await personService.save(person);
  console.log('New person created successfully:');
  console.log(newPerson);
};

const getPersonById = async () => {
  const id = await askQuestion<number>('Enter the id of the person: ', (input) => parseInt(input));

  const person = await personService.findOne(id);
  if (person) {
    console.log('Person found:');
    console.log(person);
  } else {
    console.log('Person not found');
  }
};

const searchPeople = async () => {
  const keyword = await askQuestion('Enter the keyword to search: ');

  const people = await personService.search(keyword);
  if (people.length) {
    console.log('People found:');
    console.log(people);
  } else {
    console.log('No people found');
  }
};

const updatePerson = async () => {
  const id = await askQuestion<number>('Enter the id of the person to update: ', (input) => parseInt(input));

  const person = await personService.findOne(id);
  if (!person) {
    console.log('Person not found');

    return;
  }

  console.log('Person current details:', {
    name: person.name,
    email: person.email,
    phone: person.phone,
    dateOfBirth: person.dateOfBirth,
  });

  console.log(
    'You can add new values and press enter or simply press enter to keep the old value'
  );

  const name = await askQuestion('Enter the name of the person to update: ');
  const email = await askQuestion('Enter the email of the person: ');
  const phone = await askQuestion('Enter the phone of the person: ');
const dateOfBirth = await askQuestion<Date>('Enter the date of birth of the person (YYYY-MM-DD): ', (input) => new Date(input));

  const updateData: PersonData = {
    name,
    email,
    phone,
    dateOfBirth,
  };

  const updatedPerson = await personService.update(id, updateData);

  if (updatedPerson) {
    console.log('Person updated successfully:');
    console.log(updatedPerson);
  } else {
    console.log('Person not found');
  }
};

const deletePerson = async () => {
  const idStr = await askQuestion('Enter the id of the person to delete: ');
  const id = parseInt(idStr);

  const isSuccess: boolean = await personService.delete(id);
  if (isSuccess) {
    console.log('Person deleted successfully');
  } else {
    console.log('Person not found');
  }
};

// write console statements to take input for the person (name, email, phone, dateOfBirth) and prepare the object
// then call the save method of the person service and pass the person object to it
const run = async () => {
  console.log('Pick an option to perform the operation:');

  // 1 for save, 2 for get by id, 3 for search, 4 for update, 5 for delete
  const msg = `1. Save a person \n2. Get a person by id \n3. Search people \n4. Update a person \n5. Delete a person\n`;
  const option = await askQuestion(msg);

  if (option === '1') {
    await savePerson();
    return;
  }

  if (option === '2') {
    await getPersonById();
    return;
  }

  // search keyword input
  if (option === '3') {
    await searchPeople();
    return;
  }

  // update person input
  if (option === '4') {
    await updatePerson();
    return;
  }

  // delete person input
  if (option === '5') {
    await deletePerson();
    return;
  }
};

(async () => {
  console.log('Welcome to the CRUD application.');
  await AppDataSource.initialize();
  personService = new PersonService();
  // keep running the application
  while (true) {
    await run();

    // ask question to continue or not
    // if no, break the loop
    const answer = await askQuestion('Do you want to continue? (yes/no): ');

    if (answer.toLowerCase() === 'no' || answer.toLowerCase() === 'n') {
      rl.close();
      break;
    }
  }
})();
