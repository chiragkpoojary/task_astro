import { Button, Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export default function Example() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
      <Field className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col">
        <Label className="text-sm/6 font-medium text-white">Email</Label>
        <Input
          className={clsx(
            'mt-1.5 mb-4 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          type='email'
          placeholder='example@gmail.com'
        />

<Label className="text-sm/6 font-medium text-white">Password</Label>
        <div className="relative">
          <Input
            className={clsx(
              'mt-1.5 mb-4 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            type={showPassword ? 'text' : 'password'}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 bottom-2.5 flex items-center cursor-pointer text-white"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        </div>

        <Label className="text-sm/6 font-medium text-white">Confirm Password</Label>
        <Input
          className={clsx(
            'mt-1.5 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          type='password'
        />
        <Button className="flex justify-center items-cente mt-9 mb-3 rounded-md bg-blue-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
     Submit
    </Button>
    <p className='text-white'>Already have an account? <a href='www.google.com' className='text-indigo-400 hover:text-indigo-300 underline'>Login here</a></p>
      </Field>
    </div>
  )
}
