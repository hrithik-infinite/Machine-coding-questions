// ============================================================================
// ADVANCED JAVASCRIPT CLASSES - INTERVIEW NOTES
// ============================================================================

// ============================================================================
// 1. BASIC CLASS SYNTAX & FEATURES
// ============================================================================

console.log("=== BASIC CLASS FEATURES ===");

class Teacher {
  // Public field declaration (ES2022)
  subject = "Default Subject";

  // Private fields (ES2022)
  #privateId;
  #salary;

  // Static field
  static schoolName = "Tech Academy";

  constructor(name, subject, likes = 0) {
    this.name = name;
    this.subject = subject;
    this.likes = likes;
    this.#privateId = Math.random().toString(36).substr(2, 9);
    this.#salary = 50000;
  }

  // Instance method
  intro() {
    return `👋 Hi! I'm ${this.name}, and I teach ${this.subject}.`;
  }

  // Method with this binding consideration
  like() {
    this.likes++;
    return `👍 Liked this lecture! Current Likes: ${this.likes}`;
  }

  // Arrow function method (auto-bound)
  likeArrow = () => {
    this.likes++;
    return `👍 Arrow liked! Current Likes: ${this.likes}`;
  };

  // Private method
  #calculateBonus() {
    return this.#salary * 0.1;
  }

  // Public method accessing private members
  getPrivateInfo() {
    return {
      id: this.#privateId,
      bonus: this.#calculateBonus()
    };
  }

  // Static method
  static createGuestTeacher(name) {
    return new Teacher(name, "Guest Lecture", 0);
  }

  // Getter
  get displayName() {
    return `Prof. ${this.name}`;
  }

  // Setter with validation
  set teachingExperience(years) {
    if (years < 0) {
      throw new Error("Experience cannot be negative");
    }
    this._experience = years;
  }

  get teachingExperience() {
    return this._experience || 0;
  }
}

// Create instances
const t1 = new Teacher("Hrithik", "JavaScript");
const t2 = new Teacher("Agarwal", "TypeScript", 20);

console.log("Basic usage:");
console.log(t1.intro());
console.log(t1.like());
console.log("Display name:", t1.displayName);
console.log("Private info:", t1.getPrivateInfo());

// Static method usage
const guestTeacher = Teacher.createGuestTeacher("Guest Speaker");
console.log("Guest teacher:", guestTeacher.intro());
console.log("School name:", Teacher.schoolName);

// ============================================================================
// 2. INHERITANCE & ADVANCED PATTERNS
// ============================================================================

console.log("\n=== INHERITANCE & ADVANCED PATTERNS ===");

class YoutubeTeacher extends Teacher {
  // Private field in child class
  #analyticsData;

  constructor(name, subject, likes, subscribers) {
    super(name, subject, likes); // Must call super() first
    this.subscribers = subscribers;
    this.#analyticsData = { views: 0, engagement: 0 };
  }

  // Override parent method
  intro() {
    return `${super.intro()} I also create YouTube content with ${this.subscribers} subscribers!`;
  }

  // New method
  subscriberCount() {
    return `📊 ${this.subject} channel has ${this.subscribers} subscribers.`;
  }

  // Method using private field
  updateAnalytics(views, engagement) {
    this.#analyticsData = { views, engagement };
  }

  getAnalytics() {
    return { ...this.#analyticsData };
  }

  // Static method in child class
  static createInfluencer(name, niche) {
    return new YoutubeTeacher(name, niche, 10000, 100000);
  }

  // Getter override
  get displayName() {
    return `YouTuber ${super.displayName}`;
  }
}

const yt1 = new YoutubeTeacher("YT Hrithik", "ReactJS", 500, 10000);
console.log("YouTube teacher:", yt1.intro());
console.log("Display name override:", yt1.displayName);

// ============================================================================
// 3. MIXINS & COMPOSITION PATTERNS
// ============================================================================

console.log("\n=== MIXINS & COMPOSITION ===");

// Mixin functions
const CanPublish = {
  publish(content) {
    return `📝 Published: ${content}`;
  },

  schedule(content, date) {
    return `⏰ Scheduled "${content}" for ${date}`;
  }
};

const CanStream = {
  startStream(topic) {
    this.isStreaming = true;
    return `🔴 Live streaming: ${topic}`;
  },

  endStream() {
    this.isStreaming = false;
    return `⏹️ Stream ended`;
  }
};

// Apply mixins using Object.assign
class StreamingTeacher extends Teacher {
  constructor(name, subject) {
    super(name, subject);
    this.isStreaming = false;
  }
}

// Add mixin methods
Object.assign(StreamingTeacher.prototype, CanPublish, CanStream);

const streamTeacher = new StreamingTeacher("Stream Hrithik", "Live Coding");
console.log("Mixin usage:");
console.log(streamTeacher.publish("New Tutorial"));
console.log(streamTeacher.startStream("JavaScript Fundamentals"));
console.log("Is streaming:", streamTeacher.isStreaming);

// ============================================================================
// 4. ABSTRACT CLASSES & INTERFACES (PATTERNS)
// ============================================================================

console.log("\n=== ABSTRACT PATTERNS ===");

// Abstract base class pattern
class AbstractVehicle {
  constructor(brand) {
    if (this.constructor === AbstractVehicle) {
      throw new Error("Abstract class cannot be instantiated");
    }
    this.brand = brand;
  }

  // Abstract method (must be implemented by subclasses)
  start() {
    throw new Error("start() method must be implemented");
  }

  // Concrete method
  getBrand() {
    return this.brand;
  }
}

class Car extends AbstractVehicle {
  start() {
    return `${this.brand} car engine started 🚗`;
  }
}

class Motorcycle extends AbstractVehicle {
  start() {
    return `${this.brand} motorcycle engine started 🏍️`;
  }
}

const car = new Car("Toyota");
console.log("Abstract pattern:", car.start());

// Interface pattern using symbols
const Flyable = {
  fly: Symbol("fly"),
  land: Symbol("land")
};

class Bird {
  constructor(species) {
    this.species = species;
  }

  [Flyable.fly]() {
    return `${this.species} is flying 🕊️`;
  }

  [Flyable.land]() {
    return `${this.species} has landed`;
  }
}

const eagle = new Bird("Eagle");
console.log("Interface pattern:", eagle[Flyable.fly]());

// ============================================================================
// 5. ADVANCED STATIC FEATURES
// ============================================================================

console.log("\n=== ADVANCED STATIC FEATURES ===");

class DatabaseConnection {
  static #instance = null;
  static #connectionCount = 0;

  // Private constructor pattern (Singleton)
  constructor() {
    if (DatabaseConnection.#instance) {
      return DatabaseConnection.#instance;
    }

    this.connected = true;
    this.id = ++DatabaseConnection.#connectionCount;
    DatabaseConnection.#instance = this;
  }

  // Static factory method
  static getInstance() {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection();
    }
    return DatabaseConnection.#instance;
  }

  // Static method with private static field access
  static getConnectionCount() {
    return DatabaseConnection.#connectionCount;
  }

  // Static initialization block (ES2022)
  static {
    console.log("DatabaseConnection class initialized");
    this.maxConnections = 10;
  }
}

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log("Singleton pattern:", db1 === db2); // true
console.log("Connection count:", DatabaseConnection.getConnectionCount());

// ============================================================================
// 6. PROTOTYPE CHAIN & CLASS RELATIONSHIP
// ============================================================================

console.log("\n=== PROTOTYPE CHAIN ANALYSIS ===");

class Animal {
  speak() {
    return "Animal sound";
  }
}

class Dog extends Animal {
  speak() {
    return "Woof!";
  }
}

const dog = new Dog();

console.log("Prototype chain analysis:");
console.log("dog instanceof Dog:", dog instanceof Dog);
console.log("dog instanceof Animal:", dog instanceof Animal);
console.log("Dog.prototype.isPrototypeOf(dog):", Dog.prototype.isPrototypeOf(dog));
console.log("Animal.prototype.isPrototypeOf(dog):", Animal.prototype.isPrototypeOf(dog));

// Method resolution order
console.log("Method resolution:", dog.speak()); // "Woof!" (overridden method)
console.log("Parent method:", Animal.prototype.speak.call(dog)); // "Animal sound"

// Constructor property
console.log("Constructor:", dog.constructor === Dog);
console.log("Constructor name:", dog.constructor.name);

// ============================================================================
// 7. CLASS DECORATORS & METADATA (PROPOSAL/TYPESCRIPT)
// ============================================================================

console.log("\n=== DECORATOR PATTERNS ===");

// Decorator function pattern (manual implementation)
function logged(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

// Manual decorator application
class Calculator {
  constructor() {
    // Apply decorator manually
    const descriptor = Object.getOwnPropertyDescriptor(Calculator.prototype, "add");
    if (descriptor) {
      logged(Calculator.prototype, "add", descriptor);
      Object.defineProperty(Calculator.prototype, "add", descriptor);
    }
  }

  add(a, b) {
    return a + b;
  }
}

// ============================================================================
// 8. PERFORMANCE & MEMORY CONSIDERATIONS
// ============================================================================

console.log("\n=== PERFORMANCE CONSIDERATIONS ===");

// Method binding performance
class PerformanceTest {
  constructor(name) {
    this.name = name;

    // Pre-bind methods in constructor (memory trade-off)
    this.boundMethod = this.instanceMethod.bind(this);
  }

  // Regular method (shared on prototype)
  instanceMethod() {
    return `Hello ${this.name}`;
  }

  // Arrow function (each instance gets own copy)
  arrowMethod = () => {
    return `Arrow hello ${this.name}`;
  };
}

// Memory usage comparison
const instances = Array.from({ length: 1000 }, (_, i) => new PerformanceTest(`User${i}`));

console.log("Created 1000 instances for performance testing");

// ============================================================================
// 9. ERROR HANDLING & VALIDATION PATTERNS
// ============================================================================

console.log("\n=== ERROR HANDLING PATTERNS ===");

class ValidatedUser {
  #email;
  #age;

  constructor(email, age) {
    this.email = email; // Uses setter validation
    this.age = age; // Uses setter validation
  }

  set email(value) {
    if (!value || !value.includes("@")) {
      throw new Error("Invalid email format");
    }
    this.#email = value;
  }

  get email() {
    return this.#email;
  }

  set age(value) {
    if (typeof value !== "number" || value < 0 || value > 150) {
      throw new Error("Invalid age");
    }
    this.#age = value;
  }

  get age() {
    return this.#age;
  }

  // Method with error handling
  updateProfile(data) {
    try {
      if (data.email) this.email = data.email;
      if (data.age !== undefined) this.age = data.age;
      return { success: true, message: "Profile updated" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

try {
  const user = new ValidatedUser("test@email.com", 25);
  console.log("Valid user created:", user.email);

  const result = user.updateProfile({ age: 30 });
  console.log("Update result:", result);
} catch (error) {
  console.log("Validation error:", error.message);
}

// ============================================================================
// 10. FUNCTIONAL PROGRAMMING WITH CLASSES
// ============================================================================

console.log("\n=== FUNCTIONAL PROGRAMMING PATTERNS ===");

class FunctionalList {
  constructor(items = []) {
    this.items = [...items]; // Immutable by default
  }

  // Pure method - returns new instance
  map(fn) {
    return new FunctionalList(this.items.map(fn));
  }

  // Pure method - returns new instance
  filter(fn) {
    return new FunctionalList(this.items.filter(fn));
  }

  // Pure method - returns new instance
  concat(other) {
    return new FunctionalList([...this.items, ...other.items]);
  }

  // Terminal operation
  reduce(fn, initial) {
    return this.items.reduce(fn, initial);
  }

  // Method chaining
  chain() {
    return {
      map: (fn) => new FunctionalList(this.items.map(fn)).chain(),
      filter: (fn) => new FunctionalList(this.items.filter(fn)).chain(),
      value: () => new FunctionalList(this.items)
    };
  }

  toArray() {
    return [...this.items];
  }
}

const list = new FunctionalList([1, 2, 3, 4, 5]);
const result = list
  .map((x) => x * 2)
  .filter((x) => x > 4)
  .map((x) => x + 1);

console.log("Functional list result:", result.toArray());

// ============================================================================
// 11. COMMON INTERVIEW QUESTIONS & ANSWERS
// ============================================================================

console.log("\n=== INTERVIEW Q&A EXAMPLES ===");

// Q1: What's the difference between class and function constructor?
console.log("Q1: Class vs Function Constructor");

// Function constructor
function FunctionConstructor(name) {
  this.name = name;
}
FunctionConstructor.prototype.greet = function () {
  return `Hello ${this.name}`;
};

// Class
class ClassConstructor {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

console.log("Both create similar objects, but classes:");
console.log("- Have stricter syntax and must use 'new'");
console.log("- Support private fields and methods");
console.log("- Have better inheritance syntax");
console.log("- Are not hoisted");

// Q2: Explain method binding in classes
console.log("\nQ2: Method Binding");

class BindingExample {
  constructor(name) {
    this.name = name;
  }

  regularMethod() {
    return this.name;
  }

  arrowMethod = () => {
    return this.name;
  };
}

const bindingObj = new BindingExample("Test");
const regularFn = bindingObj.regularMethod;
const arrowFn = bindingObj.arrowMethod;

console.log("Regular method (loses context):", regularFn()); // undefined
console.log("Arrow method (keeps context):", arrowFn()); // "Test"

// ============================================================================
// COMPREHENSIVE SUMMARY FOR INTERVIEWS
// ============================================================================

const interviewSummary = {
  "Class Basics": ["constructor(), methods, getters/setters", "Public/private fields (#field)", "Static methods and fields", "Method binding (regular vs arrow)"],

  Inheritance: ["extends keyword and super()", "Method overriding", "Prototype chain understanding", "instanceof and isPrototypeOf"],

  "Advanced Patterns": ["Abstract classes (pattern)", "Mixins and composition", "Singleton pattern", "Factory methods"],

  Performance: ["Memory implications of arrow methods", "Prototype vs instance methods", "Method binding strategies", "Class vs function constructor performance"],

  "Common Pitfalls": ["Method context loss", "Private field accessibility", "Static method inheritance", "Constructor validation"]
};

console.log("\n=== INTERVIEW SUMMARY ===");
console.table(interviewSummary);

console.log(`
🎯 KEY INTERVIEW TALKING POINTS:

1. **Classes are syntactic sugar** over prototype-based inheritance
2. **Private fields (#field)** are truly private, not just convention
3. **Arrow methods** create instance properties, not prototype methods
4. **Static methods** belong to class, not instances
5. **super()** must be called first in constructor
6. **Method binding** context is lost when methods are extracted
7. **Mixins** provide multiple inheritance-like functionality
8. **Performance** considerations: prototype vs instance methods
9. **Error handling** in constructors and setters
10. **Functional patterns** can be implemented with classes

🚀 ADVANCED CONCEPTS TO MENTION:
- Private methods and static private fields
- Class decorators (proposal/TypeScript)
- Abstract class patterns
- Method resolution order
- Memory optimization strategies
- Composition over inheritance principles
`);
