import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"

import {LuEye, LuEyeOff} from "react-icons/lu";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import {Loader2} from "lucide-react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {authenticate} from "@/utils/authenticate.ts";
import {BASE_URL} from "@/config.ts";

const formSchema = z.object({
    fullname: z.string().min(5, {message: "Enter a your name!"}),
    email: z.string().email({message: "Enter a valid email!"}),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters!",
    }),
    confirm: z.string().min(8, {
        message: "Password must be at least 8 characters!",
    })
}).refine(
    (data) => data.password === data.confirm,
    {
        message: "Passwords do not match",
        path: ["confirm"],
    }
);

const SignUpPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirm: ""
        },
    });

    const {toast} = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [signInMethod, setSignInMethod] = useState("admin");

    useEffect(() => {
        if (authenticate()) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleTabValueChange = (value: string) => {
        setSignInMethod(value);
        console.log(signInMethod);
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        toast({
            description: "Creating account....",
            action: <Loader2 className="mr-2 h-4 w-4 animate-spin"/>,
        });

        const options = {
            method: 'POST',
            url: `${BASE_URL}/api/v1/${signInMethod}/signup`,
            headers: {'Content-Type': 'application/json'},
            data: {
                username: values.fullname,
                email: values.email,
                password: values.password
            }
        };

        axios.request(options).then((response) => {
            if (response.status === 201) {
                toast({
                    description: response.data.message,
                });

                sessionStorage.setItem("email", values.email);
                sessionStorage.setItem("user_type", signInMethod);
                setTimeout(() => navigate("/verify"), 1000);
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
                            <CardTitle>Sign Up As Admin</CardTitle>
                            <CardDescription className="text-sm">Create an administrator account with
                                us.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="fullname"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Full name" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="email" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type={showPassword ? "text" : "password"}
                                                           placeholder="password" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirm"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                                        <Input type={showPassword ? "text" : "password"}
                                                               placeholder="password" {...field} />
                                                        <Button onClick={() => setShowPassword(!showPassword)}
                                                                size="icon"
                                                                variant="secondary" type="button">
                                                            {showPassword ? <LuEye size={20}/> : <LuEyeOff size={20}/>}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="justify-end" type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="justify-end items-end">
                            <CardDescription>Already have an account? </CardDescription>
                            <a href="/" className="text-sm ml-1 underline underline-offset-1">
                                Sign In
                            </a>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="user">
                    <Card className="card">
                        <CardHeader>
                            <CardTitle>Sign Up As User</CardTitle>
                            <CardDescription className="text-sm">Create a user account with us.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="fullname"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Full name" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="email" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type={showPassword ? "text" : "password"}
                                                           placeholder="password" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirm"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                                        <Input type={showPassword ? "text" : "password"}
                                                               placeholder="password" {...field} />
                                                        <Button onClick={() => setShowPassword(!showPassword)}
                                                                size="icon"
                                                                variant="secondary" type="button">
                                                            {showPassword ? <LuEye size={20}/> : <LuEyeOff size={20}/>}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="justify-end" type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="justify-end items-end">
                            <CardDescription>Already have an account? </CardDescription>
                            <a href="/" className="text-sm ml-1 underline underline-offset-1">
                                Sign In
                            </a>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SignUpPage;