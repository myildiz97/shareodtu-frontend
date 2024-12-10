'use client'

import { UserSettings } from '@/lib/types'
import { useUserSettingsForm } from '@/components/pages/settings/actions/use-user-settings-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

interface UserSettingsFormProps {
  initialData: UserSettings
}

export function UserSettingsForm({ initialData }: UserSettingsFormProps) {
  const { form, isSubmitting, onSubmit } = useUserSettingsForm(initialData)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-y-4'>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {initialData.isVendor && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="isOpen"
                defaultValue={initialData.isOpen}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Vendor Status</FormLabel>
                      <FormDescription>
                        Set your vendor status to open or closed.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        <Button type="submit" className='max-w-fit ml-auto' disabled={isSubmitting || !form.formState.isValid || !form.formState.isDirty}>
          {isSubmitting ? 'Updating...' : 'Update Settings'}
        </Button>
      </form>
    </Form>
  )
}

