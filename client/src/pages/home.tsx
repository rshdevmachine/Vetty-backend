import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoins, useCurrency } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [page, setPage] = useState(1);
  const { currency } = useCurrency();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["coins", page, currency],
    queryFn: () => getCoins(page, currency),
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(currency === "inr" ? "en-IN" : "en-CA", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
        <p className="text-muted-foreground">
          Top cryptocurrencies by market cap
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency Prices</CardTitle>
          <CardDescription>
            Live market data against {currency.toUpperCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-10 text-destructive">
              Failed to load market data. The API might be rate limited.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Coin</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                    <TableHead className="text-right">Market Cap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((coin: any) => (
                    <TableRow key={coin.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium text-muted-foreground">
                        {coin.market_cap_rank}
                      </TableCell>
                      <TableCell>
                        <Link href={`/coins/${coin.id}`}>
                          <div className="flex items-center gap-3">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold">{coin.name}</span>
                              <span className="text-xs text-muted-foreground uppercase">
                                {coin.symbol}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(coin.current_price)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`flex items-center justify-end gap-1 ${
                            coin.price_change_percentage_24h > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {coin.price_change_percentage_24h > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-mono">
                            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">
                        {formatCurrency(coin.market_cap)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground font-mono">
              Page {page}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={isLoading}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
