function divides(n, x) {
	return n % x === 0
}

// order of growth: sqrt(n)
// function findDivisor(x, n) {
// 	if ((x * x) > n) {
// 		return n
// 	} else if (divides(n, x)) {
// 		return x
// 	} else {
// 		return findDivisor(x + 1, n)
// 	}
// }
// order of growth: (n)
function findDivisor(x, n) {
	if (x === n) {
		return n
	} else if (divides(n, x)) {
		return x
	} else {
		return findDivisor(x + 1, n)
	}
}

function smallestDivisor(n) {
	return findDivisor(2, n)
}

function prime(n) {
	return n === smallestDivisor(n)
}

console.log(
	smallestDivisor(199),
	smallestDivisor(1999),
	smallestDivisor(19999)
)


// the language has exponentiation operator **
function isPrime(a, n) {
	return a ** n % n === a
}
// if it didn't...
function exp(base, n) {
	// THIS IS LINEAR ITERATIVE, THINK: STATE
	function expIter(base, product, n) {
		if (n === 0) return product;
		else if (n % 2 === 0) {
			return expIter(base * base, product, n/2)		
		} else {
			return expIter(base, base * product, n - 1)		
		}
	}	
	return expIter(base, 1, n)
}


// exp mod is for fermat's test
// this function calculates this: a ** n % n
// base = a
// m    = n untouched
// exp  = n manipulated to have faster exp calculation
function expmod(base, exp, m) { // <-- log(n) recursive procedure
	// console.log(base, exp, m)
	if (exp === 0) {
		return 1
	} else if (exp % 2 === 0) {
		let e = expmod(base, exp/2, m)
		return (e * e) % m // successive squaring
	} else {
		let e = expmod(base, exp - 1, m)
		return (base * e) % m
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function fermatTest(n) {
	function tryIt(a) {
		const r = expmod(a, n, n)
		return  r === a
	}
	const random = 1 + getRandomInt(n - 1) // so I can get a number of the range 1-->n-1
	// console.log(n, 'random:', random)
	return tryIt(random)
}

function fastPrime(n, times) {
	if (times === 0) {
		return true
	} else if (fermatTest(n)) {
		return fastPrime(n, times - 1)
	} else {
		return false
	}
}
// console.log(expmod(2, 3, 3) == 2) // means 3 is prime, a = 2
// console.log(expmod(5, 6, 6) == 5) // means 6 is NOT prime
// console.log(expmod(5, 7, 7) == 5) // means 7 is prime
// console.log(expmod(1, 4, 4), fermatTest(4)) //  FAILS FERMAT TEST
// console.log(expmod(4, 6, 6), fermatTest(6)) // 

// for (let x = 1; x < 30; x = x + 1) {
// 	const prime = fastPrime(x, 10)
// 	prime && console.log(x, prime)
// }

// for (let x = 2; x < 30; x = x + 1) {
// 	console.log(x, prime(x), primeEnhanced(x))
// }

console.log(fastPrime(199, 30))
console.log(fastPrime(1999, 30))
console.log(fastPrime(19999, 30))


