import { InMemoryCache, Reference, makeVar } from "@apollo/client";

export const characterListVar = makeVar([]);
export const locationListVar = makeVar([]);

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characterList: {
            read() {
              return characterListVar();
            },
          },
  
          locationList: {
            read() {
              return locationListVar();
            },
          },
  
          launches: {
            // ...field policy definitions...
          },
        },
      },
    },
});