import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2} from "lucide-react";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "@/components/ui/breadcrumb.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Header = (props: { pageTitle?: string }) => {
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();
    const pageTitle = props.pageTitle;


    useEffect(() => {
        setUsername(sessionStorage.getItem("name") || "");
    }, []);


    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    }

    const handleClick = (to: string) => {
        console.log(`navigating to ${to}`);
        navigate(to);
        console.log(`navigated to ${to}`);
    }

    return (
        <header
            className="sticky top-0 z-30 flex h-14 items-center gap-4
            border-b bg-background px-4 sm:static sm:h-auto sm:border-0
            sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5"/>
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            to="/dashboard" onClick={() => handleClick("/dashboard")}
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110"/>
                            <span className="sr-only">File Server</span>
                        </Link>
                        <Link
                            to="/dashboard" onClick={() => handleClick("/dashboard")}
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-5 w-5"/>
                            Dashboard
                        </Link>
                        <Link
                            to="/orders" onClick={() => handleClick("/orders")}
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <ShoppingCart className="h-5 w-5"/>
                            Orders
                        </Link>
                        <Link
                            to="/products" onClick={() => handleClick("/products")}
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <Package className="h-5 w-5"/>
                            Products
                        </Link>
                        <Link
                            to="/customers" onClick={() => handleClick("/customers")}
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Users2 className="h-5 w-5"/>
                            Customers
                        </Link>
                        <Link
                            to="/settings" onClick={() => handleClick("/settings")}
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <LineChart className="h-5 w-5"/>
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/${pageTitle}`}>{pageTitle?.toLocaleUpperCase()}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
                {/*<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>*/}
                {/*<Input*/}
                {/*    type="search"*/}
                {/*    placeholder="Search..."*/}
                {/*    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"*/}
                {/*/>*/}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <img
                            src="https://api.dicebear.com/8.x/adventurer/svg?seed=Kelvin"
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{username}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;