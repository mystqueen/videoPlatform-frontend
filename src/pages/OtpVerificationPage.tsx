"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {toast} from "@/components/ui/use-toast"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Loader2} from "lucide-react";
import axios from "axios";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "@/config.ts";
import {Input} from "@/components/ui/input.tsx";

const FormSchema = z.object({
    pin: z.string().min(20, {
        message: "Your one-time password must be more than 20 characters.",
    }),
})

const OtpVerification = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const [signInMethod, setSignInMethod] = useState("admin");
    const navigate = useNavigate();

    const handleTabValueChange = (value: string) => {
        setSignInMethod(value);
    }

    const onResend = () => {
        console.log("resend")
        toast({
            description: "Resending OTP code....",
            action: <Loader2 className="mr-2 h-4 w-4 animate-spin"/>,
        });

        if (!sessionStorage.getItem("email")) {
            toast({
                description: "Email not found in session! Your session has probably expired.",
                variant: "destructive",
            });
            return;
        }

        const options = {
            method: 'PUT',
            url: `${BASE_URL}/api/v1/${signInMethod}/newToken`,
            headers: {'Content-Type': 'application/json'},
            data: {
                email: sessionStorage.getItem("email")
            }
        };

        axios.request(options).then((response) => {
            if (response.status === 200) {
                toast({
                    description: "OTP sent successfully!",
                });

                console.log(response.data)
            } else {
                toast({
                    description: response.data.message,
                    variant: "destructive",
                });
            }
        }).catch((error) => {
            toast({
                description: error.response?.data.message || error.message,
                variant: "destructive",
            });
        });
    }

    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        toast({
            description: "Verifying email....",
            action: <Loader2 className="mr-2 h-4 w-4 animate-spin"/>,
        });

        if (!sessionStorage.getItem("email")) {
            toast({
                description: "Email not found in session! Your session has probably expired.",
                variant: "destructive",
            });
            return;
        }

        const options = {
            method: 'GET',
            url: `${BASE_URL}/api/v1/${signInMethod}/verify-email?authToken=${values.pin}`,
            headers: {'Content-Type': 'application/json'},
        };

        axios.request(options).then((response) => {
            if (response.status === 202) {
                toast({
                    description: response.data.message,
                });

                console.log(response.data)
                sessionStorage.removeItem("email");

                sessionStorage.setItem("name", response.data.data.fullname);
                sessionStorage.setItem("token", response.data.data.token);
                sessionStorage.setItem("user_type", signInMethod);

                setTimeout(() => navigate("/dashboard"), 1500);
            } else {
                toast({
                    description: response.data.message,
                    variant: "destructive",
                });
            }
        }).catch((error) => {
            toast({
                description: error.response?.data.message || error.message,
                variant: "destructive",
            });
        });
    }


    return (
        <div className="h-screen flex items-center justify-center">
            <Tabs onValueChange={handleTabValueChange} defaultValue="admin" className="align-middle w-1/4">
                <TabsList>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                    <TabsTrigger value="user">User</TabsTrigger>
                </TabsList>
                <TabsContent value="admin">
                    <Card className="card">
                        <CardHeader>
                            <CardTitle>Verify Admin Email</CardTitle>
                            <CardDescription className="text-sm">
                                Verify your email with the OTP Token.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>One-Time Password</FormLabel>
                                                <FormControl>
                                                    <Input type='text' placeholder='Enter token here' {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Please enter the one-time token sent to your email.
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="justify-center flex items-center">
                            <CardDescription>Didn't receive an OTP? </CardDescription>
                            <Button onClick={onResend} variant="ghost"
                                    className="text-sm ml-1 underline underline-offset-1">
                                Resend
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="user">
                    <Card className="card">
                        <CardHeader>
                            <CardTitle>Verify User Email</CardTitle>
                            <CardDescription className="text-sm">
                                Verify your email with the OTP token.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>One-Time Password</FormLabel>
                                                <FormControl>
                                                    <Input type='text' placeholder='Enter token here' {...field}/>
                                                </FormControl>
                                                <FormDescription>
                                                    Please enter the one-time token sent to your email.
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="justify-center flex items-center">
                            <CardDescription>Didn't receive an OTP? </CardDescription>
                            <Button onClick={onResend} variant="ghost"
                                    className="text-sm ml-1 underline underline-offset-1">
                                Resend
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default OtpVerification;
