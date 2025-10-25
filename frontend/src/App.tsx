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
        <RouteWrapper lang="fr">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/fr/premium">
        <RouteWrapper lang="fr">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/fr/reset-password">
        <RouteWrapper lang="fr">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/fr/dashboard">
        <RouteWrapper lang="fr">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/fr/cart">
        <RouteWrapper lang="fr">
          <Cart />
        </RouteWrapper>
      </Route>
      <Route path="/fr/payment">
        <RouteWrapper lang="fr">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - English */}
      <Route path="/en">
        <RouteWrapper lang="en">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/en/premium">
        <RouteWrapper lang="en">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/en/reset-password">
        <RouteWrapper lang="en">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/en/dashboard">
        <RouteWrapper lang="en">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/en/cart">
        <RouteWrapper lang="en">
          <Cart />
        </RouteWrapper>
      </Route>
      <Route path="/en/payment">
        <RouteWrapper lang="en">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Portuguese */}
      <Route path="/pt">
        <RouteWrapper lang="pt">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/pt/premium">
        <RouteWrapper lang="pt">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/pt/reset-password">
        <RouteWrapper lang="pt">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/pt/dashboard">
        <RouteWrapper lang="pt">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/pt/cart">
        <RouteWrapper lang="pt">
          <Cart />
        </RouteWrapper>
      </Route>
      <Route path="/pt/payment">
        <RouteWrapper lang="pt">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Spanish */}
      <Route path="/es">
        <RouteWrapper lang="es">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/es/premium">
        <RouteWrapper lang="es">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/es/reset-password">
        <RouteWrapper lang="es">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/es/dashboard">
        <RouteWrapper lang="es">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/es/cart">
        <RouteWrapper lang="es">
          <Cart />
        </RouteWrapper>
      </Route>
      <Route path="/es/payment">
        <RouteWrapper lang="es">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Italian */}
      <Route path="/it">
        <RouteWrapper lang="it">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/it/premium">
        <RouteWrapper lang="it">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/it/reset-password">
        <RouteWrapper lang="it">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/it/dashboard">
        <RouteWrapper lang="it">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/it/cart">
        <RouteWrapper lang="it">
          <Cart />
        </RouteWrapper>
      </Route>
      <Route path="/it/payment">
        <RouteWrapper lang="it">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Hungarian */}
      <Route path="/hu">
        <RouteWrapper lang="hu">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/hu/premium">
        <RouteWrapper lang="hu">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/hu/reset-password">
        <RouteWrapper lang="hu">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/hu/dashboard">
        <RouteWrapper lang="hu">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/hu/cart">
        <RouteWrapper lang="hu">
          <Cart />
        </RouteWrapper>
      </Route>
      <Route path="/hu/payment">
        <RouteWrapper lang="hu">
          <ProtectedRoute>
            <NewPayment />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>

      {/* Multilingual routes - Polish */}
      <Route path="/pl">
        <RouteWrapper lang="pl">
          <Home />
        </RouteWrapper>
      </Route>
      <Route path="/pl/premium">
        <RouteWrapper lang="pl">
          <Premium />
        </RouteWrapper>
      </Route>
      <Route path="/pl/reset-password">
        <RouteWrapper lang="pl">
          <ResetPassword />
        </RouteWrapper>
      </Route>
      <Route path="/pl/dashboard">
        <RouteWrapper lang="pl">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/pl/cart">
        <RouteWrapper lang="pl">
          <Cart />
        </RouteWrapper>
      </Route>
      <Route path="/pl/payment">
        <RouteWrapper lang="pl">
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
