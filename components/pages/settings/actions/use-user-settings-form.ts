'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { UserSettings } from '@/lib/types'
import { updateUserSettings } from './update-user-settings'
import toast from 'react-hot-toast'

const formSchema = z.object({
  fullName: z.string().min(2).or(z.literal('')),
  currentPassword: z.string().or(z.literal('')),
  newPassword: z.string().or(z.literal('')),
  isOpen: z.boolean().optional(),
})
  .superRefine((data, ctx) => {
    const isCurrentPasswordProvided = data.currentPassword !== '';
    const isNewPasswordProvided = data.newPassword !== '';

    // If either currentPassword or newPassword is provided, both must be provided
    if ((isCurrentPasswordProvided && !isNewPasswordProvided) || (!isCurrentPasswordProvided && isNewPasswordProvided)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Both current and new passwords must be provided.',
        path: ['newPassword'], // Error path
      });
    }

    // If both passwords are provided, they must be different
    if (
      isCurrentPasswordProvided &&
      isNewPasswordProvided &&
      data.currentPassword === data.newPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password must be different from current password.',
        path: ['newPassword'], // Error path
      });
    }

    // Validate min length for currentPassword
    if (isCurrentPasswordProvided && data.currentPassword.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 6,
        type: 'string',
        inclusive: true,
        message: 'Current password must be at least 6 characters long.',
        path: ['currentPassword'], // Error path
      });
    }

    // Validate min length for newPassword
    if (isNewPasswordProvided && data.newPassword.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 6,
        type: 'string',
        inclusive: true,
        message: 'New password must be at least 6 characters long.',
        path: ['newPassword'], // Error path
      });
    }
  });

export function useUserSettingsForm(initialData: UserSettings) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData.fullName,
      currentPassword: '',
      newPassword: '',
      isOpen: initialData.isOpen,
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      const result = await updateUserSettings({ ...data, isVendor: initialData.isVendor })
      if (result.success) {
        setSubmitSuccess(result.message)
        toast.success(result.message)
      } else {
        setSubmitError('Failed to update settings')
        toast.error(result.message)
      }
    } catch (error) {
      setSubmitError('An error occurred while updating settings')
      toast.error('An error occurred while updating settings')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { form, isSubmitting, submitError, submitSuccess, onSubmit }
}

