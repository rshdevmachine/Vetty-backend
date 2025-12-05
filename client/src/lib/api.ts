import { createContext, useContext } from "react";

export type Currency = "inr" | "cad";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "inr",
  setCurrency: () => {},
});

export const useCurrency = () => useContext(CurrencyContext);

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function getCoins(page: number = 1, currency: Currency = "inr") {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}&sparkline=true`
  );
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/coins/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCoinDetails(id: string) {
  const res = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
  );
  if (!res.ok) throw new Error("Failed to fetch coin details");
  return res.json();
}
