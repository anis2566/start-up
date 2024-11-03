"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, User } from "@prisma/client";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { useUpdateUserInfoMutation } from "../../mutation";
import { LoadingButton } from "@/components/loading-button";

const personalInfoSchema = z.object({
    name: z.string().min(1, { message: "required" }),
    gender: z
        .nativeEnum(Gender).optional(),
    dob: z.date().optional(),
});

interface PersonalInfoFormProps {
    user: User
}

export const PersonalInfoForm = ({ user }: PersonalInfoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => setIsEditing((prev) => !prev);

    const { mutate, isPending } = useUpdateUserInfoMutation({ toggleEditing });

    const form = useForm<z.infer<typeof personalInfoSchema>>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            name: user.name ?? "",
            gender: user.gender ?? undefined,
            dob: user.dob ?? undefined,
        }
    });

    const onSubmit = (data: z.infer<typeof personalInfoSchema>) => {
        mutate({
            id: user.id,
            ...data
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center gap-x-2">
                    <span>Personal Information</span>
                    <Button variant={isEditing ? "destructive" : "secondary"} onClick={toggleEditing} disabled={isPending}>
                        {isEditing ? "Cancel" : "Update"}
                    </Button>
                </CardTitle>
                <CardDescription>
                    You can edit your personal information here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending || !isEditing} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground",
                                                    )}
                                                    disabled={isPending || !isEditing}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                onSelect={field.onChange}
                                                selected={field.value ? new Date(field.value) : new Date()}
                                                disabled={(date) => date > new Date() || isPending || !isEditing}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex gap-x-3"
                                            disabled={isPending || !isEditing}
                                        >
                                            {
                                                Object.values(Gender).map((gender) => (
                                                    <FormItem className="flex items-center space-x-1 space-y-0" key={gender}>
                                                        <FormControl>
                                                            <RadioGroupItem value={gender} checked={field.value === gender} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {gender}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {
                            isEditing && (
                                <LoadingButton
                                    type="submit"
                                    isLoading={isPending}
                                    title="Save"
                                    loadingTitle="Saving..."
                                    onClick={form.handleSubmit(onSubmit)}
                                />
                            )
                        }
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}