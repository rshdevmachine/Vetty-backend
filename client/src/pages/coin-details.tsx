import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCoinDetails, useCurrency } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Twitter, Github } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoinDetails() {
  const [match, params] = useRoute("/coins/:id");
  const { currency } = useCurrency();
  const id = params?.id;

  const { data: coin, isLoading, isError } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => getCoinDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-32" />
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="h-64 md:col-span-2" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (isError || !coin) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Coin not found</h2>
        <p className="text-muted-foreground mb-6">
          Could not retrieve details for this cryptocurrency.
        </p>
        <Link href="/">
          <Button>Back to Market</Button>
        </Link>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(currency === "inr" ? "en-IN" : "en-CA", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(value);
  };

  const currentPrice = coin.market_data.current_price[currency];
  const marketCap = coin.market_data.market_cap[currency];
  const high24h = coin.market_data.high_24h[currency];
  const low24h = coin.market_data.low_24h[currency];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Link href="/">
        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Market
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              {coin.name}
              <span className="text-xl text-muted-foreground font-normal uppercase">
                {coin.symbol}
              </span>
            </h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">Rank #{coin.market_cap_rank}</Badge>
              {coin.categories.slice(0, 2).map((cat: string) => (
                <Badge key={cat} variant="outline">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-mono font-bold">
            {formatCurrency(currentPrice)}
          </div>
          <div
            className={`text-sm font-medium ${
              coin.market_data.price_change_percentage_24h > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {coin.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Market Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-lg font-mono font-medium">
                  {formatCurrency(marketCap)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Trading Vol (24h)</p>
                <p className="text-lg font-mono font-medium">
                  {formatCurrency(coin.market_data.total_volume[currency])}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">24h High</p>
                <p className="text-lg font-mono font-medium">
                  {formatCurrency(high24h)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">24h Low</p>
                <p className="text-lg font-mono font-medium">
                  {formatCurrency(low24h)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Circulating Supply</p>
                <p className="text-lg font-mono font-medium">
                  {coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Supply</p>
                <p className="text-lg font-mono font-medium">
                  {coin.market_data.total_supply?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {coin.links.homepage[0] && (
              <a
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
                Website
              </a>
            )}
            {coin.links.twitter_screen_name && (
              <a
                href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
            )}
            {coin.links.repos_url.github[0] && (
              <a
                href={coin.links.repos_url.github[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground line-clamp-6 leading-relaxed">
                {coin.description.en.replace(/<[^>]*>?/gm, '')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
