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
import { CookieConsent } from "./components/CookieConsent";
import Home from "@/pages/Home";
import Premium from "@/pages/Premium";
import Dashboard from "@/pages/Dashboard";
import Cart from "@/pages/Cart";
import NewPayment from "@/pages/NewPayment";
import StripeCheckout from "@/pages/StripeCheckout";
import ResetPassword from "@/pages/ResetPassword";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import LegalNotice from "@/pages/LegalNotice";
import TermsOfService from "@/pages/TermsOfService";
import GdprDashboard from "@/pages/GdprDashboard";
import AdminProducts from "@/pages/AdminProducts";
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
      <Route path="/fr/payment/stripe">
        <RouteWrapper lang="fr">
          <ProtectedRoute>
            <StripeCheckout />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/fr/legal-notice">
        <RouteWrapper lang="fr">
          <LegalNotice />
        </RouteWrapper>
      </Route>
      <Route path="/fr/terms-of-service">
        <RouteWrapper lang="fr">
          <TermsOfService />
        </RouteWrapper>
      </Route>
      <Route path="/fr/gdpr">
        <RouteWrapper lang="fr">
          <ProtectedRoute>
            <GdprDashboard />
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
      <Route path="/en/payment/stripe">
        <RouteWrapper lang="en">
          <ProtectedRoute>
            <StripeCheckout />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/en/legal-notice">
        <RouteWrapper lang="en">
          <LegalNotice />
        </RouteWrapper>
      </Route>
      <Route path="/en/terms-of-service">
        <RouteWrapper lang="en">
          <TermsOfService />
        </RouteWrapper>
      </Route>
      <Route path="/en/gdpr">
        <RouteWrapper lang="en">
          <ProtectedRoute>
            <GdprDashboard />
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
      <Route path="/pt/payment/stripe">
        <RouteWrapper lang="pt">
          <ProtectedRoute>
            <StripeCheckout />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/pt/legal-notice">
        <RouteWrapper lang="pt">
          <LegalNotice />
        </RouteWrapper>
      </Route>
      <Route path="/pt/terms-of-service">
        <RouteWrapper lang="pt">
          <TermsOfService />
        </RouteWrapper>
      </Route>
      <Route path="/pt/gdpr">
        <RouteWrapper lang="pt">
          <ProtectedRoute>
            <GdprDashboard />
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
      <Route path="/es/payment/stripe">
        <RouteWrapper lang="es">
          <ProtectedRoute>
            <StripeCheckout />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/es/legal-notice">
        <RouteWrapper lang="es">
          <LegalNotice />
        </RouteWrapper>
      </Route>
      <Route path="/es/terms-of-service">
        <RouteWrapper lang="es">
          <TermsOfService />
        </RouteWrapper>
      </Route>
      <Route path="/es/gdpr">
        <RouteWrapper lang="es">
          <ProtectedRoute>
            <GdprDashboard />
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
      <Route path="/it/payment/stripe">
        <RouteWrapper lang="it">
          <ProtectedRoute>
            <StripeCheckout />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/it/legal-notice">
        <RouteWrapper lang="it">
          <LegalNotice />
        </RouteWrapper>
      </Route>
      <Route path="/it/terms-of-service">
        <RouteWrapper lang="it">
          <TermsOfService />
        </RouteWrapper>
      </Route>
      <Route path="/it/gdpr">
        <RouteWrapper lang="it">
          <ProtectedRoute>
            <GdprDashboard />
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
      <Route path="/hu/payment/stripe">
        <RouteWrapper lang="hu">
          <ProtectedRoute>
            <StripeCheckout />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/hu/legal-notice">
        <RouteWrapper lang="hu">
          <LegalNotice />
        </RouteWrapper>
      </Route>
      <Route path="/hu/terms-of-service">
        <RouteWrapper lang="hu">
          <TermsOfService />
        </RouteWrapper>
      </Route>
      <Route path="/hu/gdpr">
        <RouteWrapper lang="hu">
          <ProtectedRoute>
            <GdprDashboard />
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
      <Route path="/pl/payment/stripe">
        <RouteWrapper lang="pl">
          <ProtectedRoute>
            <StripeCheckout />
          </ProtectedRoute>
        </RouteWrapper>
      </Route>
      <Route path="/pl/legal-notice">
        <RouteWrapper lang="pl">
          <LegalNotice />
        </RouteWrapper>
      </Route>
      <Route path="/pl/terms-of-service">
        <RouteWrapper lang="pl">
          <TermsOfService />
        </RouteWrapper>
      </Route>
      <Route path="/pl/gdpr">
        <RouteWrapper lang="pl">
          <ProtectedRoute>
            <GdprDashboard />
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
      <Route path="/verify-email">
        <VerifyEmailPage />
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
      
      {/* Admin Routes */}
      <Route path="/admin/products">
        <ProtectedRoute>
          <AdminProducts />
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
                <CookieConsent />
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
