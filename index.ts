const accounts: AccountItems[] = require('./accounts.json');

interface AccountItems {
  application: string;
  emails: string[];
  name: string;
}

interface ReturnAccountItems {
  applications: string[];
  emails: string[];
  name: string;
}

interface Email {
  [index: string]: number[];
}
interface Stored {
  [index: string]: boolean;
}

const parseAccount = (data: AccountItems[]) => {
  const newAccountArray: ReturnAccountItems[] = [];
  const emailMap: Email = {};
  const stored: Stored = {};

  // Loops through each array item to populate return array
  data.forEach((account: AccountItems, index: number) => {
    newAccountArray[index] = {
      applications: [account.application],
      emails: [...account.emails],
      name: account.name,
    };
    // record which emails are unique and which are not in a dictionary
    account.emails.forEach((email: string) => {
      if (!emailMap[email]) {
        emailMap[email] = [index];
      } else {
        emailMap[email].push(index);
      }
    });
  });

  // Loops through email dictionary to merge data onto output array
  for (const email in emailMap) {
    const apps: string[] = [];
    const ems: string[] = [];
    emailMap[email].forEach((storedIndex: number, index: number) => {
      apps.push(...newAccountArray[storedIndex].applications);
      ems.push(...newAccountArray[storedIndex].emails);

      // If end of array clean up duplicates and store last element as true to clean up later
      if (index === emailMap[email].length - 1) {
        const newEms = ems.filter((c, index) => ems.indexOf(c) === index);
        const newApp = apps.filter((c, index) => apps.indexOf(c) === index);
        if (stored[storedIndex] !== false) stored[storedIndex] = true;

        emailMap[email].forEach((storedIndex: number) => {
          newAccountArray[storedIndex] = {
            applications: newApp.sort(),
            emails: newEms.sort(),
            name: data[storedIndex].name,
          };
        });
      } else {
        stored[storedIndex] = false;
      }
    });
  }

  // Reverse stored elements to delete items from back so order does not mess up
  const reverseStored = Object.keys(stored).reverse();

  reverseStored.forEach((index) => {
    if (!stored[index]) {
      newAccountArray.splice(Number(index), 1);
    }
  });

  console.log(newAccountArray);
};

parseAccount(accounts);
