async function requestQueue(requests, concurrency = 3) {
  const queue = [...requests];
  const result = [];

  while (queue.length) {
    const batch = queue.splice(0, concurrency);

    try {
      const res = await Promise.all(batch.map((req) => req()));
      result.push(res);
    } catch (error) {
      throw new Error("Could not processs request.");
    }
  }

  return result.flat();
}

const lazyPromises = [
  () =>
    fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
      res.json(),
    ),
  () =>
    fetch("https://jsonplaceholder.typicode.com/todos/2").then((res) =>
      res.json(),
    ),
  () =>
    fetch("https://jsonplaceholder.typicode.com/todos/3").then((res) =>
      res.json(),
    ),
  () =>
    fetch("https://jsonplaceholder.typicode.com/todos/4").then((res) =>
      res.json(),
    ),
  () =>
    fetch("https://jsonplaceholder.typicode.com/todos/5").then((res) =>
      res.json(),
    ),
  () =>
    fetch("https://jsonplaceholder.typicode.com/todos/6").then((res) =>
      res.json(),
    ),
  () =>
    fetch("https://jsonplaceholder.typicode.com/todos/7").then((res) =>
      res.json(),
    ),
];

const requests = await requestQueue(lazyPromises, 1);

const results = await Promise.all(requests);

console.log(JSON.stringify(results));
