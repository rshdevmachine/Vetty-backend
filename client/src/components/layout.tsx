import { Link, useLocation } from "wouter";
import { Moon, Sun, Coins, List, Menu } from "lucide-react";
import { useCurrency } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { currency, setCurrency } = useCurrency();

  const NavLinks = () => (
    <>
      <Link href="/">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${
            location === "/"
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Coins className="w-4 h-4" />
          Market
        </div>
      </Link>
      <Link href="/categories">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${
            location === "/categories"
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <List className="w-4 h-4" />
          Categories
        </div>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                  V
                </div>
                <span>VettyCrypto</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-2">
              <NavLinks />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
              <span>Currency:</span>
              <div className="flex bg-background rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setCurrency("inr")}
                  className={`px-3 py-0.5 rounded-full text-xs font-medium transition-all ${
                    currency === "inr"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:text-foreground"
                  }`}
                >
                  INR
                </button>
                <button
                  onClick={() => setCurrency("cad")}
                  className={`px-3 py-0.5 rounded-full text-xs font-medium transition-all ${
                    currency === "cad"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:text-foreground"
                  }`}
                >
                  CAD
                </button>
              </div>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                  <div className="h-px bg-border my-2" />
                  <div className="px-4 flex items-center justify-between">
                    <span className="text-sm font-medium">Currency</span>
                    <div className="flex bg-muted rounded-lg p-1">
                      <button
                        onClick={() => setCurrency("inr")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                          currency === "inr"
                            ? "bg-background shadow-sm text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        INR
                      </button>
                      <button
                        onClick={() => setCurrency("cad")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                          currency === "cad"
                            ? "bg-background shadow-sm text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        CAD
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
