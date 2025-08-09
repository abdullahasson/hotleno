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
import { Mail, Lock, User, Github, Twitter, Facebook } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

// Form & Validation
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Framer Motion
import { motion } from "framer-motion"
import { fadeIn, staggerContainer, slideIn } from "@/lib/utils/motion"

// Create a schema for form validation
type TranslationFunction = (key: string) => string;

const createSignUpSchema = (t: TranslationFunction) => z.object({
  username: z.string()
    .min(3, t('errors.username.min'))
    .max(20, t('errors.username.max')),
  email: z.string()
    .email(t('errors.email.invalid')),
  password: z.string()
    .min(8, t('errors.password.min'))
    .regex(/[A-Z]/, t('errors.password.uppercase'))
    .regex(/[a-z]/, t('errors.password.lowercase'))
    .regex(/[0-9]/, t('errors.password.number'))
    .regex(/[^A-Za-z0-9]/, t('errors.password.special')),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: t('errors.confirmPassword.match'),
  path: ["confirmPassword"]
})

export default function SignUp() {
  const locale = useLocale()
  const t = useTranslations('SignUp')

  // Create schema with translations
  const SignUpSchema = createSignUpSchema(t)

  type SignUpFormValues = z.infer<typeof SignUpSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange"
  })

  const onSubmit = async (data: SignUpFormValues) => {
    // Handle form submission
    console.log(data)
    // You would typically call an API here
    await new Promise(resolve => setTimeout(resolve, 1000))
    reset()
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
              className="w-full h-full"
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
                {/* User Field */}
                <motion.div
                  variants={fadeIn("up", "tween", 0.4, 1)}
                  className="relative"
                >
                  <div className="relative">
                    <input
                      {...register("username")}
                      type="text"
                      id="username"
                      className={`peer h-12 w-full border ${errors.username ? "border-red-500" : "border-gray-300"
                        } rounded-lg px-4 pt-3 pb-1 focus:outline-none focus:ring-2 focus:ring-[#1865A9] focus:border-transparent transition-all`}
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-4 top-3 text-gray-500 text-sm pointer-events-none transition-all duration-200 peer-focus:-top-[10px] peer-focus:text-xs peer-focus:text-[#1865A9] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{t('username')}</span>
                      </div>
                    </label>
                  </div>
                  {errors.username && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-500 text-xs mt-1 px-2"
                    >
                      {errors.username.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  variants={fadeIn("up", "tween", 0.5, 1)}
                  className="relative"
                >
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
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
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-500 text-xs mt-1 px-2"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  variants={fadeIn("up", "tween", 0.6, 1)}
                  className="relative"
                >
                  <div className="relative">
                    <input
                      {...register("password")}
                      type="password"
                      id="password"
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
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-500 text-xs mt-1 px-2"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  variants={fadeIn("up", "tween", 0.7, 1)}
                  className="relative"
                >
                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      id="confirmPassword"
                      className={`peer h-12 w-full border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        } rounded-lg px-4 pt-3 pb-1 focus:outline-none focus:ring-2 focus:ring-[#1865A9] focus:border-transparent transition-all`}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute left-4 top-3 text-gray-500 text-sm pointer-events-none transition-all duration-200 peer-focus:-top-[10px] peer-focus:text-xs peer-focus:text-[#1865A9] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
                    >
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span>{t('confirm_password')}</span>
                      </div>
                    </label>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-500 text-xs mt-1 px-2"
                    >
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={fadeIn("up", "tween", 0.8, 1)}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1865A9] hover:bg-[#13518f] font-bold text-white rounded-lg p-3 w-full transition-colors duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? t('signing_up') : t('signUp_button')}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
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
                  variants={fadeIn("up", "tween", 1.0, 1)}
                  className="bg-white flex items-center justify-center rounded-xl p-3 shadow-md cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                  whileHover={{ y: -3 }}
                >
                  <Github className="h-5 w-5 text-gray-700" />
                </motion.button>
                <motion.button
                  variants={fadeIn("up", "tween", 1.1, 1)}
                  className="bg-white flex items-center justify-center rounded-xl p-3 shadow-md cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                  whileHover={{ y: -3 }}
                >
                  <Twitter className="h-5 w-5 text-blue-400" />
                </motion.button>
                <motion.button
                  variants={fadeIn("up", "tween", 1.2, 1)}
                  className="bg-white flex items-center justify-center rounded-xl p-3 shadow-md cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                  whileHover={{ y: -3 }}
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                </motion.button>
              </motion.div>

              {/* Login Link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-center mt-6 text-gray-600"
              >
                {t('no_account')}{' '}
                <Link href={`/${locale}/login`} className="text-[#1865A9] hover:underline font-medium">
                  {t('login')}
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