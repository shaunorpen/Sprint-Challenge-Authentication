const server = require("./server");
const request = require("supertest");
const db = require("../database/dbConfig");

const user = {
  username: "shaun",
  password: "1234"
};

let cookie;

beforeAll(async () => {
  await db("users").truncate();
  await db("sessions").truncate();
});

describe("POST /api/auth/register", () => {
  test("add a new user", () => {
    return request(server)
      .post("/api/auth/register")
      .send(user)
      .expect(201)
      .expect({ message: "1 user successfully created" });
  });
});

describe("POST /api/auth/login", () => {
  test("login as newly created user", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send(user);
    cookie = response.headers["set-cookie"];
    expect(response.status).toBe(200);
  });
});

describe("GET /api/jokes", () => {
  test("returns jokes for logged in user", async () => {
    const response = await request(server)
      .get("/api/jokes")
      .set("cookie", cookie);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: "0189hNRf2g",
        joke:
          "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
      },
      {
        id: "08EQZ8EQukb",
        joke:
          "Did you hear about the guy whose whole left side was cut off? He's all right now."
      },
      {
        id: "08xHQCdx5Ed",
        joke: "Why didn’t the skeleton cross the road? Because he had no guts."
      },
      {
        id: "0DQKB51oGlb",
        joke: "What did one nut say as he chased another nut?  I'm a cashew!"
      },
      {
        id: "0DtrrOZDlyd",
        joke:
          "Chances are if you' ve seen one shopping center, you've seen a mall."
      },
      {
        id: "0LuXvkq4Muc",
        joke:
          "I knew I shouldn't steal a mixer from work, but it was a whisk I was willing to take."
      },
      {
        id: "0ga2EdN7prc",
        joke:
          "How come the stadium got hot after the game? Because all of the fans left."
      },
      {
        id: "0oO71TSv4Ed",
        joke: "Why was it called the dark ages? Because of all the knights. "
      },
      {
        id: "0oz51ozk3ob",
        joke: "A steak pun is a rare medium well done."
      },
      {
        id: "0ozAXv4Mmjb",
        joke: "Why did the tomato blush? Because it saw the salad dressing."
      },
      {
        id: "0wcFBQfiGBd",
        joke:
          "Did you hear the joke about the wandering nun? She was a roman catholic."
      },
      {
        id: "189xHQ7pOuc",
        joke: "What creature is smarter than a talking parrot? A spelling bee."
      },
      {
        id: "18Elj3EIYvc",
        joke: "I'll tell you what often gets over looked... garden fences."
      },
      {
        id: "18h3wcU8xAd",
        joke: "Why did the kid cross the playground? To get to the other slide."
      },
      {
        id: "1DIRSfx51Dd",
        joke:
          "Why do birds fly south for the winter? Because it's too far to walk."
      },
      {
        id: "1DQZDY0gVnb",
        joke:
          "What is a centipedes's favorite Beatle song?  I want to hold your hand, hand, hand, hand..."
      },
      {
        id: "1DQZvXvX8Ed",
        joke:
          "My first time using an elevator was an uplifting experience. The second time let me down."
      },
      {
        id: "1DQZvcFBdib",
        joke: "To be Frank, I'd have to change my name."
      },
      {
        id: "1Dt4M7Ufaxc",
        joke: "Slept like a log last night … woke up in the fireplace."
      },
      {
        id: "1T01LBXLuzd",
        joke:
          "Why does a Moon-rock taste better than an Earth-rock? Because it's a little meteor."
      }
    ]);
  });
});

describe("Get /api/auth/logout", () => {
  test("logged in user can log out", () => {
    return request(server)
      .get("/api/auth/logout")
      .expect(200)
      .expect(`"Goodbye! You're logged out."`);
  });
});