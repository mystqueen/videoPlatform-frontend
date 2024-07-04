import {Button} from "@/components/ui/button.tsx";

const Error404Page = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <img src="/public/404.svg" alt="4040" className="w-full"/>
                <p className="text-gray-600 font-semibold m-3">Page Not Found!</p>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        </div>
    );
}

export default Error404Page;
