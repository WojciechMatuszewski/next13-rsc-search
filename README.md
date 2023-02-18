# Next.js 13 search demo

Inspired by [this tweet](https://twitter.com/ryantotweets/status/1622632894278533130), and the whole podcast episode, I've deiced to give a simplistic search with RSC a try.

## To run

1. `npm install`
2. `npm run init`
3. `npm run seed`
4. `npm run dev`

## Learnings

- The RSCs make fetching directly from the DB an effortless action.

  - To be perfectly honest, I'm not sure that is a good thing. It might lead to very brittle codebases with server-code mixed with FE code.

    - When working in larger codebases, **the separation of concerns is paramount**. If you do not separate different code "areas", you will get lost within spaghetti code.

    - Of course, not everyone works with larger codebases. If you have a small app, fetching in RSCs directly via DDB query makes perfect sense.

- Regardless of your opinion on the 👆 is, you have to agree that the ability to use Node libraries and functions in RSCs is fantastic.

- Next.js is getting quite complex with the number of configuration options. The **app directory is NOT ready and has subtle bugs**. It is a very good thing that they call the feature "beta", but I guess a lot of people will still depend on its features for mission-critical apps.

  - For example, I wanted to _cache per search param value_, mainly the `name` parameter. I could not achieve this via Next.js configuration, and **when I did not force the page to be "dynamic" next decided to treat it as static page**. This is a regression. It seems like they broke something.

- No matter what I did, I could not force the `fetch` to function as described in the docs. Maybe it was because I was using the `pages` API routes?

  - Well, the [_route handlers_ feature](https://beta.nextjs.org/docs/routing/route-handlers) broke as soon as I added `?`name=...` to the URL.
