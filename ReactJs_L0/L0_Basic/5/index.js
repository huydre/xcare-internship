// ==========================================
// 1. VAR, LET, CONST
// ==========================================

console.log('\n=== 1. VAR, LET, CONST ===\n');

// VAR - function scope, có thể redeclare, có thể reassign
console.log('--- VAR ---');
var x = 10;
console.log('x ban đầu:', x);
var x = 20; // có thể khai báo lại
console.log('x sau khi khai báo lại:', x);

if (true) {
    var y = 30;
}
console.log('y bên ngoài block:', y); // var không có block scope

// LET - block scope, không thể redeclare, có thể reassign
console.log('\n--- LET ---');
let a = 100;
console.log('a ban đầu:', a);
a = 200; // có thể gán lại giá trị
console.log('a sau khi gán lại:', a);

if (true) {
    let b = 300;
    console.log('b bên trong block:', b);
}
// console.log(b); // Error: b is not defined (block scope)

// CONST - block scope, không thể redeclare, không thể reassign
console.log('\n--- CONST ---');
const PI = 3.14;
console.log('PI:', PI);
// PI = 3.15; // Error: Assignment to constant variable

// Tuy nhiên, với object/array, có thể thay đổi properties
const person = { name: 'John', age: 25 };
console.log('person ban đầu:', person);
person.age = 26; // OK
console.log('person sau khi thay đổi age:', person);

// ==========================================
// 2. ARROW FUNCTION
// ==========================================

console.log('\n=== 2. ARROW FUNCTION ===\n');

// Function thông thường
function sum1(a, b) {
    return a + b;
}
console.log('Function thông thường - sum1(5, 3):', sum1(5, 3));

// Arrow function cơ bản
const sum2 = (a, b) => {
    return a + b;
};
console.log('Arrow function - sum2(5, 3):', sum2(5, 3));

// Arrow function rút gọn (implicit return)
const sum3 = (a, b) => a + b;
console.log('Arrow function rút gọn - sum3(5, 3):', sum3(5, 3));

// Arrow function với 1 tham số
const square = n => n * n;
console.log('square(4):', square(4));

// Arrow function không có tham số
const greet = () => 'Hello!';
console.log('greet():', greet());

// Arrow function return object
const createPerson = (name, age) => ({ name, age });
console.log('createPerson("Alice", 30):', createPerson('Alice', 30));

// ==========================================
// 3. DESTRUCTURING OBJECT
// ==========================================

console.log('\n=== 3. DESTRUCTURING OBJECT ===\n');

// Destructuring object cơ bản
const user = {
    username: 'john_doe',
    email: 'john@example.com',
    age: 28,
    address: {
        city: 'Hanoi',
        country: 'Vietnam'
    }
};

console.log('Object gốc:', user);

const { username, email, age } = user;
console.log('\nSau khi destructuring:');
console.log('username:', username);
console.log('email:', email);
console.log('age:', age);

// Đổi tên biến
const { username: userName, email: userEmail } = user;
console.log('\nĐổi tên biến:');
console.log('userName:', userName);
console.log('userEmail:', userEmail);

// Giá trị mặc định
const { phone = 'N/A', country = 'Unknown' } = user;
console.log('\nGiá trị mặc định:');
console.log('phone:', phone);
console.log('country:', country);

// Nested destructuring
const { address: { city, country: userCountry } } = user;
console.log('\nNested destructuring:');
console.log('city:', city);
console.log('userCountry:', userCountry);

// Destructuring trong function parameter
const printUser = ({ username, age }) => {
    console.log(`\nUser: ${username}, Age: ${age}`);
};
printUser(user);

// ==========================================
// 4. PROMISE
// ==========================================

console.log('\n=== 4. PROMISE ===\n');

// Tạo Promise đơn giản
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        if (success) {
            resolve('Promise thành công!');
        } else {
            reject('Promise thất bại!');
        }
    }, 1000);
});

console.log('Đang chờ Promise...');

myPromise
    .then(result => {
        console.log('Result:', result);
    })
    .catch(error => {
        console.log('Error:', error);
    });

// Promise với fetch data
const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: `User ${userId}`,
                    email: `user${userId}@example.com`
                });
            } else {
                reject('Invalid user ID');
            }
        }, 1500);
    });
};

console.log('\nFetching user data...');
fetchUserData(1)
    .then(userData => {
        console.log('User data:', userData);
    })
    .catch(error => {
        console.log('Error:', error);
    });

// Promise.all - chạy nhiều Promise cùng lúc
const promise1 = Promise.resolve('Promise 1 resolved');
const promise2 = Promise.resolve('Promise 2 resolved');
const promise3 = Promise.resolve('Promise 3 resolved');

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log('\nPromise.all results:', results);
    });

// ==========================================
// 5. ASYNC/AWAIT
// ==========================================

console.log('\n=== 5. ASYNC/AWAIT ===\n');

// Async function cơ bản
async function asyncExample() {
    console.log('Bắt đầu async function');
    
    // Await một Promise
    const result = await new Promise(resolve => {
        setTimeout(() => resolve('Async result after 2 seconds'), 2000);
    });
    
    console.log(result);
    return 'Done!';
}

asyncExample().then(finalResult => {
    console.log('Final:', finalResult);
});

// Async/await với error handling
async function fetchData(id) {
    try {
        console.log(`\nFetching data for ID: ${id}...`);
        const data = await fetchUserData(id);
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.log('Caught error:', error);
    }
}

// Gọi sau 3 giây để demo rõ hơn
setTimeout(() => {
    fetchData(2);
}, 3000);

// Multiple await
async function processMultiple() {
    console.log('\n--- Multiple Await ---');
    
    const user1 = await fetchUserData(10);
    console.log('User 1:', user1);
    
    const user2 = await fetchUserData(20);
    console.log('User 2:', user2);
    
    console.log('All users processed!');
}

setTimeout(() => {
    processMultiple();
}, 5000);

// ==========================================
// 6. GENERATOR FUNCTION
// ==========================================

console.log('\n=== 6. GENERATOR FUNCTION ===\n');

// Generator function cơ bản
function* numberGenerator() {
    console.log('Generator bắt đầu');
    yield 1;
    console.log('Sau yield 1');
    yield 2;
    console.log('Sau yield 2');
    yield 3;
    console.log('Generator kết thúc');
}

const gen = numberGenerator();
console.log('gen.next():', gen.next()); // { value: 1, done: false }
console.log('gen.next():', gen.next()); // { value: 2, done: false }
console.log('gen.next():', gen.next()); // { value: 3, done: false }
console.log('gen.next():', gen.next()); // { value: undefined, done: true }

// Generator với vòng lặp
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();
console.log('\nAuto ID generator:');
console.log('ID 1:', idGen.next().value);
console.log('ID 2:', idGen.next().value);
console.log('ID 3:', idGen.next().value);

// Generator với parameter
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log('\nFibonacci sequence:');
console.log('Fib 1:', fib.next().value);
console.log('Fib 2:', fib.next().value);
console.log('Fib 3:', fib.next().value);
console.log('Fib 4:', fib.next().value);
console.log('Fib 5:', fib.next().value);

// Sử dụng for...of với generator
function* rangeGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

console.log('\nUsing for...of with generator:');
for (let num of rangeGenerator(1, 5)) {
    console.log('Number:', num);
}

console.log('\n=== KẾT THÚC ===\n');
