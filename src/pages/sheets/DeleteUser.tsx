import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/config";

interface DeleteUserFormData {
    email: string;
}

const DeleteUserSheet: React.FC<{ navigateTo: (page: string) => void }> = ({ navigateTo }) => {
    const { register, handleSubmit, reset } = useForm<DeleteUserFormData>();

    const onSubmit = async (data: DeleteUserFormData) => {
        try {
            await axios.delete(`${BASE_URL}/api/v1/admin/delete-user`, { data: { email: data.email } });
            toast({ description: "User deleted successfully" });
            reset();
            navigateTo("customers");
        } catch (error) {
            toast({ description: "Failed to delete user. Please try again." });
            console.error("Error deleting user:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delete User</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            id="email"
                            {...register("email", { required: true })}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full">Delete User</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default DeleteUserSheet;
