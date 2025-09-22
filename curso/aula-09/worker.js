// Web Worker para tarefas pesadas
self.addEventListener("message", function (e) {
  const { type, data } = e.data;

  switch (type) {
    case "fibonacci":
      const result = calculateFibonacci(data.n);
      self.postMessage({
        type: "fibonacci-result",
        result: result,
        workerId: data.workerId || "worker",
      });
      break;

    case "prime-numbers":
      const primes = findPrimeNumbers(data.limit);
      self.postMessage({
        type: "prime-result",
        result: primes,
        workerId: data.workerId || "worker",
      });
      break;

    case "heavy-calculation":
      performHeavyCalculation(data.iterations, data.workerId);
      break;

    default:
      self.postMessage({
        type: "error",
        message: "Tipo de tarefa desconhecido",
      });
  }
});

// Função para calcular Fibonacci
function calculateFibonacci(n) {
  if (n <= 1) return n;

  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;

    // Reportar progresso
    if (i % 1000 === 0) {
      self.postMessage({
        type: "progress",
        progress: (i / n) * 100,
      });
    }
  }

  return b;
}

// Função para encontrar números primos
function findPrimeNumbers(limit) {
  const primes = [];

  for (let num = 2; num <= limit; num++) {
    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(num);
    }

    // Reportar progresso
    if (num % 100 === 0) {
      self.postMessage({
        type: "progress",
        progress: (num / limit) * 100,
      });
    }
  }

  return primes;
}

// Função para cálculo pesado com progresso
function performHeavyCalculation(iterations, workerId) {
  let result = 0;

  for (let i = 0; i < iterations; i++) {
    // Simulação de cálculo pesado
    result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);

    // Reportar progresso a cada 10%
    if (i % Math.floor(iterations / 10) === 0) {
      self.postMessage({
        type: "progress",
        progress: (i / iterations) * 100,
        workerId: workerId,
      });
    }
  }

  self.postMessage({
    type: "calculation-complete",
    result: result,
    workerId: workerId,
  });
}
