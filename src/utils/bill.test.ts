
import { describe, it, expect } from "vitest";
import { findHolder } from "./bill";

describe("util", () => {
  describe("findHolder", () => {
    it("should find current holder of bill without endorsement", () => {
      const bill = JSON.parse(`
        {
          "drawee": {
            "type": 1,
            "node_id": "02ef76363e8b2305638c968229bb680a3712a25ac725dd9860c0952c1713ba257d",
            "name": "Apricot Brandy Makers Inc.",
            "country": "US",
            "city": "Cryptoville",
            "zip": "CY 67890",
            "address": "7889 Market Street",
            "email": null,
            "nostr_relay": null
          },
          "drawer": {
            "type": 1,
            "node_id": "02ef76363e8b2305638c968229bb680a3712a25ac725dd9860c0952c1713ba257d",
            "name": "Apricot Brandy Makers Inc.",
            "country": "US",
            "city": "Cryptoville",
            "zip": "CY 67890",
            "address": "7889 Market Street",
            "email": null,
            "nostr_relay": null
          },
          "payee": {
            "type": 1,
            "node_id": "0229b1405d95e389146fee0f650e8cb6ef08a15d9e91356039a8be6bc4d7ffeb6b",
            "name": "Apricot Delight GmbH",
            "country": "AT",
            "city": "Vienna",
            "zip": "1190",
            "address": "Apricot Hill 1",
            "email": null,
            "nostr_relay": null
          },
          "endorsee": null,
          "endorsed": true
          }
        `);

      const holder = findHolder(bill);
      expect(holder.node_id).toBe("0229b1405d95e389146fee0f650e8cb6ef08a15d9e91356039a8be6bc4d7ffeb6b");
    });

    it("should find current holder of bill with endorsement", () => {
      const bill = JSON.parse(`
        {
          "drawee": {
            "type": 1,
            "node_id": "02ef76363e8b2305638c968229bb680a3712a25ac725dd9860c0952c1713ba257d",
            "name": "Apricot Brandy Makers Inc.",
            "country": "US",
            "city": "Cryptoville",
            "zip": "CY 67890",
            "address": "7889 Market Street",
            "email": null,
            "nostr_relay": null
          },
          "drawer": {
            "type": 1,
            "node_id": "02ef76363e8b2305638c968229bb680a3712a25ac725dd9860c0952c1713ba257d",
            "name": "Apricot Brandy Makers Inc.",
            "country": "US",
            "city": "Cryptoville",
            "zip": "CY 67890",
            "address": "7889 Market Street",
            "email": null,
            "nostr_relay": null
          },
          "payee": {
            "type": 1,
            "node_id": "0229b1405d95e389146fee0f650e8cb6ef08a15d9e91356039a8be6bc4d7ffeb6b",
            "name": "Apricot Delight GmbH",
            "country": "AT",
            "city": "Vienna",
            "zip": "1190",
            "address": "Apricot Hill 1",
            "email": null,
            "nostr_relay": null
          },
          "endorsee": {
            "type": 1,
            "node_id": "02f34e23724d06d8ed1bafa990886da40972c229e3f4e2881091fa31d16709b7a4",
            "name": "Wildcat One plc",
            "country": "KY",
            "city": "George Town",
            "zip": "KY1-1009",
            "address": "299 West Bay Road, Georgetown",
            "email": "mint@wildcat.one",
            "nostr_relay": "wss://localhost:8080"
          },
          "endorsed": true
          }
        `);

      const holder = findHolder(bill);
      expect(holder.node_id).toBe("02f34e23724d06d8ed1bafa990886da40972c229e3f4e2881091fa31d16709b7a4");
    });
  });
});
