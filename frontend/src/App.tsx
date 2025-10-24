import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastNotifications } from "./components/ToastNotifications";
import Home from "@/pages/Home";
import Premium from "@/pages/Premium";
import Dashboard from "@/pages/Dashboard";
import Cart from "@/pages/Cart";
import NewPayment from "@/pages/NewPayment";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/premium" component={Premium} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/cart">
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      </Route>
      <Route path="/payment">
        <ProtectedRoute>
          <NewPayment />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <ToastNotifications />
                <Router />
              </TooltipProvider>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
