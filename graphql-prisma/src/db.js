const users = [
  {
    id: "1",
    name: "Felipe",
    email: "felipe@exemplo.com",
    age: 27,
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@exemplo.com",
    age: 32,
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@exemplo.com",
    age: 32,
  },
  {
    id: "4",
    name: "Andrew",
    email: "andrew@exemplo.com",
    age: 23,
  },
];

const posts = [
  {
    id: "101",
    title: "Happy New Year",
    body: "A great new year awaits for us",
    published: true,
    author: "1",
  },
  {
    id: "102",
    title: "Christimas comes",
    body: "I love christmas lights",
    published: true,
    author: "1",
  },
  {
    id: "103",
    title: "The summer has come",
    body: "I love swimming in a hot summer day",
    published: true,
    author: "2",
  },
  {
    id: "104",
    title: "I loves holidays",
    body: "Break up from the rotine",
    published: false,
    author: "3",
  },
];

const comments = [
  {
    id: "001",
    text: "Yeah! I'm exciting for...",
    author: "1",
    post: "101",
  },
  {
    id: "002",
    text: "the fireworks in the beach",
    author: "1",
    post: "102",
  },
  {
    id: "003",
    text: "Is the best thing ever",
    author: "2",
    post: "103",
  },
  {
    id: "004",
    text: "And relax...",
    author: "3",
    post: "104",
  },
  {
    id: "005",
    text: "Deleted comment test",
    author: "2",
    post: "101",
  },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default}