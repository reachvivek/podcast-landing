import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s+()-]{7,20}$/.test(val),
      'Please enter a valid phone number'
    ),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

// Booking form validation schema
export const bookingFormSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  customerEmail: z
    .string()
    .email('Please enter a valid email address'),
  customerPhone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .refine(
      (val) => /^[\d\s+()-]{7,20}$/.test(val),
      'Please enter a valid phone number'
    ),
  selectedDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Please select a valid date'),
  selectedTime: z
    .string()
    .min(1, 'Please select a time slot'),
  sessionDuration: z
    .number()
    .min(1, 'Session must be at least 1 hour')
    .max(12, 'Session cannot exceed 12 hours'),
  peopleCount: z
    .number()
    .min(1, 'At least 1 person required')
    .max(10, 'Maximum 10 people allowed'),
  selectedSetup: z
    .string()
    .min(1, 'Please select a setup type'),
  selectedService: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  }),
  additionalServices: z
    .array(z.string())
    .optional()
    .default([]),
  basePrice: z.number().min(0),
  addonsTotal: z.number().min(0),
  totalPrice: z.number().min(0),
  specialRequests: z
    .string()
    .max(1000, 'Special requests must be less than 1000 characters')
    .optional(),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
});

// Admin login schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type LoginData = z.infer<typeof loginSchema>;

// Validation error type
export interface ValidationError {
  path: string;
  message: string;
}

// Validation helper function
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: ValidationError[] } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const zodError = result.error as z.ZodError;
  return {
    success: false,
    errors: zodError.issues.map((issue) => ({
      path: issue.path.map(String).join('.'),
      message: issue.message,
    })),
  };
}
