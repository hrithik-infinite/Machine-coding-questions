function c(val) {
  console.log(val);
}
class Teacher {
  constructor(name, channel, likes = 0) {
    this.name = name;
    this.channel = channel;
    this.likes = likes;
  }
  intro() {
    return `Hey. Its ${this.name}! Welcome to ${this.channel}`;
  }
  like() {
    this.likes++;
    return `Liked this Video! current Likes: ${this.likes}`;
  }
}

const hrithik = new Teacher("Hrithik", "My YT Channel");
const hrithik2 = new Teacher("Agatwal", "My YT Channel", 20);

c(hrithik);
c(hrithik.intro());
c(hrithik.like());
c(hrithik.like());
c(hrithik.like());
c(hrithik2);
c(hrithik2.intro());
c(hrithik2.like());
c(hrithik2.like());
c(hrithik2.like());

// converting to function constructor

function Teacher2(name, channel, likes = 0) {
  this.name = name;
  this.channel = channel;
  this.likes = likes;
}
Teacher2.prototype.intro = function () {
  return `Hey. Its ${this.name}! Welcome to ${this.channel}`;
};
Teacher2.prototype.like = function () {
  this.likes++;
  return `Liked this Video! current Likes: ${this.likes}`;
};

const hrithik3 = new Teacher2("Hrithik", "My YT Channel");
const hrithik4 = new Teacher2("Agarwal", "My YT Channel", 20);

c(hrithik3);
c(hrithik3.intro());
c(hrithik3.like());
c(hrithik3.like());
c(hrithik3.like());
c(hrithik4);
c(hrithik4.intro());
c(hrithik4.like());
c(hrithik4.like());
c(hrithik4.like());

//inheritance//

class YoutubeTeacher extends Teacher {
  constructor(name, channel, likes, subscribers) {
    super(name, channel, likes);
    this.subscribers = subscribers;
  }
  subscribersCount() {
    return `${this.channel} has ${this.subscribers} subscribers`;
  }
  static paidCourse(name) {
    return new YoutubeTeacher(name, "My YT Channel", 1000, 1000);
  }
}

const hrithik5 = new YoutubeTeacher("Hrithik", "My YT Channel", 1000, 1000);
c(hrithik5);
c(hrithik5.subscribersCount());
c(hrithik5.intro());
c(hrithik5.like());

//static method cant be accessd like this
try {
  c(hrithik5.paidCourse());
} catch (e) {
  c(e);
}
//not it cant be accessed inside the class
//it can ony be accessed like
const hrithik6 = YoutubeTeacher.paidCourse("Agarwal");
c(hrithik6);
