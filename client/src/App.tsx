import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CurrencyContext, Currency } from "@/lib/api";
import { useState } from "react";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import Categories from "@/pages/categories";
import CoinDetails from "@/pages/coin-details";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/coins/:id" component={CoinDetails} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  const [currency, setCurrency] = useState<Currency>("inr");

  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <Router />
        <Toaster />
      </CurrencyContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
