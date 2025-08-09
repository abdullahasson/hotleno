"use client"

// Next.js Imports
import Image from "next/image"
import Link from "next/link"
// Components
import Header from "@/components/flights/Header"

// Assets
import bg from "../../../../../public/bg-1.jpg"
import Line from "../../../../../public/line-shape-1.svg"

// Icons
import { Mail, Lock, Github, Twitter, Facebook } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

// Form Libraries
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Framer Motion
import { motion } from "framer-motion"
import { fadeIn, staggerContainer, slideIn } from "@/lib/utils/motion"

export default function Login() {
  const locale = useLocale()
  const t = useTranslations('Login')

  // Define validation schema with Zod
  const loginSchema = z.object({
    email: z.string()
      .min(1, { message: t('validation.email_required') })
      .email({ message: t('validation.email_invalid') }),
    password: z.string()
      .min(1, { message: t('validation.password_required') })
      .min(8, { message: t('validation.password_min_length') }),
  })

  type LoginFormValues = z.infer<typeof loginSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: LoginFormValues) => {
    console.log(data)
    // Handle login logic here
  }

  return (
    <div>
      <Header />
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1, 0.3)}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="relative overflow-hidden shadow-xl rounded-xl max-w-6xl w-full h-[700px] border border-gray-200 flex bg-white"
        >
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={bg}
              alt="login-background"
              fill
              className="object-cover z-0"
              priority={false}
            />
          </motion.div>

          {/* Line on corner */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Image
              src={Line}
              alt="login-background"
              width={200}
              height={200}
              className="absolute left-0 top-7"
              priority={false}
            />
          </motion.div>

          {/* Login Form Section */}
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-1 h-full z-20 relative flex flex-col gap-6 items-center justify-center py-10 px-8"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-[#1865A9] font-extrabold mb-2 text-4xl md:text-5xl">
                {t('welcome')}
              </h1>
              <p className="font-normal text-gray-600 text-lg">
                {t('login_with_email')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-md"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  variants={fadeIn("up", "tween", 0.4, 1)}
                  className="relative"
                >
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`peer h-12 w-full border ${errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg px-4 pt-3 pb-1 focus:outline-none focus:ring-2 focus:ring-[#1865A9] focus:border-transparent transition-all`}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-3 text-gray-500 text-sm pointer-events-none transition-all duration-200 peer-focus:-top-[10px] peer-focus:text-xs peer-focus:text-[#1865A9] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{t('email_address')}</span>
                      </div>
                    </label>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  variants={fadeIn("up", "tween", 0.5, 1)}
                  className="relative"
                >
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      {...register("password")}
                      className={`peer h-12 w-full border ${errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-lg px-4 pt-3 pb-1 focus:outline-none focus:ring-2 focus:ring-[#1865A9] focus:border-transparent transition-all`}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-4 top-3 text-gray-500 text-sm pointer-events-none transition-all duration-200 peer-focus:-top-[10px] peer-focus:text-xs peer-focus:text-[#1865A9] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
                    >
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span>{t('password')}</span>
                      </div>
                    </label>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={fadeIn("up", "tween", 0.6, 1)}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1865A9] hover:bg-[#13518f] font-bold text-white rounded-lg p-3 w-full transition-colors duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('logging_in') : t('login_button')}
                  </button>
                </motion.div>
              </form>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-full max-w-md"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="flex-[1] h-px bg-gray-300" />
                <p className="text-gray-500 text-sm">{t('or')}</p>
                <span className="flex-[1] h-px bg-gray-300" />
              </div>

              <motion.div
                className="flex items-center justify-center gap-4 mt-6"
                variants={staggerContainer(0.1, 0.2)}
              >
                <motion.button
                  variants={fadeIn("up", "tween", 0.8, 1)}
                  className="bg-white flex items-center justify-center rounded-xl p-3 shadow-md cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                  whileHover={{ y: -3 }}
                >
                  <Github className="h-5 w-5 text-gray-700" />
                </motion.button>
                <motion.button
                  variants={fadeIn("up", "tween", 0.9, 1)}
                  className="bg-white flex items-center justify-center rounded-xl p-3 shadow-md cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                  whileHover={{ y: -3 }}
                >
                  <Twitter className="h-5 w-5 text-blue-400" />
                </motion.button>
                <motion.button
                  variants={fadeIn("up", "tween", 1.0, 1)}
                  className="bg-white flex items-center justify-center rounded-xl p-3 shadow-md cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                  whileHover={{ y: -3 }}
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                </motion.button>
              </motion.div>

              {/* Sign Up Link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-center mt-6 text-gray-600"
              >
                {t('no_account')}{' '}
                <Link href={`/${locale}/sign-up`} className="text-[#1865A9] hover:underline font-medium">
                  {t('sign_up')}
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex flex-1 h-full z-20 relative"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-[#1865A9] font-bold text-2xl text-center w-full leading-12 py-11"
            >
              {t.rich('journey_title', {
                break: () => <br />,
              })}
            </motion.h2>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}