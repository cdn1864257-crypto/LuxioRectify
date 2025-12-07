import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Check, X, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { validatePasswordStrength, isPasswordValid, type PasswordStrength } from "@/lib/password-strength";
import { isValidCountry, isValidCity, isValidAddress, isValidRealEmail, isValidPhone } from "@/lib/validation";
import { countriesCities } from "@/lib/countries-cities";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

interface SignupFormData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const { toast } = useToast();
  const { signup, refreshUser } = useAuth();
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addressValidated, setAddressValidated] = useState(false);
  const [manualAddressConfirmed, setManualAddressConfirmed] = useState(false);

  // Set custom validation messages in the current language
  useEffect(() => {
    if (!formRef.current) return;
    
    const inputs = formRef.current.querySelectorAll('input[required]');
    const handleInvalid = (e: Event) => {
      const input = e.target as HTMLInputElement;
      input.setCustomValidity(t('pleaseCompleteThisField'));
    };
    const handleInput = (e: Event) => {
      const input = e.target as HTMLInputElement;
      input.setCustomValidity('');
    };
    
    inputs.forEach((input) => {
      input.addEventListener('invalid', handleInvalid);
      input.addEventListener('input', handleInput);
    });
    
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('invalid', handleInvalid);
        input.removeEventListener('input', handleInput);
      });
    };
  }, [language, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Update password strength when password changes
    if (name === 'password') {
      const validation = validatePasswordStrength(value);
      setPasswordStrength(validation.strength);
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData(prev => ({ ...prev, phone: value || '' }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = countriesCities.find(c => c.code === countryCode);
    
    if (selectedCountry) {
      setFormData(prev => ({ 
        ...prev, 
        country: selectedCountry.en, 
        city: "",
        phone: "",
        address: "",
        postalCode: ""
      }));
      setAddressValidated(false);
      setManualAddressConfirmed(false);
    }
    
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: undefined }));
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, city: value, address: "", postalCode: "" }));
    setAddressValidated(false);
    setManualAddressConfirmed(false);
    
    if (errors.city) {
      setErrors(prev => ({ ...prev, city: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignupFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = t('firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('lastNameRequired');
    
    if (!formData.country.trim()) {
      newErrors.country = t('countryRequired');
    } else if (!isValidCountry(formData.country)) {
      newErrors.country = t('invalidCountry');
    }
    
    if (!formData.city.trim()) {
      newErrors.city = t('cityRequired');
    } else if (!isValidCity(formData.city)) {
      newErrors.city = t('invalidCity');
    }
    
    if (!formData.address.trim()) {
      newErrors.address = t('addressRequired');
    } else if (!addressValidated && !manualAddressConfirmed) {
      newErrors.address = t('pleaseSelectAddressFromSuggestions');
    } else if (!isValidAddress(formData.address)) {
      newErrors.address = t('invalidAddress');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('phoneRequired');
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = t('invalidPhone');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired');
    } else if (!isValidRealEmail(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (!isPasswordValid(formData.password)) {
      newErrors.password = t('passwordRequirements');
    } else if (passwordStrength === 'weak') {
      newErrors.password = t('passwordTooWeak');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordsDontMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: t('validationError'),
        description: t('fixErrors'),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        language: language
      });

      if (!result.success) {
        throw new Error(result.error || t('signupError'));
      }

      await refreshUser();

      toast({
        title: t('signupSuccess'),
        description: t('welcome'),
      });

      setFormData({
        firstName: "",
        lastName: "",
        country: "",
        city: "",
        address: "",
        postalCode: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      toast({
        title: t('signupError'),
        description: error instanceof Error ? error.message : t('signupError'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" data-testid="form-signup">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('firstName')} *</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t('firstNamePlaceholder')}
            disabled={isLoading}
            required
            data-testid="input-firstName"
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">{t('lastName')} *</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t('lastNamePlaceholder')}
            disabled={isLoading}
            required
            data-testid="input-lastName"
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">{t('country')} *</Label>
          <Select 
            value={countriesCities.find(c => c.en === formData.country)?.code || ""} 
            onValueChange={handleCountryChange}
            disabled={isLoading}
          >
            <SelectTrigger 
              id="country"
              data-testid="select-country"
              className={errors.country ? "border-red-500" : ""}
            >
              <SelectValue placeholder={t('selectCountry') || t('countryPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
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
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">{t('city')} *</Label>
          <Input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleCityChange}
            placeholder={!formData.country ? t('selectCountry') : t('cityPlaceholder')}
            disabled={isLoading || !formData.country}
            required
            data-testid="input-city"
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">{t('address')} *</Label>
        <AddressAutocomplete
          value={formData.address}
          onChange={(value) => {
            setFormData(prev => ({ ...prev, address: value }));
            setAddressValidated(false);
            setManualAddressConfirmed(false);
            if (errors.address) {
              setErrors(prev => ({ ...prev, address: undefined }));
            }
          }}
          onAddressSelect={(suggestion) => {
            const address = suggestion.address;
            setFormData(prev => ({ ...prev, postalCode: address.postcode || '' }));
            setAddressValidated(true);
            setManualAddressConfirmed(false);
            if (errors.address) {
              setErrors(prev => ({ ...prev, address: undefined }));
            }
          }}
          onValidationError={(error) => {
            setErrors(prev => ({ ...prev, address: t(error as keyof typeof t) }));
            setAddressValidated(false);
            setManualAddressConfirmed(false);
          }}
          disabled={isLoading || !formData.country || !formData.city}
          placeholder={!formData.country || !formData.city ? t('selectCountryAndCity') : t('addressPlaceholder')}
          countryCode={countriesCities.find(c => c.en === formData.country)?.code}
          city={formData.city}
          data-testid="input-address"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address}</p>
        )}
        {!addressValidated && formData.address && !errors.address && !manualAddressConfirmed && (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            {t('selectAddressFromSuggestions')}
          </p>
        )}
        {!addressValidated && formData.address && formData.address.length >= 5 && (
          <div className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <Checkbox 
              id="manual-address-confirm"
              checked={manualAddressConfirmed}
              onCheckedChange={(checked) => {
                setManualAddressConfirmed(checked as boolean);
                if (checked && errors.address) {
                  setErrors(prev => ({ ...prev, address: undefined }));
                }
              }}
              disabled={isLoading}
              data-testid="checkbox-manual-address-confirm"
            />
            <div className="flex-1 space-y-1">
              <Label 
                htmlFor="manual-address-confirm" 
                className="text-sm font-medium cursor-pointer"
              >
                {t('addressNotListedConfirm')}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t('confirmAddressNotListed')}
              </p>
              {manualAddressConfirmed && (
                <div className="flex items-start gap-2 mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    {t('addressNotListedWarning')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">{t('postalCode')}</Label>
        <Input
          id="postalCode"
          name="postalCode"
          type="text"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder={t('postalCode')}
          disabled={isLoading}
          data-testid="input-postalCode"
          className={errors.postalCode ? "border-red-500" : ""}
        />
        {errors.postalCode && (
          <p className="text-sm text-red-500">{errors.postalCode}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t('phone')} *</Label>
        <PhoneInput
          international
          defaultCountry={formData.country ? countriesCities.find(c => c.en === formData.country)?.code as any : undefined}
          value={formData.phone}
          onChange={handlePhoneChange}
          disabled={isLoading}
          data-testid="input-phone"
          className={errors.phone ? "border-red-500 rounded-md border px-3 py-2" : "rounded-md border px-3 py-2"}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('email')} *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('emailPlaceholder')}
          disabled={isLoading}
          required
          data-testid="input-email"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t('password')} *</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            disabled={isLoading}
            required
            minLength={8}
            data-testid="input-password"
            className={errors.password ? "border-red-500 pr-10" : "pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-toggle-password-visibility"
            aria-label={showPassword ? t('hidePassword') : t('showPassword')}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {formData.password && passwordStrength && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${
                    passwordStrength === 'weak' ? 'w-1/3 bg-red-500' :
                    passwordStrength === 'medium' ? 'w-2/3 bg-yellow-500' :
                    'w-full bg-green-500'
                  }`}
                />
              </div>
              <span className={`text-sm font-medium ${
                passwordStrength === 'weak' ? 'text-red-600' :
                passwordStrength === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {passwordStrength === 'weak' ? t('weak') :
                 passwordStrength === 'medium' ? t('medium') :
                 t('strong')}
              </span>
            </div>
            <div className="text-xs space-y-1">
              <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                {formData.password.length >= 8 ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                <span>{t('passwordMinLength8')}</span>
              </div>
              <div className={`flex items-center gap-1 ${/[a-zA-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                {/[a-zA-Z]/.test(formData.password) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                <span>{t('passwordHasLetters')}</span>
              </div>
              <div className={`flex items-center gap-1 ${/\d/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                {/\d/.test(formData.password) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                <span>{t('passwordHasNumbers')}</span>
              </div>
              <div className={`flex items-center gap-1 ${/@/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                {/@/.test(formData.password) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                <span>{t('passwordHasAtSymbol')}</span>
              </div>
            </div>
          </div>
        )}
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('confirmPassword')} *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            disabled={isLoading}
            required
            data-testid="input-confirmPassword"
            className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-toggle-confirm-password-visibility"
            aria-label={showConfirmPassword ? t('hidePassword') : t('showPassword')}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        data-testid="button-submit-signup"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('signingUp')}
          </>
        ) : (
          t('signup')
        )}
      </Button>

      {onSwitchToLogin && (
        <div className="text-center text-sm">
          <span className="text-gray-600">{t('alreadyHaveAccount')} </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline font-medium"
            disabled={isLoading}
            data-testid="button-switch-login"
          >
            {t('login')}
          </button>
        </div>
      )}
    </form>
  );
}
