"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    type LoginFormData,
} from "../validation/login.schema";

import { useLogin } from "../hooks/use-login";

export const LoginForm = () => {
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>

                <input
                    id="email"
                    type="email"
                    {...register("email")}
                />

                {errors.email && (
                    <p style={{ color: 'red' }}>{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password">Password</label>

                <input
                    id="password"
                    type="password"
                    {...register("password")}
                />

                {errors.password && (
                    <p style={{ color: 'red' }}>{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending
                    ? "Logging in..."
                    : "Login"}
            </button>
        </form>
    );
};