# Phase *Comments* code example


`yarn dev` to start dev server
`yarn tests` to run unit tests

## Notes:
- Project uses
	- vite
	- vitest
	- react
	- tailwind
- Reasoning
	- Vite gives me speed of development, so does tailwind because it comes with sensible defaults which help a lot especially where there is no design brief. In a longer form project I'd use Remix as the framework and either tailwind or plain css. 
- Comprehensive tests take some time to write so I've written unit tests for the helper functions and have setup the dev environment for component tests with writing comments tested. The rest of the tests would follow the same model.
- Note that @react/pixi has a pretty serious click handler bug which I've reproduced and opened an issue for on their repo, but solving that caused me to have write a bit of a hack to get the click handler to work. It's all commented in the code and I wouldn't expect to ship code like that to production.
## Next steps
- I'd normally create a backend for a project like this with a real time server like Supabase, Firebase or MongoDB. Then I could implement different users, checks in the client for user permissions and the realtime UX.
- The UI is as consistent as I can make it in a project like this, but normally next steps would be to create a design spec with text, colours, spacing, shadows etc
- I've written it all in Typescript which I prefer to use but the addition of a backend would really help to make TS shine because then I'd type the interface between backend and client and use a package like Zod to ensure the data has the right structure when it comes to the client.
- I've added some animations to the HTML elements but next I'd look at animating the Canvas elements. I think React Spring is the probably the way to do that with pixiJS React but this is the first time I've used pixiJS so I'd need to research this a bit to be sure.