import * as readline from 'readline';

import { AppDataSource } from './data-source';
import { Person } from './person.entity';
import { PersonService } from './person.service';

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const savePerson = async (
  rl: readline.Interface,
  personService: PersonService
) => {
  // read input from terminal or console. use async and await to wait for the input
  const name = await new Promise<string>((resolve) => {
    const prompt = 'Enter the name of the person:';
    rl.question(prompt, (answer: string | PromiseLike<string>) => {
      resolve(answer);
    });
  });

  const email = await new Promise<string>((resolve) => {
    rl.question(
      'Enter the email of the person:',
      (answer: string | PromiseLike<string>) => {
        resolve(answer);
      }
    );
  });

  const phone = await new Promise<string>((resolve) => {
    rl.question(
      'Enter the phone of the person:',
      (answer: string | PromiseLike<string>) => {
        resolve(answer);
      }
    );
  });

  const dateOfBirth = await new Promise<Date>((resolve) => {
    rl.question(
      'Enter the date of birth of the person (YYYY-MM-DD):',
      (answer: string | number | Date) => {
        resolve(new Date(answer));
      }
    );
  });

  // create a new person object using the input
  const person = new Person(name, email, phone, dateOfBirth);

  // call the save method of the person service and pass the person object
  const newPerson = await personService.save(person);
  console.log('New person created successfully:');
  console.log(newPerson);
};

// write console statements to take input for the person (name, email, phone, dateOfBirth) and prepare the object
// then call the save method of the person service and pass the person object to it
const run = async () => {
  await AppDataSource.initialize();

  const personService = new PersonService();
  console.log(
    'Welcome to the CRUD application. Pick an option to perform the operation:'
  );

  // 1 for save, 2 for search
  const option = await new Promise<string>((resolve) => {
    rl.question('1. Save\n2. Search\nEnter the option:', (answer) => {
      resolve(answer);
    });
  });

  if (option === '1') {
    await savePerson(rl, personService);
    return;
  }

  // search keyword input

  const keyword = await new Promise<string>((resolve) => {
    rl.question('Enter the keyword to search:', (answer) => {
      resolve(answer);
    });
  });

  const persons = await personService.search(keyword);
  console.log('Search results: Found ' + persons.length + ' persons');
  persons.forEach((person) => {
    console.log(
      `Name: ${person.name}, Email: ${person.email}, Phone: ${person.phone}`
    );
  });

  // exit the application
  rl.close();
};

run();
