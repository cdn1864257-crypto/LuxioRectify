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
import { RouteWrapper } from "./components/RouteWrapper";
import { LanguageRedirect } from "./components/LanguageRedirect";
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
      {/* Multilingual routes - French */}
      <Route path="/fr">
        <RouteWrapper path="/fr">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/fr/premium">
        <RouteWrapper path="/fr/premium">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/fr/reset-password">
        <RouteWrapper path="/fr/reset-password">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/fr/dashboard">
        <RouteWrapper path="/fr/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/fr/cart">
        <RouteWrapper path="/fr/cart">
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/fr/payment">
        <RouteWrapper path="/fr/payment">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - English */}
      <Route path="/en">
        <RouteWrapper path="/en">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/en/premium">
        <RouteWrapper path="/en/premium">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/en/reset-password">
        <RouteWrapper path="/en/reset-password">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/en/dashboard">
        <RouteWrapper path="/en/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/en/cart">
        <RouteWrapper path="/en/cart">
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/en/payment">
        <RouteWrapper path="/en/payment">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Portuguese */}
      <Route path="/pt">
        <RouteWrapper path="/pt">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/pt/premium">
        <RouteWrapper path="/pt/premium">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/pt/reset-password">
        <RouteWrapper path="/pt/reset-password">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/pt/dashboard">
        <RouteWrapper path="/pt/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/pt/cart">
        <RouteWrapper path="/pt/cart">
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/pt/payment">
        <RouteWrapper path="/pt/payment">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Spanish */}
      <Route path="/es">
        <RouteWrapper path="/es">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/es/premium">
        <RouteWrapper path="/es/premium">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/es/reset-password">
        <RouteWrapper path="/es/reset-password">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/es/dashboard">
        <RouteWrapper path="/es/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/es/cart">
        <RouteWrapper path="/es/cart">
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/es/payment">
        <RouteWrapper path="/es/payment">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Italian */}
      <Route path="/it">
        <RouteWrapper path="/it">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/it/premium">
        <RouteWrapper path="/it/premium">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/it/reset-password">
        <RouteWrapper path="/it/reset-password">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/it/dashboard">
        <RouteWrapper path="/it/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/it/cart">
        <RouteWrapper path="/it/cart">
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/it/payment">
        <RouteWrapper path="/it/payment">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Hungarian */}
      <Route path="/hu">
        <RouteWrapper path="/hu">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/hu/premium">
        <RouteWrapper path="/hu/premium">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/hu/reset-password">
        <RouteWrapper path="/hu/reset-password">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/hu/dashboard">
        <RouteWrapper path="/hu/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/hu/cart">
        <RouteWrapper path="/hu/cart">
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/hu/payment">
        <RouteWrapper path="/hu/payment">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Legacy routes (redirect to detected language) */}
      <Route path="/">
        <LanguageRedirect />
        <Home />
      </Route>
      <Route path="/premium">
        <LanguageRedirect />
        <Premium />
      </Route>
      <Route path="/reset-password">
        <LanguageRedirect />
        <ResetPassword />
      </Route>
      <Route path="/dashboard">
        <LanguageRedirect />
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/cart">
        <LanguageRedirect />
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      </Route>
      <Route path="/payment">
        <LanguageRedirect />
        <ProtectedRoute>
          <NewPayment />
        </ProtectedRoute>
      </Route>

      {/* 404 Not Found */}
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
