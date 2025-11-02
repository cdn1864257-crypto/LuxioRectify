import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { showToast } from '../components/ToastNotifications';
import { AddressAutocomplete } from '../components/AddressAutocomplete';
import { isValidCountry, isValidCity, isValidAddress } from '../lib/validation';
import { countriesCities } from '../lib/countries-cities';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { MapPin, ArrowRight, Package } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface AddressForm {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function CheckoutAddress() {
  const { user } = useAuth();
  const { cart } = useCart();
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();

  const [useRegistered, setUseRegistered] = useState(false);
  const [availableCities, setAvailableCities] = useState<{ en: string; fr: string; es: string }[]>([]);
  const [formData, setFormData] = useState<AddressForm>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    if (!user) {
      setLocation(`/${language}`);
      return;
    }

    if (cart.length === 0) {
      setLocation(`/${language}/cart`);
      return;
    }
  }, [user, cart, language, setLocation]);

  useEffect(() => {
    if (user && useRegistered) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: '',
        country: user.country || ''
      });
    } else if (user && !useRegistered) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
      });
    }
  }, [useRegistered, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!formData.firstName.trim()) {
      showToast(t('firstNameRequired'), 'error');
      return;
    }

    if (!formData.lastName.trim()) {
      showToast(t('lastNameRequired'), 'error');
      return;
    }

    if (!formData.phone.trim()) {
      showToast(t('phoneRequired'), 'error');
      return;
    }

    if (!formData.address.trim()) {
      showToast(t('addressRequired'), 'error');
      return;
    }

    // Validation stricte de l'adresse (doit contenir un numéro et des lettres)
    if (!isValidAddress(formData.address)) {
      showToast(t('invalidAddress'), 'error');
      return;
    }

    if (!formData.city.trim()) {
      showToast(t('cityRequired'), 'error');
      return;
    }

    // Validation stricte de la ville (doit être dans la liste)
    if (!isValidCity(formData.city)) {
      showToast(t('invalidCity'), 'error');
      return;
    }

    if (!formData.country.trim()) {
      showToast(t('countryRequired'), 'error');
      return;
    }

    // Validation stricte du pays (doit être dans la liste)
    if (!isValidCountry(formData.country)) {
      showToast(t('invalidCountry'), 'error');
      return;
    }

    sessionStorage.setItem('deliveryAddress', JSON.stringify(formData));
    showToast(t('addressSaved'), 'success');
    setLocation(`/${language}/payment`);
  };

  const handleChange = (field: keyof AddressForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = countriesCities.find(c => c.code === countryCode);
    
    if (selectedCountry) {
      setFormData(prev => ({ 
        ...prev, 
        country: selectedCountry.en, 
        city: "",
        address: ""
      }));
      setAvailableCities(selectedCountry.cities);
    }
  };

  const handleCityChange = (cityIndex: string) => {
    const cityIdx = parseInt(cityIndex);
    if (availableCities[cityIdx]) {
      setFormData(prev => ({ ...prev, city: availableCities[cityIdx].en, address: "" }));
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData(prev => ({ ...prev, phone: value || '' }));
  };

  if (!user || cart.length === 0) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{t('seoCheckoutAddressTitle')}</title>
        <meta name="description" content={t('seoCheckoutAddressDescription')} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white" data-testid="title-checkout-address">
                  {t('checkoutAddressTitle')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  {t('checkoutAddressSubtitle')}
                </p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  {cart.length} {cart.length === 1 ? t('item') : t('items')} • €{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </p>
              </div>
            </div>

            {user.address && (
              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="use-registered"
                    checked={useRegistered}
                    onCheckedChange={(checked) => setUseRegistered(checked as boolean)}
                    data-testid="checkbox-use-registered-address"
                  />
                  <div className="flex-1">
                    <Label htmlFor="use-registered" className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                      {t('useRegisteredAddress')}
                    </Label>
                    {useRegistered && (
                      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.address}</p>
                        <p>{user.city}, {user.country}</p>
                        <p>{user.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium mb-2 block">
                    {t('firstName')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    disabled={useRegistered}
                    required
                    data-testid="input-first-name"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">
                    {t('lastName')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    disabled={useRegistered}
                    required
                    data-testid="input-last-name"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                  {t('phone')} <span className="text-red-500">*</span>
                </Label>
                <PhoneInput
                  id="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={useRegistered}
                  international
                  defaultCountry={countriesCities.find(c => c.en === formData.country)?.code as any || undefined}
                  data-testid="input-phone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country" className="text-sm font-medium mb-2 block">
                    {t('country')} <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={countriesCities.find(c => c.en === formData.country)?.code || ""} 
                    onValueChange={handleCountryChange}
                    disabled={useRegistered}
                  >
                    <SelectTrigger 
                      id="country"
                      data-testid="select-country"
                      className="w-full"
                    >
                      <SelectValue placeholder={t('selectCountry') || t('countryPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      {countriesCities.map(country => {
                        const langKey = language as 'en' | 'fr' | 'es';
                        const countryName = country[langKey] || country.en;
                        return (
                          <SelectItem key={country.code} value={country.code}>
                            {countryName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-medium mb-2 block">
                    {t('city')} <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={availableCities.findIndex(c => c.en === formData.city).toString()} 
                    onValueChange={handleCityChange}
                    disabled={useRegistered || availableCities.length === 0}
                  >
                    <SelectTrigger 
                      id="city"
                      data-testid="select-city"
                      className="w-full"
                    >
                      <SelectValue placeholder={availableCities.length === 0 ? t('countryPlaceholder') : t('cityPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      {availableCities.map((city, index) => {
                        const langKey = language as 'en' | 'fr' | 'es';
                        const cityName = city[langKey] || city.en;
                        return (
                          <SelectItem key={index} value={index.toString()}>
                            {cityName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium mb-2 block">
                  {t('completeAddress')} <span className="text-red-500">*</span>
                </Label>
                <AddressAutocomplete
                  value={formData.address}
                  onChange={(value) => handleChange('address', value)}
                  city={formData.city}
                  countryCode={countriesCities.find(c => c.en === formData.country)?.code || ''}
                  onValidationError={(errorKey) => {
                    const errorMessages: Record<string, string> = {
                      'addressNotInSelectedCity': t('addressNotInSelectedCity'),
                      'addressNotInSelectedCountry': t('addressNotInSelectedCountry'),
                      'addressMismatch': t('addressMismatch')
                    };
                    showToast(errorMessages[errorKey] || t('pleaseSelectValidAddress'), 'error');
                  }}
                  onAddressSelect={(suggestion) => {
                    const address = suggestion.address;
                    handleChange('postalCode', address.postcode || '');
                  }}
                  disabled={useRegistered}
                  data-testid="input-address"
                />
              </div>

              <div>
                <Label htmlFor="postalCode" className="text-sm font-medium mb-2 block">
                  {t('postalCode')}
                </Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  disabled={useRegistered}
                  data-testid="input-postal-code"
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg font-semibold"
                size="lg"
                data-testid="button-continue-payment"
              >
                {t('continueToPayment')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
