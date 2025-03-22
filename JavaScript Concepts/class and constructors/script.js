// 🧑‍🏫 Class Example: Teacher
class Teacher {
  constructor(name, subject, likes = 0) {
    this.name = name;
    this.subject = subject;
    this.likes = likes;
  }

  // Introduction method
  intro() {
    return `👋 Hi! I'm ${this.name}, and I teach ${this.subject}.`;
  }

  // Like method to increment likes
  like() {
    this.likes++;
    return `👍 Liked this lecture! Current Likes: ${this.likes}`;
  }
}

// Create teacher instances
const t1 = new Teacher("Hrithik", "JavaScript");
const t2 = new Teacher("Agarwal", "TypeScript", 20);

console.log(`Teacher 1 Name: ${t1.name}`);
console.log("Teacher 1 Details:", t1);
console.log(t1.intro());
console.log(t1.like());
console.log(t1.like());
console.log(t1.like());

console.log("Teacher 2 Details:", t2);
console.log(t2.intro());
console.log(t2.like());
console.log(t2.like());
console.log(t2.like());

// ------------------------------------------------
// 🔐 Private Fields Example
// Class with private field #priName
class PrivateTeacher {
  #priName; // Private field (only accessible inside the class)

  constructor(name) {
    this.name = name;
    this.#priName = name; // Assign private field
  }

  // Public method to access private data
  getDetails() {
    return `Public name: ${this.name}, Private name: ${this.#priName}`;
  }
}

const pt = new PrivateTeacher("SecretHrithik");
console.log("PrivateTeacher Example:");
console.log(pt.getDetails()); // Works fine
console.log(pt.name); // Works fine (public property)

// Trying to access private field directly will throw error (uncomment to check)
// console.log(pt.#priName); // ❌ Syntax Error

// ------------------------------------------------
// 🏛️ Function Constructor Example (Pre-ES6)

function OldTeacher(name, subject, likes = 0) {
  this.name = name;
  this.subject = subject;
  this.likes = likes;
}

// Prototype methods (similar to class methods)
OldTeacher.prototype.intro = function () {
  return `Hey! I'm ${this.name}, teaching ${this.subject}.`;
};

OldTeacher.prototype.like = function () {
  this.likes++;
  return `❤️ Liked this session! Total Likes: ${this.likes}`;
};

// Create instances using function constructor
const ot1 = new OldTeacher("Old Hrithik", "Python");
const ot2 = new OldTeacher("Old Agarwal", "C++", 10);

console.log("OldTeacher Example:");
console.log(ot1);
console.log(ot1.intro());
console.log(ot1.like());
console.log(ot1.like());
console.log(ot2);
console.log(ot2.intro());
console.log(ot2.like());
console.log(ot2.like());

// ------------------------------------------------
// 🧬 Inheritance Example - Extending a class (Child class)

// Extended class from Teacher
class YoutubeTeacher extends Teacher {
  constructor(name, subject, likes, subscribers) {
    super(name, subject, likes); // Call parent constructor
    this.subscribers = subscribers;
  }

  // New method specific to YoutubeTeacher
  subscriberCount() {
    return `📊 ${this.subject} channel has ${this.subscribers} subscribers.`;
  }

  // Static method to create a premium teacher directly
  static premiumTeacher(name) {
    return new YoutubeTeacher(name, "Premium Content", 1000, 50000);
  }
}

// Create child class instance
const yt1 = new YoutubeTeacher("YT Hrithik", "ReactJS", 500, 10000);
console.log("YoutubeTeacher Example:");
console.log(yt1);
console.log(yt1.subscriberCount());
console.log(yt1.intro()); // Parent method
console.log(yt1.like());

// ⚠️ Static methods cannot be accessed from instances directly
try {
  console.log(yt1.premiumTeacher("Invalid Call")); // ❌ This will throw an error
} catch (e) {
  console.error(`Expected Error: ${e.message}`);
}

// ✅ Static methods are accessed directly from the class
const premiumTeacher = YoutubeTeacher.premiumTeacher("Premium Hrithik");
console.log("Premium Teacher Created via Static Method:", premiumTeacher);

// ------------------------------------------------
// Recap Notes for Quick Revision:
// - Class -> Modern way to define reusable objects
// - Constructor -> Initializes properties
// - Methods -> Define behavior (like intro, like)
// - Private Fields (#fieldName) -> Internal only, can't access directly
// - Prototype Methods (function constructor) -> Pre-ES6 way to extend functionality
// - Inheritance (extends) -> One class can inherit from another
// - super() -> Calls parent class constructor
// - Static Methods -> Belong to the class, not instances
