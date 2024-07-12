import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/config";
import FileCardSkeleton from "@/components/FileCardSkeleton";

interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const CustomersPage: React.FC<{ navigateTo: (page: string, id?: number) => void }> = ({ navigateTo }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/admin/getUsers`);
            if (response.data && Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            } else {
                console.error("Expected array but got", response.data);
            }
            setIsUsersLoaded(true);
        } catch (error) {
            console.error("Error fetching users:", error);
            setIsUsersLoaded(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-7 gap-1" onClick={() => navigateTo("deleteUser")}>
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Delete User</span>
                    </Button>
                </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-col items-center">
                    <img src="@/components/ui/business_logo.png" alt="Business Logo" className="w-16 h-16 mb-2" />
                    <CardTitle>List Of Users</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto h-[400px] flex flex-col items-center">
                    {isUsersLoaded ? (
                        users.length > 0 ? (
                            users.map((user) => (
                                <div key={user.id} className="mb-4">
                                    <h2 className="text-lg font-semibold">{user.name}</h2>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                    <Button onClick={() => navigateTo("userDetail", user.id)}>View Details</Button>
                                </div>
                            ))
                        ) : (
                            <p>No users available.</p>
                        )
                    ) : (
                        <FileCardSkeleton />
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default CustomersPage;
