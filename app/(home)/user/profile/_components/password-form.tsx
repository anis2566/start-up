"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/loading-button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import { useUpdateUserPasswordMutation } from "../../mutation";

const passwordSchema = z.object({
    oldPassword: z.string().min(1, { message: "required" }),
    password: z.string().min(6, { message: "min 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "min 6 characters long" }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

interface PasswordFormProps {
    userId: string;
}

export const PasswordForm = ({ userId }: PasswordFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleEditing = () => setIsEditing((prev) => !prev);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
    const toggleShowOldPassword = () => setShowOldPassword((prev) => !prev);


    const { mutate: updateUserPassword, isPending } = useUpdateUserPasswordMutation({
        toggleEditing,
    });

    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: z.infer<typeof passwordSchema>) => {
        updateUserPassword({
            id: userId,
            oldPassword: data.oldPassword,
            password: data.password,
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center gap-x-2">
                    <span>Password</span>
                    <Button variant={isEditing ? "destructive" : "secondary"} onClick={toggleEditing} disabled={isPending}>
                        {isEditing ? "Cancel" : "Change"}
                    </Button>
                </CardTitle>
                <CardDescription>
                    You can edit your password here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <Collapsible open={isEditing}>
                            <CollapsibleContent className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="oldPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Old Password"
                                                        {...field}
                                                        type={showOldPassword ? "text" : "password"}
                                                        disabled={isPending}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0"
                                                        onClick={toggleShowOldPassword}
                                                        type="button"
                                                    >
                                                        {showOldPassword ? (
                                                            <EyeOff className="h-5 w-5" />
                                                        ) : (
                                                            <Eye className="h-5 w-5" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Password"
                                                        {...field}
                                                        type={showPassword ? "text" : "password"}
                                                        disabled={isPending}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0"
                                                        onClick={toggleShowPassword}
                                                        type="button"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-5 w-5" />
                                                        ) : (
                                                            <Eye className="h-5 w-5" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Confirm Password"
                                                        {...field}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        disabled={isPending}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0"
                                                        onClick={toggleShowConfirmPassword}
                                                        type="button"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="h-5 w-5" />
                                                        ) : (
                                                            <Eye className="h-5 w-5" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <LoadingButton
                                    type="submit"
                                    isLoading={isPending}
                                    title="Save"
                                    loadingTitle="Saving..."
                                    onClick={form.handleSubmit(onSubmit)}
                                />
                            </CollapsibleContent>
                        </Collapsible>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};