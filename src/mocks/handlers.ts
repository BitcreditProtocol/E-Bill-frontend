import { search } from "./handlers/home/search";
import { balances } from "./handlers/home/balances";
import { recentBills } from "./handlers/home/recent-bills";
import { billsList } from "./handlers/bills/list";
import { searchBills } from "./handlers/bills/search";

export const handlers = [search, recentBills, balances, billsList, searchBills];
