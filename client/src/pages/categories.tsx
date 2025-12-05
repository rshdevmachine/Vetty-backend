import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Categories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Browse cryptocurrencies by sector and ecosystem
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((category: any) => (
          <Card key={category.id} className="overflow-hidden hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg truncate pr-2">
                  {category.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {category.top_3_coins?.map((coinUrl: string) => (
                    <img
                      key={coinUrl}
                      src={coinUrl}
                      alt="Top coin"
                      className="w-8 h-8 rounded-full border bg-background"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {category.content || "No description available."}
                </p>
                {category.market_cap && (
                  <div className="pt-2 text-xs font-mono text-muted-foreground">
                    Mkt Cap: ${(category.market_cap / 1e9).toFixed(2)}B
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
